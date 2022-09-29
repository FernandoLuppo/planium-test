//  Load Modules
const express = require("express");
const router = express.Router();

//  Applications
const userController = require("../controller/userController");

//  Routes
//  Home page
router.get("/", (req, res) => {
  //  If have some error in validations
  if (req.session.validationsError) {
    let arryaErros = req.session.validationsError;
    req.session.validationsError = "";
    res.render("index", { objectErrors: arryaErros });
  }
  //  Load the page if validation not done
  else {
    res.render("index");
  }
});

router.post("/confirmPlan", userController.validation);

//  Confirm plan page
router.get("/confirmPlan", (req, res) => {
  //  If have the users informations loaded
  if (req.session.userPriceAndInformation) {
    //  Transforming user informations to use it
    let userPriceAndInformation = JSON.parse(
      req.session.userPriceAndInformation
    );

    res.render("confirmPlan", {
      userPriceAndInformation: userPriceAndInformation,
    });
  }

  //  Load the page if validation not done
  else {
    res.render("confirmPlan");
  }
});

module.exports = router;
