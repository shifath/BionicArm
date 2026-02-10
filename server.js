const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let currentAngle = "0"; 

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { text-align:center; font-family: 'Segoe UI', sans-serif; background: #121212; color: white; padding-top: 50px; }
          .container { max-width: 400px; margin: auto; border: 2px solid #00ffcc; padding: 20px; border-radius: 15px; box-shadow: 0 0 20px #00ffcc; }
          h1 { color: #00ffcc; }
          .angle-display { font-size: 80px; font-weight: bold; margin: 20px 0; color: #fff; text-shadow: 0 0 10px #00ffcc; }
          
          /* The Slider (Dial) Styling */
          .slider {
            -webkit-appearance: none;
            width: 100%;
            height: 15px;
            border-radius: 10px;
            background: #333;
            outline: none;
            cursor: pointer;
          }
          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #00ffcc;
            cursor: pointer;
            box-shadow: 0 0 10px #00ffcc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>BIONIC ARM</h1>
          <div class="angle-display" id="val">${currentAngle}°</div>
          
          <input type="range" min="0" max="180" value="${currentAngle}" class="slider" id="angleSlider">
          
          <p style="margin-top:20px; color:#888;">Slide to adjust finger position</p>
        </div>

        <script>
          const slider = document.getElementById("angleSlider");
          const display = document.getElementById("val");

          // 1. Update the number on screen instantly as you slide
          slider.oninput = function() {
            display.innerHTML = this.value + "°";
          }

          // 2. Only send the data to the server when the user stops sliding (saves battery/bandwidth)
          slider.onchange = function() {
            fetch('/set?angle=' + this.value)
              .then(response => console.log("Angle updated to: " + this.value));
          }
        </script>
      </body>
    </html>
  `);
});

app.get('/set', (req, res) => {
  if (req.query.angle) {
    currentAngle = req.query.angle;
    console.log("Cloud synced to:", currentAngle + "°");
  }
  res.sendStatus(200); // Send a silent "OK" back to the browser
});

app.get('/get-angle', (req, res) => {
  res.send(currentAngle); 
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});