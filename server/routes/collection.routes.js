const express = require("express");
const router = express.Router();
const {
    collectionController,
    // collectionRestaurantController,
} = require("../controllers/collection.controller");
router.get('/collections',collectionController);
router.post('/collections',collectionController);
router.put('/collections/:id',collectionController);
router.delete('/collections/:id',collectionController);

module.exports = router;