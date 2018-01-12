'use strict';

const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const DemoHotelsData = require('../models/DemoHotelsData');

// Insert Demo Data
exports.init = (req, res) => {
  const promiseArray = DemoHotelsData.map(hotel =>
    new Promise((resolve, reject) => {
      const { _id } = hotel;
      delete hotel._id;
      Hotel.findOneAndUpdate({ _id: _id }, hotel, { upsert: true }, (err, hotel) => {
        if (err) reject(err);

        resolve(hotel);
      });
    }));
  return Promise.all(promiseArray);
};

// List Hotels
exports.list = (req, res) => {
  Hotel.find({}, (err, hotels) => {
    if (err) res.json({ err });

    res.json(hotels);
  });
};


// Create Hotel
exports.create = (req, res) => {
  const newHotel = new Hotel(req.body);
  newHotel.save((err, hotel) => {
    if (err) res.json({ err });

    res.json(hotel);
  });
};


// Get Hotel Detail
exports.get = (req, res) => {
  Hotel.findById(req.params.id, (err, hotel) => {
    if (err) res.json({ err });

    res.json(hotel);
  });
};


// Update Hotel
exports.update = (req, res) => {
  Hotel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, hotel) => {
    if (err) res.json({ err });

    res.json(hotel);
  });
};


// Delete Hotel
exports.delete = (req, res) => {
  new Promise((resolve, reject) => {
    Hotel.findById(req.params.id, (err, hotel) => {
      if (err) reject(err);

      resolve(hotel);
    });
  }).then(result => {
    if (result) {
      const { _id, name } = result;
      Hotel.remove({ _id }, (err, hotel) => {
        if (err) res.json({ err });

        res.json({ message: `Hotel ${name} was successfully deleted` });
      });
    } else {
      res.json({ message: 'Hotel could not be found' });
    }
  }).catch(err => {
    res.json({ err });
  });

};
