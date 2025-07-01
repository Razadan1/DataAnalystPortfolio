
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for contact form (for future implementation)
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Here you would typically:
    // 1. Validate the input
    // 2. Send an email
    // 3. Save to database
    // 4. Send confirmation
    
    console.log('Contact form submission:', { name, email, subject, message });
    
    res.json({ 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Ahmadraza Danmole's Portfolio is running on http://0.0.0.0:${PORT}`);
    console.log(`📊 Data Analyst Portfolio - Ready to showcase skills!`);
});
