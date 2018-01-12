'use strict';

const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const DemoHotelsData = require('../models/DemoHotelsData');


/** Insert Demo Data
 * Preload the Data
 * If Data exists, only execute an Update
 * If Data doesn't exist, execute the insert
 * Create a Promise for every Hotel that found in the DemoHotelsData file
 * Run Promise.all to insert/update all Hotels
 * @param {*} req
 * @param {*} res
 */
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


/**
 * List Hotels
 * GET
 * Route: /hotels
 * @param {*} req 
 * @param {*} res 
 */
exports.list = (req, res) => {
  Hotel.find({}, (err, hotels) => {
    if (err) res.json({ err });

    res.json(hotels);
  });
};


/**
 * Create Hotel
 * POST
 * Route: /hotels
 * @param {*} req --> req.body
 * @param {*} res
 */
exports.create = (req, res) => {
  const newHotel = new Hotel(req.body);
  newHotel.save((err, hotel) => {
    if (err) res.json({ err });

    res.json(hotel);
  });
};


/**
 * Hotel Details
 * GET
 * Route: /hotels/:id
 * @param {*} req --> req.params.id
 * @param {*} res
 */
exports.get = (req, res) => {
  Hotel.findById(req.params.id, (err, hotel) => {
    if (err) res.json({ err });

    res.json(hotel);
  });
};


/**
 * Update Hotel
 * PUT
 * Route: /hotels/:id
 * @param {*} req --> req.params.id
 * @param {*} res
 */
exports.update = (req, res) => {
  Hotel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, hotel) => {
    if (err) res.json({ err });

    res.json(hotel);
  });
};


/**
 * Delete Hotel
 * Validate if the Hotel exists before delete it
 * DELETE
 * Route: /hotels/:id
 * @param {*} req --> req.params.id
 * @param {*} res
 */
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
