# Database Setup Guide - Lugoda Hospital

## Overview
Your hospital website now has a complete backend database system that stores all contact form submissions and provides an admin dashboard to view and manage them.

## What's Been Set Up

### 1. **SQLite Database**
- **Location**: `server/hospital_forms.db`
- **Table**: `submissions` with columns:
  - `id` (Primary Key)
  - `name` (User's full name)
  - `email` (User's email address)
  - `subject` (Form subject)
  - `message` (Form message content)
  - `submitted_at` (Timestamp)
  - `status` (new/read/responded)

### 2. **Backend API Endpoints**
- **POST** `/api/contact` - Submit new form
- **GET** `/api/admin/submissions` - Get all submissions (with pagination)
- **PATCH** `/api/admin/submissions/:id` - Update submission status
- **DELETE** `/api/admin/submissions/:id` - Delete submission

### 3. **Admin Dashboard**
- **URL**: `http://localhost:3001/admin`
- **Features**:
  - View all form submissions
  - Search by name, email, or subject
  - Filter by status (new/read/responded)
  - Mark submissions as read/responded
  - Delete submissions
  - Pagination for large datasets
  - Real-time statistics

## How to Access Form Submissions

### Method 1: Admin Dashboard (Recommended)
1. Start the backend server: `cd server && npm start`
2. Open browser: `http://localhost:3001/admin`
3. View, search, and manage all submissions

### Method 2: Direct Database Access
1. Install SQLite browser or use command line
2. Open file: `server/hospital_forms.db`
3. Query the `submissions` table

### Method 3: API Endpoints
- Use tools like Postman or curl
- GET `http://localhost:3001/api/admin/submissions`

## Email Notifications (Optional)

To receive email notifications when forms are submitted:

1. **Edit** `server/.env` file:
```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
```

2. **For Gmail users**:
   - Enable 2-factor authentication
   - Generate App Password: https://myaccount.google.com/apppasswords
   - Use the App Password (not your regular password)

3. **Restart the server** to apply changes

## Running the Complete System

### Start Backend Server:
```bash
cd server
npm start
```
Server runs on: `http://localhost:3001`
Admin dashboard: `http://localhost:3001/admin`

### Start Frontend (React):
```bash
npm start
```
Website runs on: `http://localhost:3000`

## Database Schema

```sql
CREATE TABLE submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'new'
);
```

## Security Notes

- The admin dashboard has no authentication (add login for production)
- Database file should be backed up regularly
- Consider adding rate limiting for the contact form
- Use HTTPS in production

## Backup & Maintenance

### Backup Database:
```bash
cp server/hospital_forms.db server/backup_$(date +%Y%m%d).db
```

### Clear Old Submissions:
```sql
DELETE FROM submissions WHERE submitted_at < datetime('now', '-30 days');
```

## Troubleshooting

### Server Won't Start:
- Check if port 3001 is available
- Ensure all dependencies are installed: `npm install`

### Database Issues:
- Delete `hospital_forms.db` to reset (loses all data)
- Check file permissions

### Form Not Submitting:
- Ensure backend server is running
- Check browser console for errors
- Verify API endpoint URLs

## Production Deployment

For production, consider:
- Using PostgreSQL instead of SQLite
- Adding authentication to admin dashboard
- Setting up proper logging
- Implementing backup strategies
- Adding SSL certificates
