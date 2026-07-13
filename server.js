const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Support parsing of JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the current directory as static files
app.use(express.static(process.cwd()));

// Mount API routes
const apiRouter = require('./server-api');
app.use('/api', apiRouter);

// Fallback to index.html for unknown routes if needed, 
// though this seems to be a multi-page app (has Persian/index.html, math/index.html etc.)
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
