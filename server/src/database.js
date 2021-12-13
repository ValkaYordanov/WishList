import mongoose from "mongoose";
import Post from "./models/post.js";
import USer from "./models/user.js";

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

async function seedData() {
  const numberOfPosts = await Post.countDocuments();

  if (numberOfPosts == 0) {
    const someData = [{
      'content': 'The best phone in the world right now is the Samsung Galaxy S21 Ultra, but if that isn\'t for you we\'ve got 14 other top picks that may suit you, including the best iPhones and a variety of other Android phones. Our phone experts have spent years reviewing smartphones, and we\'ve tested all the best on the market to put together this definitive list of the very best smartphones you can buy in 2021.',
      'owner': ' Matt Swider ',
      'authorName': ' Matt Swider ',
      'likes': 6,
      'comments':
        [{
          'userName': 'Valentin Yordanov',
          'content': 'I completly agree! It is one of the best phone I have ever seen!'
        },
        {
          'userName': 'John Telerik',
          'content': 'I am interested in that phone. I will look forward and maybe get some more information and buy it actually!'
        }],
      'date': new Date('2014-03-01T08:00:00Z')
    },
    {
      'content': 'What are the best phones in the UK? The best phone in the U.K.that we\'ve tested is the iPhone 13 Pro Max. The whole iPhone 13 line is excellent (two more models can be found on this list), but the Pro Max model stands out with its larger display, enhanced cameras and the longest battery life in the lineup.',
      'owner': ' Richard Priday ',
      'authorName': ' Richard Priday ',
      'likes': 12,
      'comments':
        [{
          'userName': 'Yordan Yordanov',
          'content': 'I am not completly sure but Samsung maybe has some better products! Check them and give me your opinion!'
        }],
      'date': new Date('2016-03-01T09:00:00Z')
    }];
    Post.insertMany(someData);
  } else {
    console.log("There is data!");
  }
}
export { connectDatabase, seedData };
