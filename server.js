const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the root
app.use(express.static(__dirname));

// API endpoint
app.get('/api/profile', (req, res) => {
  res.json({
    name: "Saravanan Selvam",
    email: "saravanan@example.com",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express"]
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
fetch('/api/profile')
  .then(res => res.json())
  .then(data => {
    console.log('API Profile:', data);
    // Optionally show data in the HTML
  });
