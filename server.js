const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/task1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema for the user data
const userSchema = new mongoose.Schema({
  name: { type: String,
    required: true },
  email: { type: String, 
    required: true },
  age: { type: Number, 
    required: true },
});

// Create a model for the user data
const User = mongoose.model('Data', userSchema);

// Parse incoming JSON data
app.use(bodyParser.urlencoded({extenede:false}));
app.use(bodyParser.json());

// Define a route to handle POST requests to /users
app.post('/users', async (req, res) => {
//Validate the incoming data
console.log(req.body);
const { name, email, age } = req.body;
console.log(name,email,age); 
if (!name || !email || !age) {
    return res.status(400).json({ message: 'Name, email, and age are required' });
  }

  // Save the user data to the database
  const user = new User({ name, email, age });
  try {
    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving user to database', error: err.message });
  }
});

//Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(3000)