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

async function seedUsersData() {
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


  } else {
    console.log("There is data for users!");
  }
}

async function seedWishesData() {
  const numberOfWishes = await Wish.countDocuments();
  if (numberOfWishes == 0) {

    var userD = await User.findOne({ username: 'val' })
    var id = userD.id

    const someData = [{
      'title': 'Wish to go to Dubai',
      'description': ' This is my favorite place. I really like that place since it is very interesting to go to a place where before 100 years there was no any bulding but now is like ten cities in one big! ',
      'externalLink': 'http://google.com',
      'vote': 6,
      'comments':
        [{
          'content': 'I completly agree! It is one of the best phone I have ever seen!',
          'submitter': id,
          'date': new Date('2014-03-01T08:00:00Z')
        }]
    },
    {
      'title': 'New Car - Mercedes Benz',
      'description': ' This is my desired car at this moment! Is very popular and I would like to have it and have a lot of fun with my friends on the beach.',
      'externalLink': 'http://google.com',
      'vote': 2,
      'comments':
        [{
          'content': 'I completly agree! It is one of the best phone I have ever seen!',
          'submitter': id,
          'date': new Date('2014-03-01T08:00:00Z')
        }]
    }];
    await Wish.insertMany(someData);
  } else {
    console.log("There is data for wishes!");
  }
}
export { connectDatabase, seedUsersData, seedWishesData };