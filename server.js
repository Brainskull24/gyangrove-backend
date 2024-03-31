// const express = require('express');
// const mongoose = require('mongoose');
const csvParser = require('csv-parser');
const fs = require('fs');
// const Event = require('./models/Event');

// const app = express();

// mongoose.connect('mongodb://localhost:27017/eventDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// fs.createReadStream('events.csv')
//   .pipe(csvParser())
//   .on('data', (row) => {
//     const event = new Event(row);
//     event.save();
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
// });

// app.use(express.static('client'));
// app.get('/events', async (req, res) => {
//   const { latitude, longitude, date } = req.query;
//   try {
//     const events = await Event.find({ latitude, longitude, date });
//     res.json(events);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const Event = require('./models/Event');
const fetch = require('node-fetch');

const app = express();
app.use(express.static('client'));
mongoose.connect('mongodb://localhost:27017/eventDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

fs.createReadStream('events.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    const event = new Event(row);
    event.save();
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
});

async function fetchWeather(city, date) {
  const url = `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${city}&date=${date}`;
  const response = await fetch(url);
  const weatherData = await response.json();
  return weatherData;
}

async function calculateDistance(userLat, userLng, eventLat, eventLng) {
  const url = `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${userLat}&longitude1=${userLng}&latitude2=${eventLat}&longitude2=${eventLng}`;
  const response = await fetch(url);
  const distanceData = await response.json();
  return distanceData;
}

app.get('/events', async (req, res) => {
  const { latitude, longitude, date, page } = req.query;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  try {
    const events = await Event.find({
      date: { $gte: new Date(date), $lte: new Date(new Date(date).getTime() + 14 * 24 * 60 * 60 * 1000) }
    }).sort({ date: 1 }).skip(skip).limit(pageSize);

    const results = [];

    for (const event of events) {
      const weatherData = await fetchWeather(event.city_name, date);
      const distanceData = await calculateDistance(latitude, longitude, event.latitude, event.longitude);

      results.push({
        event_name: event.event_name,
        city_name: event.city_name,
        date: event.date,
        time: event.time,
        latitude: event.latitude,
        longitude: event.longitude,
        weather: weatherData,
        distance: distanceData.distance
      });
    }

    res.json(results);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'An error occurred while fetching events.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
