const express = require("express");
const router = express.Router();
const {restaurantController, restaurantSearchController, restaurantOpenTimeController} = require("../controllers/restaurant.controller");
router.get('/restaurants',restaurantController);
router.get('/restaurants/:id',restaurantController);
router.get('/search/:name',restaurantSearchController);
router.get('/open/:time',restaurantOpenTimeController);
module.exports = router;

