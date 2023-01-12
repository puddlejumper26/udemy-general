const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/carDB");

const carSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

const Car = mongoose.model("Car", carSchema);

const car = new Car({
  name: "a",
  rating: 2,
  review: "1+",
});

car.save();

const dogSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

// =================================================================

const Dog = mongoose.model("Dog", dogSchema);

const dog1 = new Dog({
  name: "dog1",
  rating: 1,
  review: "22",
});
const dog2 = new Dog({
  name: "dog2",
  rating: 3,
  review: "22",
});
const dog3 = new Dog({
  name: "dog3",
  rating: 4,
  review: "22",
});
// Insert
Dog.insertMany([dog1, dog2, dog3], function (err, result) {
  if (err) {
    console.log("error inserting - ", err);
  } else {
    console.log("--- Successfully inserted ---");
  }
});

// to Read from MongoDB
Dog.find((err, dogs) => {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    console.log(dogs);
  }
});
