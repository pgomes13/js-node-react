/**
 * OBJECTIVES:
 * 
 * Create a very simple Node.js API to manage a list of "brands" and "stores."
 * 
 * - Entities:
 *   - brand (e.g. "Donut King")
 *   - store (e.g. "Donut King Brisbane CBD", "Donut King Manly", etc.)
 * 
 * - Relationships
 *   - A brand may have many stores.
 *   - A store belongs to a brand.
 * 
 * - Only a 'name' field is required on each entity.
 * - Data may be stored in memory on the server.
 *
 *  Satisfy the following API endpoints:
 */
const color = require('chalk');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/Brand');
require('./models/Store');
const Brand = mongoose.model('Brand');
const Store = mongoose.model('Store');

// connect to the mongodb server
async function run() {
  try {
    await mongoose.connect('mongodb://localhost/rfg');
    console.log(color.blue('mongodb connected!'));
  } catch (err) {
    console.log(color.red('ERROR - ' + err));
  }
};

// run the connections
run();

module.exports = (app) => {

  app.use(bodyParser.json());
  
  // Returns all brands:
   app.get('/api/brands', async (req, res, next) => {
    try {
      const brands = await Brand.find().populate('stores').exec();
      res.status(200).json(brands);
    } catch (err) {
      return next(err);
    }
  });
  
  // Returns all stores:
   app.get('/api/stores', async (req, res, next) => {
    try {
      const stores = await Store.find({});
      res.status(200).json(stores);
    } catch (err) {
      return next(err);
    }
  });
  
  // Returns all stores for a particular brand ID:
  app.get('/api/brands/:brandId/stores', async (req, res, next) => {
    try {
      const stores = await Store.find({'brand_id': parseInt(req.params.brandId)});
      res.status(200).json(stores);
    } catch (err) {
      return next(err);
    }
  });
  
  // Updates a store:
  app.put('/api/stores/:storeId', async (req, res, next) => {
    try {
      const update = {
        name: req.body.name,
        brand_id: req.body.brand_id
      };
      const store = await Store.findOneAndUpdate({'store_id': parseInt(req.params.storeId)}, update, { upsert: true, new: true });
    
      res.status(201).json(store);
    } catch (err) {
      return next(err);
    };
  });
};
