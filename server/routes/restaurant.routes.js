const express = require("express");
const router = express.Router();
const {preProcessController} = require("../controllers/preprocess.controller");
const {
    restaurantController, 
    restaurantSearchController, 
    restaurantOpenTimeController,
    restaurantNameTimeController
} = require("../controllers/restaurant.controller");
router.get('/preprocess',preProcessController);
router.get('/restaurants',restaurantController);
router.get('/restaurants/:id',restaurantController);
router.get('/search/:name',restaurantSearchController);
router.get('/search/:name/:time',restaurantNameTimeController);
router.get('/open/:time',restaurantOpenTimeController);
module.exports = router;

