'use strict';

const HotelsController = require('../controllers/hotelsController');

module.exports = function (app) {
  app.route('/')
    .get((req, res) => {
      res.status(200).json({ message: 'Connected!' });
    });

  app.route('/hotels')
    .get(HotelsController.list)
    .post(HotelsController.create);


  app.route('/hotels/:id')
    .get(HotelsController.get)
    .put(HotelsController.update)
    .delete(HotelsController.delete);
};
