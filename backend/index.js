const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/visiting-cards', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const cardSchema = new mongoose.Schema({
  name: String,
  title: String,
  phone: String,
  email: String,
});

const Card = mongoose.model('Card', cardSchema);

app.get('/cards', async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

app.post('/cards', async (req, res) => {
  const card = new Card(req.body);
  await card.save();
  res.json(card);
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
