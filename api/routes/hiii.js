const express = require("express");
const router = express.Router();

// Define the `/` route for `/hii`
router.get("/", (req, res) => {
    res.send("Hello from the /hii route!");
});

module.exports = router;
