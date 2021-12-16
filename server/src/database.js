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

    { username: "Valentin", type: "admin", password: "student" },
    { username: "Dan", type: "visitor", password: "teacher" },

  ];
  if (numberOfUsers == 0) {

    users.forEach(async (user) => {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) reject(err);
          else resolve(hash);
        });
      });

      user.password = hashedPassword;
      var user = User.create({ username: user.username, type: user.type, password: user.password });
    });


  } else {
    console.log("There is data for users!");
  }
}

async function seedWishesData() {
  const numberOfWishes = await Wish.countDocuments();
  if (numberOfWishes == 0) {

    var userV = await User.findOne({ username: 'Valentin' })
    var idV = userV.id
    var userD = await User.findOne({ username: 'Dan' })
    var idD = userD.id

    const someData = [{
      'title': 'I wish to go to Dubai',
      'description': 'This is my favorite place. I really like that place since it is very interesting to go to a place where before 100 years there was no any bulding but now is like ten cities in one big! One of my biggest dream is to go to the building that is the tallest one the world!',
      'externalLink': 'https://www.visitdubai.com/en/',
      'vote': 0,
      'received': false,
      'comments':
        [{
          'content': 'Who gives you this great idea to go to Dubai?',
          'submitter': idD,
          'date': new Date('2021-05-25T08:00:00Z')
        },
        {
          'content': 'One of my friends told me 2 years ago since hew was there 3 times already?',
          'submitter': idV,
          'date': new Date('2021-06-05T08:00:00Z')
        },
        {
          'content': 'Just to let you know, I was there and it was not that interesting since everywhere was full of sand!',
          'submitter': idD,
          'date': new Date('2021-06-06T08:00:00Z')
        }]
    },
    {
      'title': 'New Car - Mercedes Benz CLS',
      'description': 'This is my desired car at this moment! Is very popular and I would like to have it and have a lot of fun with my friends and family. The exact model that I what is CLS 350 4x4. It is on Diesel fuel and I want it to be in black colour. My family is very big fan of this brand so I am also a person who really like Mercedes - Benz!',
      'externalLink': 'https://www.autocar.co.uk/car-review/mercedes-benz/cls/first-drives/mercedes-benz-cls-350-bluetec-first-drive-review',
      'vote': 10,
      'received': false,
      'comments':
        [{
          'content': 'To be honest I had it before and I encourage you to look also Mercedes - Benz GLE which is also 4x4.',
          'submitter': idD,
          'date': new Date('2021-01-01T08:00:00Z')
        },
        {
          'content': 'Why should I look it?',
          'submitter': idV,
          'date': new Date('2021-02-04T08:00:00Z')
        },
        {
          'content': 'I think this is better for a 4x4 car since it is higher!',
          'submitter': idD,
          'date': new Date('2021-02-05T08:00:00Z')
        },
        {
          'content': 'Yes it makes more sence. Thank you!',
          'submitter': idV,
          'date': new Date('2021-03-08T08:00:00Z')
        }]
    },
    {
      'title': 'I wish new phone for Christmas',
      'description': 'My current phone is really old already. I am a fan of the Samsung\'s phone. I wish I will get a new one as a present from my parents. I wish to be Note 20 since it is really big and it will give me a lot of opportunities to work on it and to watch movies and play games.',
      'externalLink': 'https://www.gsmarena.com/samsung_galaxy_note20-10338.php',
      'vote': 6,
      'received': false,
      'comments':
        [{
          'content': 'It is very nice phone. I have it and it works as expected.',
          'submitter': idD,
          'date': new Date('2021-02-20T08:00:00Z')
        },
        {
          'content': 'Nice! I hope I will have it soon also',
          'submitter': idV,
          'date': new Date('2021-02-25T08:00:00Z')
        },
        {
          'content': 'If you were a good students during the last year, I am sure will get it!',
          'submitter': idD,
          'date': new Date('2021-03-01T08:00:00Z')
        },
        {
          'content': 'I am doing my best to be the best student, but of course sometimes in not that easy but I am still trying!',
          'submitter': idV,
          'date': new Date('2021-03-01T08:00:00Z')
        }]
    },
    {
      'title': 'Wish for new electric scooter',
      'description': 'In Denmark is very expensive to have car. It is not like in Bulgaria where you can find cheap car and to drive it everywhere. That\'s why here in Denmark I am using my bike. It is a bit old and it is hard to use it on a big hill. That\'s why I would like to have an electric scooter. I know from my friends that is very easy to drive it and it is very powerful!',
      'externalLink': 'https://www.biltema.dk/en-dk/bike-electrical-bike/electrical-vehicle/e-scooter-2000043674',
      'vote': 4,
      'received': true,
      'comments':
        [{
          'content': 'That is great idea! I have it and it very helpful.',
          'submitter': idD,
          'date': new Date('2021-08-18T08:00:00Z')
        },
        {
          'content': 'Yes, it is! I already get it asa present for my birthday! It is just perfect ot use it around the city!',
          'submitter': idV,
          'date': new Date('2021-08-20T08:00:00Z')
        },
        {
          'content': 'Very nice Valentin congrats about that!',
          'submitter': idD,
          'date': new Date('2021-09-03T08:00:00Z')
        }]
    },
    {
      'title': 'Wish for new computer',
      'description': 'My current laptop is very old. I have it from 6 years. But to be honest is working pretty good for its years. I wish a new one because I would like to work with Android projects but for that I need Android Studio. Right now I have it but is very slow. I wish a new computer, I don\'t have any specific brands. I want it to be just faster.',
      'externalLink': 'https://www.elgiganten.dk/computer-kontor/computere/barbar-computer',
      'vote': 8,
      'received': false,
      'comments':
        [{
          'content': 'Hi Valentin, you cana check Lenovo. THey have some very nice discounts this month!',
          'submitter': idD,
          'date': new Date('2021-02-08T08:00:00Z')
        },
        {
          'content': 'That is very nice information. Thank you! I wish you Merry Christmas and Happy New Year!',
          'submitter': idV,
          'date': new Date('2021-02-12T08:00:00Z')
        }]
    },
    {
      'title': 'Go to Pamporovo Resort',
      'description': 'This is one of my wishes for travelling. During this time of the year I love to go in this Holiday resort because there is a lot of snow. One of my favorite thing to do is skiing. I love skiing from when I was 7 years old. This resort is full of different hotels and it is really nice there during the winter. I hope you can go and enjoy too!',
      'externalLink': 'https://pamporovo.me/',
      'vote': 5,
      'received': false,
      'comments':
        [{
          'content': 'Hi Valentin, what about a night there in a hotel, how much is it?',
          'submitter': idD,
          'date': new Date('2021-08-01T08:00:00Z')
        },
        {
          'content': 'It really depends on where the hotel is located. But for 30-40 EUR you can find a room for one night!',
          'submitter': idV,
          'date': new Date('2021-08-06T08:00:00Z')
        },
        {
          'content': 'Thank you! I will check it out since I also love to skiing.',
          'submitter': idD,
          'date': new Date('2021-08-08T08:00:00Z')
        }]
    },
    {
      'title': 'Wish to buy new bed',
      'description': 'I wish to buy a new bed for my bedroom. The current one is very old and it makes a lot of scary noises during the night. The matress is very uncomfortable and also very old. I would liek a new one which could be very big one and very soft. My idea is to look for it in Jysk or Ikea. In which one you will advise me to go?',
      'externalLink': 'https://www.ikea.com/dk/da/',
      'vote': 3,
      'received': false,
      'comments':
        [{
          'content': 'A good idea is to go in Jysk. I bought my old one and the current one from there. Also my friends use it very often since there are very often big discounts.',
          'submitter': idD,
          'date': new Date('2021-03-28T08:00:00Z')
        },
        {
          'content': 'This very importnat actually. I forgot to mention that I need a cheap one! Thank you!',
          'submitter': idV,
          'date': new Date('2021-04-02T08:00:00Z')
        }]
    },
    {
      'title': 'New tablet for my kid',
      'description': 'My kid is watching a lot of videos and moview on his tablet. But of course it is a kid and by mistake he drop the tabplet many times per one day. The current tablet has problems with the touch pad, it is very dificult to use it. But it is still working. This is the reason that I will look for the same brand or Acer tablet. I will need also some case for it so to protect as much as possible. My idea is to look into Amazon.',
      'externalLink': 'https://www.amazon.com/Amazon-Fire-Tablet-Family/b?ie=UTF8&node=6669703011',
      'vote': 2,
      'received': true,
      'comments':
        [{
          'content': 'At home my kid is using Samsung and is really nice also. You can take a look for comparison.',
          'submitter': idD,
          'date': new Date('2021-05-12T08:00:00Z')
        },
        {
          'content': 'Of course I will take a look. I also was thinking for Apple but they are too expensive I think. Thank you!',
          'submitter': idV,
          'date': new Date('2021-05-16T08:00:00Z')
        }]
    },
    {
      'title': 'Trip to Machu Picchu',
      'description': 'This is another trip that I wish to make. I like the history about Machu Picchu. I am a person who is really interesting in the history. My friend from Paris was there last year and he told that is a great place for a people like me. It is one of the places in my list of wishes with high priority to go.',
      'externalLink': 'https://en.wikipedia.org/wiki/Machu_Picchu',
      'vote': 16,
      'received': false,
      'comments':
        [{
          'content': 'I was there last year. Is just amazin place to explore the world and the history.',
          'submitter': idD,
          'date': new Date('2021-01-22T08:00:00Z')
        },
        {
          'content': 'Amazing! I will try to go next year but we will see since the situation with the virus is a bit unexpected.',
          'submitter': idV,
          'date': new Date('2021-01-23T08:00:00Z')
        },
        {
          'content': 'Yeah it is kind a hard to make decision now. Be careful with that!.',
          'submitter': idD,
          'date': new Date('2021-02-02T08:00:00Z')
        }]
    },
    {
      'title': 'Wish for new watch',
      'description': 'I really need a new watch. This is a wish for my birthaday. I hope my girlfriend will take care of it. Otherwise next year at some point I will save money for very good watch. I am really interesting into Casio and especially the model Edifice.',
      'externalLink': 'https://edifice.casio.com/',
      'vote': 12,
      'received': false,
      'comments':
        [{
          'content': 'Do you know how much money is it?.',
          'submitter': idD,
          'date': new Date('2021-04-02T08:00:00Z')
        },
        {
          'content': 'I have some idea but I am not really sure. Maybe around 100-200 EUR. ',
          'submitter': idV,
          'date': new Date('2021-04-04T08:00:00Z')
        },
        {
          'content': 'Yeah it is a bit expensive but I am sure it is worth it.',
          'submitter': idD,
          'date': new Date('2021-04-05T08:00:00Z')
        }]
    }
    ];
    await Wish.insertMany(someData);
  } else {
    console.log("There is data for wishes!");
  }
}
export { connectDatabase, seedUsersData, seedWishesData };