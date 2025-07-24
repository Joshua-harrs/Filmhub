const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');

const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://joshuaharrs:w0AasdJwVdKRoJF4@filmhub.hgcucqb.mongodb.net/?retryWrites=true&w=majority&appName=Filmhub";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => console.log(`🔥 Server running at http://localhost:${PORT}`));
  })
  .catch(console.error);
