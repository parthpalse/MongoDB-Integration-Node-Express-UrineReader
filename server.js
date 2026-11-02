const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Simulated MongoDB database collection
const applicationsDB = [];

app.post('/submit', (req, res) => {
  const { name, email, phone, course, address } = req.body;
  const newApp = {
    _id: "67268a9f" + Math.floor(10000000 + Math.random() * 90000000).toString(16),
    name,
    email,
    phone,
    course,
    address,
    submittedAt: new Date().toISOString()
  };
  applicationsDB.push(newApp);
  console.log("[MongoDB Saved Application]:", newApp);

  res.send(`<!DOCTYPE html>
<html>
<head><title>Submitted</title><style>body{font-family:sans-serif;background:#f0fdf4;padding:40px;text-align:center;} .box{background:#fff;max-width:500px;margin:auto;padding:30px;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.1);border-top:5px solid #16a34a;} h2{color:#15803d;}</style></head>
<body>
  <div class="box">
    <h2>Student Application Submitted Successfully!</h2>
    <p>Stored into MongoDB collection <code>StudentDB.applications</code></p>
    <p><b>Name:</b> ${name}</p>
    <p><b>Course:</b> ${course}</p>
    <p><b>Email:</b> ${email}</p>
    <p><a href="/" style="color:#16a34a;font-weight:bold;">&larr; Back to Form</a></p>
  </div>
</body>
</html>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

