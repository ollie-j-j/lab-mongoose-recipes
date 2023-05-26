const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const testRecipe = {
  title: "Eggs on Toast",
  level: "Amateur Chef",
  ingredients: ["Bread", "Eggs", "Avocado"],
  cuisine: "English",
  dishtype: "breakfast",
  duration: 10,
  creator: "Joe Blogs"
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(testRecipe);
  })
  .then((recipe)=> console.log(`Title: ${recipe.title}`)) 
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((data) => {
    data.forEach((recipe) => {
        console.log(`Title: ${recipe.title}`);
    });
  })
  .then(() => {
    return Recipe.findOne({ title: 'Rigatoni alla Genovese' })
      .then(recipe => {
        recipe.duration = 100;
        return recipe.save();
      })
  })
  .then(() => console.log("Updated the Rigatoni recipe duration to 100"))
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then((Recipe) => console.log("Carrot Cake has been removed"))
  })
  .then(()=>  {
    return mongoose.connection.close()
  })
  .then(()=> console.log('The connection is now closed'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




  