import mongoose from "mongoose";
import Wish from "./models/wish.js";
import User from "./models/user.js";
import bcrypt, { } from "bcryptjs";

async function connectDatabase() {
  const connectionString = process.env.MONGODB_URL;


  if (!connectionString) {
    throw new Error(
      "MONGODB_URL not set as environment variable. Please configure it in an .env file."
    );
  }

  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });



}
async function hashPass(rawPass) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(rawPass, 10, function (err, hash) {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}
async function seedData() {
  const numberOfWishes = await Wish.countDocuments();
  const numberOfUsers = await User.countDocuments();
  const users = [

    { username: "val", type: "admin", password: "asd" },
    { username: "paul", type: "visitor", password: "asd" },

  ];
  if (numberOfUsers == 0) {

    users.forEach(async (user) => {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) reject(err);
          else resolve(hash);
        });
      });

      user.password = hashedPassword; // Storing the hash+salt on the user object.
      var user = User.create({ username: user.username, type: user.type, password: user.password });
    });


  }



  if (numberOfWishes == 0) {

    var user = await User.findOne({ username: 'val' })
    console.log(user)
    var id = user.id
    const someData = [{
      'title': 'The best phone in the world right now is the Samsung Galaxy S21 Ultra, but if that isn\'t for you we\'ve got 14 other top picks that may suit you, including the best iPhones and a variety of other Android phones. Our phone experts have spent years reviewing smartphones, and we\'ve tested all the best on the market to put together this definitive list of the very best smartphones you can buy in 2021.',
      'description': ' Matt Swider ',
      'externalLink': ' Matt Swider ',
      'vote': 6,
      'comments':
        [{
          'content': 'I completly agree! It is one of the best phone I have ever seen!',
          'submitter': id,
          'date': new Date('2014-03-01T08:00:00Z')
        }]
    },
    {
      'title': 'Title',
      'description': ' Matt Swider ',
      'externalLink': ' Matt Swider ',
      'vote': 6,
      'comments':
        [{
          'content': 'I completly agree! It is one of the best phone I have ever seen!',
          'submitter': id,
          'date': new Date('2014-03-01T08:00:00Z')
        }]
    }];
    Wish.insertMany(someData);
  } else {
    console.log("There is data!");
  }
}

export { connectDatabase, seedData };
