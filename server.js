const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let currentAngle = "0"; // This stores the finger position

// 1. The page you see on your phone/laptop
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="text-align:center; font-family:sans-serif; padding-top:50px;">
        <h1>Bionic Arm Cloud Control</h1>
        <p>Current Angle: <strong>${currentAngle}°</strong></p>
        <form action="/set" method="GET">
          <input type="number" name="angle" min="0" max="180" placeholder="0-180">
          <button type="submit">Update Arm</button>
        </form>
      </body>
    </html>
  `);
});

// 2. The link the website uses to save the new angle
app.get('/set', (req, res) => {
  if (req.query.angle) {
    currentAngle = req.query.angle;
    console.log("New Angle Set:", currentAngle);
  }
  res.redirect('/');
});

// 3. The "Clean" link for your ESP32 to read
app.get('/get-angle', (req, res) => {
  res.send(currentAngle); 
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});