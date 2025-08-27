const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', (req, res) => {
  console.log('Received contact form submission:');
  console.log(req.body);
  // In a real application, you would add code here to send an email, save to a database, etc.
  res.status(200).json({ message: 'Form data received successfully.' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
