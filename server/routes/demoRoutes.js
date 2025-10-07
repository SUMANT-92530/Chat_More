const express = require("express");
const router = express.Router();

//import controller
const {demoHere} = require("../controllers/demoController")

//define API routes
// router.get("/demo", (req, res) => {
//     // Corrected: Use the response object (res) to send data back
//     res.status(200).send("Hii");
// });
router.post("/demo",demoHere);

module.exports = router;