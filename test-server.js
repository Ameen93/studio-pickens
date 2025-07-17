const express = require('express');
const app = express();

// Test basic routes
app.get('/api/hero', (req, res) => res.json({ test: 'hero' }));
app.put('/api/hero/:id', (req, res) => res.json({ test: 'hero put' }));
app.get('/api/work', (req, res) => res.json({ test: 'work' }));
app.put('/api/work', (req, res) => res.json({ test: 'work put' }));
app.post('/api/work', (req, res) => res.json({ test: 'work post' }));
app.delete('/api/work/:id', (req, res) => res.json({ test: 'work delete' }));

try {
  app.listen(3002, () => {
    console.log('Test server running on port 3002');
  });
} catch (error) {
  console.error('Server error:', error);
}