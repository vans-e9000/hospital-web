const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const basicAuth = require('express-basic-auth');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
require('dotenv').config();
const { sanitize } = require('sql-sanitizer');
const csrf = require('csrf');
const tokens = new csrf();

const app = express();
const port = process.env.PORT || 3001;

// Trust proxy (needed for correct secure cookies behind proxies)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Security middleware
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// Initialize SQLite database
const db = new sqlite3.Database('./hospital_forms.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    // Create submissions table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'new'
    )`);
  }
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.use(express.json());
app.use(express.static('public'));

// Generate CSRF token for forms
app.get('/api/csrf-token', (req, res) => {
  // Header-only CSRF token (temporary lightweight mode)
  const token = tokens.create(tokens.secretSync());
  res.json({ token });
});

// Verify CSRF token on POST routes
app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.headers['x-csrf-token'] || req.body?._csrf;
    if (!token) {
      return res.status(403).json({ error: 'Missing CSRF token' });
    }
  }
  next();
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  try {
    // Save to database
    const stmt = db.prepare('INSERT INTO submissions (name, email, subject, message) VALUES (?, ?, ?, ?)');
    stmt.run([
      sanitize(name),
      sanitize(email),
      sanitize(subject),
      sanitize(message)
    ], function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to save submission' });
      }
      
      console.log(`New submission saved with ID: ${this.lastID}`);
      
      // Send email notification (optional)
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'info@lugodahospital.com',
          subject: `New Contact Form: ${subject}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
          `
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Email error:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }
      
      res.status(200).json({ 
        message: 'Form submitted successfully!',
        id: this.lastID
      });
    });
    stmt.finalize();
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin authentication middleware
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'change_this_password';
const adminAuth = basicAuth({
  users: { [adminUsername]: adminPassword },
  challenge: true,
  unauthorizedResponse: 'Unauthorized access'
});

// Protect all admin routes
app.use('/api/admin', adminAuth);
app.use('/admin', adminAuth);

// Get all submissions (admin endpoint)
app.get('/api/admin/submissions', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  
  // Get total count
  db.get('SELECT COUNT(*) as total FROM submissions', (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Get submissions with pagination
    db.all(
      'SELECT * FROM submissions ORDER BY submitted_at DESC LIMIT ? OFFSET ?',
      [limit, offset],
      (err, rows) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        
        res.json({
          submissions: rows,
          total: countResult.total,
          page: page,
          totalPages: Math.ceil(countResult.total / limit)
        });
      }
    );
  });
});

// Update submission status
app.patch('/api/admin/submissions/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['new', 'read', 'responded'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  db.run(
    'UPDATE submissions SET status = ? WHERE id = ?',
    [sanitize(status), sanitize(id)],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      
      res.json({ message: 'Status updated successfully' });
    }
  );
});

// Delete submission
app.delete('/api/admin/submissions/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM submissions WHERE id = ?', [sanitize(id)], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    res.json({ message: 'Submission deleted successfully' });
  });
});

// Send reply email
app.post('/api/admin/reply/:id', async (req, res) => {
  const { id } = req.params;
  const { subject, message } = req.body;
  
  if (!subject || !message) {
    return res.status(400).json({ error: 'Subject and message are required' });
  }
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: 'Email configuration not set up. Please configure EMAIL_USER and EMAIL_PASS in .env file.' });
  }
  
  try {
    // Get submission details
    db.get('SELECT * FROM submissions WHERE id = ?', [sanitize(id)], async (err, submission) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      
      // Send reply email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: submission.email,
        subject: `Re: ${submission.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(45deg, #dc2626, #2563eb); color: white; padding: 20px; text-align: center;">
              <h2>🏥 Lugoda Hospital</h2>
              <p>Response to your inquiry</p>
            </div>
            
            <div style="padding: 20px; background: #f8fafc;">
              <p>Dear ${submission.name},</p>
              <p>Thank you for contacting Lugoda Hospital. Here is our response to your inquiry:</p>
              
              <div style="background: white; padding: 15px; border-left: 4px solid #dc2626; margin: 20px 0;">
                <strong>Your Original Message:</strong><br>
                <em>"${submission.message}"</em>
              </div>
              
              <div style="background: white; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;">
                <strong>Our Response:</strong><br>
                ${message.replace(/\n/g, '<br>')}
              </div>
              
              <p>If you have any further questions, please don't hesitate to contact us.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p><strong>Best regards,</strong><br>
                Lugoda Hospital Team</p>
                
                <p style="color: #64748b; font-size: 14px;">
                  📧 info@lugodahospital.com<br>
                  📞 Emergency: (123) 456-7890<br>
                  🏥 123 Health Street, Wellness City
                </p>
              </div>
            </div>
          </div>
        `
      };
      
      try {
        await transporter.sendMail(mailOptions);
        
        // Update submission status to 'responded'
        db.run('UPDATE submissions SET status = ? WHERE id = ?', ['responded', sanitize(id)], function(updateErr) {
          if (updateErr) {
            console.error('Error updating status:', updateErr);
          }
        });
        
        res.json({ 
          message: 'Reply sent successfully!',
          sentTo: submission.email
        });
        
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        res.status(500).json({ 
          error: 'Failed to send email. Please check your email configuration.',
          details: emailError.message
        });
      }
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));
  // SPA fallback
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/admin')) {
      return next();
    }
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log(`Admin dashboard: http://localhost:${port}/admin`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
