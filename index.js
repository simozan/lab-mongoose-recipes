const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://simonezanni87:Gorgonzola.1@cluster0.pcd7jvi.mongodb.net/labrecepies';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create({
      title: "Pasta alla carbonara",
      level: 'Amateur Chef',
      ingredients: "eggs, pasta, bacon cheese",
      cuisine: "italian",
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 20,
      creator: "Simo"
    })
      .then(() => {
        Recipe.insertMany(data)
          .then((ditto) => {
            Recipe.find()
              .then((DataBaseRecepies) => {
                DataBaseRecepies.forEach(element => {
                  console.log(element.title)
                });
                Recipe.findOneAndUpdate({ title: `Rigatoni alla Genovese` }, { duration: 100 }, { new: true })
                  .then((recepite1) => {
                    console.log(recepite1)
                    Recipe.deleteOne({ title: `Carrot Cake` })
                    .then ((recept)=>{
                      console.log("SUCCESS!")
                    })
                  })
              });
          })
      })

      .catch(error => { console.log(error) });
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
