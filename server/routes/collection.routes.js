const express = require("express");
const router = express.Router();
const {
    collectionController,
    collectionRestaurantController,
} = require("../controllers/collection.controller");
router.get('/collections',collectionController);
router.post('/collections',collectionController);
router.get('/collections/:id',collectionRestaurantController);

router.put('/collections/:id',collectionController);
router.delete('/collections/:id',collectionController);
router.get('/collections/:id/restaurants',collectionRestaurantController);
router.post('/collections/:id/restaurants',collectionRestaurantController);

router.delete('/collections/:collection_id/:restaurant_id',collectionRestaurantController);
router.post('/clrestaurants/',collectionRestaurantController);

module.exports = router;