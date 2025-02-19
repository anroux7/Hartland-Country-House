// Import the express module
const express = require('express');
const app = express();
const port = 3000; // You can change this to any port you'd like

// Serve static files from the "public" directory
app.use(express.static('public'));

// Default route (optional, if you want a custom landing page)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});