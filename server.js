const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;
require('dotenv').config()


const Dog = require('./models/dog')


app.set('view engine', 'ejs')


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`)
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err)
  })
  


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/dogs', async (req, res) => {
  try {
    const dogs = await Dog.find()
    res.render('show', { dogs })
  } catch (err) {
    console.error('Error retrieving dogs:', err)
    res.status(500).send('Error retrieving dogs')
  }
})


app.get('/dogs/new', (req, res) => {
  res.render('new')
})


app.post('/dogs', async (req, res) => {
    const newDog = new Dog({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    })
    await newDog.save()
    res.redirect('/dogs')
})


app.get('/dogs/:id/edit', async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id)
    res.render('edit', { dog })
  } catch (err) {
    console.error('Error fetching dog for edit:', err)
    res.status(500).send('Error fetching dog')
  }
})


app.put('/dogs/:id', async (req, res) => {
    await Dog.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });
    res.redirect('/dogs');
})


app.delete('/dogs/:id', async (req, res) => {
    await Dog.findByIdAndDelete(req.params.id)
    res.redirect('/Dogs')
})


app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`)
})