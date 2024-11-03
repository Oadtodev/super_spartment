const express = require('express');
const router = express.Router();
const session = require('express-session');
const users = require('../models/users');

const multer = require('multer');
const app = express();
// Configure session middleware with secure settings
router.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));


// Configure multer storage
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});



// Get all users with datatable support

// Create user
app.get('/rent_cal',(req,res)=>{
    res.render('index');
});



app.post('/users/add', upload.single('image'), async (req, res) => {
    const { room, name, citizenid, tel, carinfo } = req.body;
    const image = req.file.filename;
    await users.create({ room, name, citizenid, tel, carinfo, image });
    res.redirect('/');
}); 






// Delete user
router.delete('/:id', async (req, res) => {
    try {
        await users.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



module.exports = router;
