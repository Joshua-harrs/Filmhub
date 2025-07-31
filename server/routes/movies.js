const express = require('express');
const router = express.Router();
const multer = require('multer');
const Movie = require('../models/Movie');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { title, description, uploadedBy } = req.body;
        const movie = new Movie({
            title,
            description,
            fileUrl: req.file.path,
            uploadedBy
        });
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

module.exports = router;