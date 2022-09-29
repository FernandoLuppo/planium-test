//  Load modules
const fs = require("fs");

//  Route
const userController = {
  validation: function (req, res) {
    //  Quantity people
    let selectorPerson = req.body.selectorPerson;

    //  Age people
    let ageFirstPerson = req.body.ageFirstPerson;
    let ageSecondPerson = req.body.ageSecondPerson;
    let ageThirdPerson = req.body.ageThirdPerson;
    let ageFourthPerson = req.body.ageFourthPerson;

    //  Name people
    let nameFirstPerson = req.body.nameFirstPerson;
    let nameSecondPerson = req.body.nameSecondPerson;
    let nameThirdPerson = req.body.nameThirdPerson;
    let nameFourthPerson = req.body.nameFourthPerson;

    //  Chosen plan
    let selectorPlan = req.body.selectorPlan;

    //  Validation
    let arrayErrors = [];

    //  Validation quantity people
    if (
      selectorPerson == "" ||
      selectorPerson == null ||
      selectorPerson == undefined
    ) {
      arrayErrors.push({
        errorMessage: "Quantidade de beneficiários não pode estar vazio",
      });
    }

    //  Validation chosen plan
    if (
      selectorPlan == "" ||
      selectorPlan == null ||
      selectorPlan == undefined
    ) {
      arrayErrors.push({
        errorMessage: "Plano não pode estar vazio",
      });
    }

    //  If have any error in validations
    if (arrayErrors.length > 0) {
      console.log(arrayErrors);
      req.session.validationsError = arrayErrors;
      res.redirect("/");
    }

    //  Building the chosen plan

    // ----------------------------------------> First plan until three people
    if (selectorPlan == 1 && selectorPerson != 4) {
      //  Prices arrays
      let arrayPrice = [];
      let arrayFullPrice = [];

      //  Age validation per person to discover how many the beneficiary will pay
      if (
        ageFirstPerson == "" ||
        ageFirstPerson == 0 ||
        ageFirstPerson == null ||
        ageFirstPerson == undefined
      ) {
        arrayPrice.push({ firstPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFirstPerson <= 17) {
        arrayPrice.push({ firstPersonPrice: 10 });
        arrayFullPrice.push(10);
      } else if (ageFirstPerson >= 18 && ageFirstPerson <= 40) {
        arrayPrice.push({ firstPersonPrice: 12 });
        arrayFullPrice.push(12);
      } else {
        arrayPrice.push({ firstPersonPrice: 15 });
        arrayFullPrice.push(15);
      }

      if (
        ageSecondPerson == "" ||
        ageSecondPerson == 0 ||
        ageSecondPerson == null ||
        ageSecondPerson == undefined
      ) {
        arrayPrice.push({ secondPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageSecondPerson <= 17) {
        arrayPrice.push({ secondPersonPrice: 10 });
        arrayFullPrice.push(10);
      } else if (ageSecondPerson >= 18 && ageSecondPerson <= 40) {
        arrayPrice.push({ secondPersonPrice: 12 });
        arrayFullPrice.push(12);
      } else {
        arrayPrice.push({ secondPersonPrice: 15 });
        arrayFullPrice.push(15);
      }

      if (
        ageThirdPerson == "" ||
        ageThirdPerson == 0 ||
        ageThirdPerson == null ||
        ageThirdPerson == undefined
      ) {
        arrayPrice.push({ thirdPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageThirdPerson <= 17) {
        arrayPrice.push({ thirdPersonPrice: 10 });
        arrayFullPrice.push(10);
      } else if (ageThirdPerson >= 18 && ageThirdPerson <= 40) {
        arrayPrice.push({ thirdPersonPrice: 12 });
        arrayFullPrice.push(12);
      } else {
        arrayPrice.push({ thirdPersonPrice: 15 });
        arrayFullPrice.push(15);
      }

      //  adding the total price that the beneficiaries will pay
      let fullPrice = arrayFullPrice[0] + arrayFullPrice[1] + arrayFullPrice[2];
      let pay1 = arrayFullPrice[0];
      let pay2 = arrayFullPrice[1];
      let pay3 = arrayFullPrice[2];

      //  beneficiarios.json object
      let userInformations = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        chosenPlan: selectorPlan,
      };

      //  proposta.json object
      let userPriceAndInformation = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        pay1: pay1,
        pay2: pay2,
        pay3: pay3,
        chosenPlan: selectorPlan,
        peoplePrice: arrayPrice,
        fullPrice: fullPrice,
      };

      //  Getting the information that will be used in front
      req.session.userPriceAndInformation = JSON.stringify(
        userPriceAndInformation
      );

      //  Transforming the object in JSON and posting in beneficiarios.json
      function userInformationsJson() {
        fs.readFile("beneficiarios.json ", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userInformations);

            const json = JSON.stringify(file);

            fs.writeFile("beneficiarios.json ", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      //  Transforming the object into JSON and posting to proposal.json
      function userPriceAndInformationJson() {
        fs.readFile("proposta.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userPriceAndInformation);

            const json = JSON.stringify(file);

            fs.writeFile("proposta.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      userInformationsJson();
      userPriceAndInformationJson();

      //  Finishing the process and send the informations to the front
      res.redirect("../confirmPlan");
    }

    // ----------------------------------------> First plan with four people
    if (selectorPlan == 1 && selectorPerson == 4) {
      //  Prices arrays
      let arrayPrice = [];
      let arrayFullPrice = [];

      //  Age validation per person to discover how many the beneficiary will pay
      if (
        ageFirstPerson == "" ||
        ageFirstPerson == 0 ||
        ageFirstPerson == null ||
        ageFirstPerson == undefined
      ) {
        arrayPrice.push({ firstPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFirstPerson <= 17) {
        arrayPrice.push({ firstPersonPrice: 9 });
        arrayFullPrice.push(9);
      } else if (ageFirstPerson >= 18 && ageFirstPerson <= 40) {
        arrayPrice.push({ firstPersonPrice: 11 });
        arrayFullPrice.push(11);
      } else {
        arrayPrice.push({ firstPersonPrice: 14 });
        arrayFullPrice.push(14);
      }

      if (
        ageSecondPerson == "" ||
        ageSecondPerson == 0 ||
        ageSecondPerson == null ||
        ageSecondPerson == undefined
      ) {
        arrayPrice.push({ secondPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageSecondPerson <= 17) {
        arrayPrice.push({ secondPersonPrice: 9 });
        arrayFullPrice.push(9);
      } else if (ageSecondPerson >= 18 && ageSecondPerson <= 40) {
        arrayPrice.push({ secondPersonPrice: 11 });
        arrayFullPrice.push(11);
      } else {
        arrayPrice.push({ secondPersonPrice: 14 });
        arrayFullPrice.push(14);
      }

      if (
        ageThirdPerson == "" ||
        ageThirdPerson == 0 ||
        ageThirdPerson == null ||
        ageThirdPerson == undefined
      ) {
        arrayPrice.push({ thirdPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageThirdPerson <= 17) {
        arrayPrice.push({ thirdPersonPrice: 9 });
        arrayFullPrice.push(9);
      } else if (ageThirdPerson >= 18 && ageThirdPerson <= 40) {
        arrayPrice.push({ thirdPersonPrice: 11 });
        arrayFullPrice.push(11);
      } else {
        arrayPrice.push({ thirdPersonPrice: 14 });
        arrayFullPrice.push(14);
      }

      if (
        ageFourthPerson == "" ||
        ageFourthPerson == 0 ||
        ageFourthPerson == null ||
        ageFourthPerson == undefined
      ) {
        arrayPrice.push({ fourthPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFourthPerson <= 17) {
        arrayPrice.push({ fourthPersonPrice: 9 });
        arrayFullPrice.push(9);
      } else if (ageFourthPerson >= 18 && ageFourthPerson <= 40) {
        arrayPrice.push({ fourthPersonPrice: 11 });
        arrayFullPrice.push(11);
      } else {
        arrayPrice.push({ fourthPersonPrice: 14 });
        arrayFullPrice.push(14);
      }

      //  adding the total price that the beneficiaries will pay
      let fullPrice =
        arrayFullPrice[0] +
        arrayFullPrice[1] +
        arrayFullPrice[2] +
        arrayFullPrice[3];
      let pay1 = arrayFullPrice[0];
      let pay2 = arrayFullPrice[1];
      let pay3 = arrayFullPrice[2];
      let pay4 = arrayFullPrice[3];

      //  beneficiarios.json object
      let userInformations = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        chosenPlan: selectorPlan,
      };

      //  proposta.json object
      let userPriceAndInformation = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        pay1: pay1,
        pay2: pay2,
        pay3: pay3,
        pay4: pay4,
        chosenPlan: selectorPlan,
        peoplePrice: arrayPrice,
        fullPrice: fullPrice,
      };

      //  Getting the information that will be used in front
      req.session.userPriceAndInformation = JSON.stringify(
        userPriceAndInformation
      );

      //  Transforming the object in JSON and posting in beneficiarios.json
      function userInformationsJson() {
        fs.readFile("beneficiarios.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userInformations);

            const json = JSON.stringify(file);

            fs.writeFile("beneficiarios.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      //  Transforming the object into JSON and posting to proposal.json
      function userPriceAndInformationJson() {
        fs.readFile("proposta.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userPriceAndInformation);

            const json = JSON.stringify(file);

            fs.writeFile("proposta.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      userInformationsJson();
      userPriceAndInformationJson();

      //  Finishing the process and send the informations to the front
      res.redirect("../confirmPlan");
    }

    // ----------------------------------------> Second plan
    if (selectorPlan == 2) {
      //  Prices arrays
      let arrayPrice = [];
      let arrayFullPrice = [];

      //  Age validation per person to discover how many the beneficiary will pay
      if (
        ageFirstPerson == "" ||
        ageFirstPerson == 0 ||
        ageFirstPerson == null ||
        ageFirstPerson == undefined
      ) {
        arrayPrice.push({ firstPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFirstPerson <= 17) {
        arrayPrice.push({ firstPersonPrice: 20 });
        arrayFullPrice.push(20);
      } else if (ageFirstPerson >= 18 && ageFirstPerson <= 40) {
        arrayPrice.push({ firstPersonPrice: 30 });
        arrayFullPrice.push(30);
      } else {
        arrayPrice.push({ firstPersonPrice: 40 });
        arrayFullPrice.push(40);
      }

      if (
        ageSecondPerson == "" ||
        ageSecondPerson == 0 ||
        ageSecondPerson == null ||
        ageSecondPerson == undefined
      ) {
        arrayPrice.push({ secondPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageSecondPerson <= 17) {
        arrayPrice.push({ secondPersonPrice: 20 });
        arrayFullPrice.push(20);
      } else if (ageSecondPerson >= 18 && ageSecondPerson <= 40) {
        arrayPrice.push({ secondPersonPrice: 30 });
        arrayFullPrice.push(30);
      } else {
        arrayPrice.push({ secondPersonPrice: 40 });
        arrayFullPrice.push(40);
      }

      if (
        ageThirdPerson == "" ||
        ageThirdPerson == 0 ||
        ageThirdPerson == null ||
        ageThirdPerson == undefined
      ) {
        arrayPrice.push({ thirdPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageThirdPerson <= 17) {
        arrayPrice.push({ thirdPersonPrice: 20 });
        arrayFullPrice.push(20);
      } else if (ageThirdPerson >= 18 && ageThirdPerson <= 40) {
        arrayPrice.push({ thirdPersonPrice: 30 });
        arrayFullPrice.push(30);
      } else {
        arrayPrice.push({ thirdPersonPrice: 40 });
        arrayFullPrice.push(40);
      }

      if (
        ageFourthPerson == "" ||
        ageFourthPerson == 0 ||
        ageFourthPerson == null ||
        ageFourthPerson == undefined
      ) {
        arrayPrice.push({ fourthPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFourthPerson <= 17) {
        arrayPrice.push({ fourthPersonPrice: 20 });
        arrayFullPrice.push(20);
      } else if (ageFourthPerson >= 18 && ageFourthPerson <= 40) {
        arrayPrice.push({ fourthPersonPrice: 30 });
        arrayFullPrice.push(30);
      } else {
        arrayPrice.push({ fourthPersonPrice: 40 });
        arrayFullPrice.push(40);
      }

      //  adding the total price that the beneficiaries will pay
      let fullPrice =
        arrayFullPrice[0] +
        arrayFullPrice[1] +
        arrayFullPrice[2] +
        arrayFullPrice[3];
      let pay1 = arrayFullPrice[0];
      let pay2 = arrayFullPrice[1];
      let pay3 = arrayFullPrice[2];
      let pay4 = arrayFullPrice[3];

      //  beneficiarios.json object
      let userInformations = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        chosenPlan: selectorPlan,
      };

      //  proposta.json object
      let userPriceAndInformation = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        pay1: pay1,
        pay2: pay2,
        pay3: pay3,
        pay4: pay4,
        chosenPlan: selectorPlan,
        peoplePrice: arrayPrice,
        fullPrice: fullPrice,
      };

      //  Getting the information that will be used in front
      req.session.userPriceAndInformation = JSON.stringify(
        userPriceAndInformation
      );

      //  Transforming the object in JSON and posting in beneficiarios.json
      function userInformationsJson() {
        fs.readFile("beneficiarios.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userInformations);

            const json = JSON.stringify(file);

            fs.writeFile("beneficiarios.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      //  Transforming the object into JSON and posting to proposal.json
      function userPriceAndInformationJson() {
        fs.readFile("proposta.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userPriceAndInformation);

            const json = JSON.stringify(file);

            fs.writeFile("proposta.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      userInformationsJson();
      userPriceAndInformationJson();

      //  Finishing the process and send the informations to the front
      res.redirect("../confirmPlan");
    }

    // ----------------------------------------> Third plan
    if (selectorPlan == 3) {
      //  Prices arrays
      let arrayPrice = [];
      let arrayFullPrice = [];

      //  Age validation per person to discover how many the beneficiary will pay
      if (
        ageFirstPerson == "" ||
        ageFirstPerson == 0 ||
        ageFirstPerson == null ||
        ageFirstPerson == undefined
      ) {
        arrayPrice.push({ firstPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFirstPerson <= 17) {
        arrayPrice.push({ firstPersonPrice: 30 });
        arrayFullPrice.push(30);
      } else if (ageFirstPerson >= 18 && ageFirstPerson <= 40) {
        arrayPrice.push({ firstPersonPrice: 40 });
        arrayFullPrice.push(40);
      } else {
        arrayPrice.push({ firstPersonPrice: 50 });
        arrayFullPrice.push(50);
      }

      if (
        ageSecondPerson == "" ||
        ageSecondPerson == 0 ||
        ageSecondPerson == null ||
        ageSecondPerson == undefined
      ) {
        arrayPrice.push({ secondPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageSecondPerson <= 17) {
        arrayPrice.push({ secondPersonPrice: 30 });
        arrayFullPrice.push(30);
      } else if (ageSecondPerson >= 18 && ageSecondPerson <= 40) {
        arrayPrice.push({ secondPersonPrice: 40 });
        arrayFullPrice.push(40);
      } else {
        arrayPrice.push({ secondPersonPrice: 50 });
        arrayFullPrice.push(50);
      }

      if (
        ageThirdPerson == "" ||
        ageThirdPerson == 0 ||
        ageThirdPerson == null ||
        ageThirdPerson == undefined
      ) {
        arrayPrice.push({ thirdPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageThirdPerson <= 17) {
        arrayPrice.push({ thirdPersonPrice: 30 });
        arrayFullPrice.push(30);
      } else if (ageThirdPerson >= 18 && ageThirdPerson <= 40) {
        arrayPrice.push({ thirdPersonPrice: 40 });
        arrayFullPrice.push(40);
      } else {
        arrayPrice.push({ thirdPersonPrice: 50 });
        arrayFullPrice.push(50);
      }

      if (
        ageFourthPerson == "" ||
        ageFourthPerson == 0 ||
        ageFourthPerson == null ||
        ageFourthPerson == undefined
      ) {
        arrayPrice.push({ fourthPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFourthPerson <= 17) {
        arrayPrice.push({ fourthPersonPrice: 30 });
        arrayFullPrice.push(30);
      } else if (ageFourthPerson >= 18 && ageFourthPerson <= 40) {
        arrayPrice.push({ fourthPersonPrice: 40 });
        arrayFullPrice.push(40);
      } else {
        arrayPrice.push({ fourthPersonPrice: 50 });
        arrayFullPrice.push(50);
      }

      //  adding the total price that the beneficiaries will pay
      let fullPrice =
        arrayFullPrice[0] +
        arrayFullPrice[1] +
        arrayFullPrice[2] +
        arrayFullPrice[3];
      let pay1 = arrayFullPrice[0];
      let pay2 = arrayFullPrice[1];
      let pay3 = arrayFullPrice[2];
      let pay4 = arrayFullPrice[3];

      //  beneficiarios.json object
      let userInformations = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        chosenPlan: selectorPlan,
      };

      //  proposta.json object
      let userPriceAndInformation = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        pay1: pay1,
        pay2: pay2,
        pay3: pay3,
        pay4: pay4,
        chosenPlan: selectorPlan,
        peoplePrice: arrayPrice,
        fullPrice: fullPrice,
      };

      //  Getting the information that will be used in front
      req.session.userPriceAndInformation = JSON.stringify(
        userPriceAndInformation
      );

      //  Transforming the object in JSON and posting in beneficiarios.json
      function userInformationsJson() {
        fs.readFile("beneficiarios.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userInformations);

            const json = JSON.stringify(file);

            fs.writeFile("beneficiarios.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      //  Transforming the object into JSON and posting to proposal.json
      function userPriceAndInformationJson() {
        fs.readFile("proposta.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userPriceAndInformation);

            const json = JSON.stringify(file);

            fs.writeFile("proposta.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      userInformationsJson();
      userPriceAndInformationJson();

      //  Finishing the process and send the informations to the front
      res.redirect("../confirmPlan");
    }

    // ----------------------------------------> Fourth plan
    if (selectorPlan == 4) {
      //  Prices arrays
      let arrayPrice = [];
      let arrayFullPrice = [];

      //  Age validation per person to discover how many the beneficiary will pay
      if (
        ageFirstPerson == "" ||
        ageFirstPerson == 0 ||
        ageFirstPerson == null ||
        ageFirstPerson == undefined
      ) {
        arrayPrice.push({ firstPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFirstPerson <= 17) {
        arrayPrice.push({ firstPersonPrice: 40 });
        arrayFullPrice.push(40);
      } else if (ageFirstPerson >= 18 && ageFirstPerson <= 40) {
        arrayPrice.push({ firstPersonPrice: 50 });
        arrayFullPrice.push(50);
      } else {
        arrayPrice.push({ firstPersonPrice: 60 });
        arrayFullPrice.push(60);
      }

      if (
        ageSecondPerson == "" ||
        ageSecondPerson == 0 ||
        ageSecondPerson == null ||
        ageSecondPerson == undefined
      ) {
        arrayPrice.push({ secondPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageSecondPerson <= 17) {
        arrayPrice.push({ secondPersonPrice: 40 });
        arrayFullPrice.push(40);
      } else if (ageSecondPerson >= 18 && ageSecondPerson <= 40) {
        arrayPrice.push({ secondPersonPrice: 50 });
        arrayFullPrice.push(50);
      } else {
        arrayPrice.push({ secondPersonPrice: 60 });
        arrayFullPrice.push(60);
      }

      if (
        ageThirdPerson == "" ||
        ageThirdPerson == 0 ||
        ageThirdPerson == null ||
        ageThirdPerson == undefined
      ) {
        arrayPrice.push({ thirdPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageThirdPerson <= 17) {
        arrayPrice.push({ thirdPersonPrice: 40 });
        arrayFullPrice.push(40);
      } else if (ageThirdPerson >= 18 && ageThirdPerson <= 40) {
        arrayPrice.push({ thirdPersonPrice: 50 });
        arrayFullPrice.push(50);
      } else {
        arrayPrice.push({ thirdPersonPrice: 60 });
        arrayFullPrice.push(60);
      }

      if (
        ageFourthPerson == "" ||
        ageFourthPerson == 0 ||
        ageFourthPerson == null ||
        ageFourthPerson == undefined
      ) {
        arrayPrice.push({ fourthPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFourthPerson <= 17) {
        arrayPrice.push({ fourthPersonPrice: 40 });
        arrayFullPrice.push(40);
      } else if (ageFourthPerson >= 18 && ageFourthPerson <= 40) {
        arrayPrice.push({ fourthPersonPrice: 50 });
        arrayFullPrice.push(50);
      } else {
        arrayPrice.push({ fourthPersonPrice: 60 });
        arrayFullPrice.push(60);
      }

      //  adding the total price that the beneficiaries will pay
      let fullPrice =
        arrayFullPrice[0] +
        arrayFullPrice[1] +
        arrayFullPrice[2] +
        arrayFullPrice[3];
      let pay1 = arrayFullPrice[0];
      let pay2 = arrayFullPrice[1];
      let pay3 = arrayFullPrice[2];
      let pay4 = arrayFullPrice[3];

      //  beneficiarios.json object
      let userInformations = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        chosenPlan: selectorPlan,
      };

      //  proposta.json object
      let userPriceAndInformation = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        pay1: pay1,
        pay2: pay2,
        pay3: pay3,
        pay4: pay4,
        chosenPlan: selectorPlan,
        peoplePrice: arrayPrice,
        fullPrice: fullPrice,
      };

      //  Getting the information that will be used in front
      req.session.userPriceAndInformation = JSON.stringify(
        userPriceAndInformation
      );

      //  Transforming the object in JSON and posting in beneficiarios.json
      function userInformationsJson() {
        fs.readFile("beneficiarios.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userInformations);

            const json = JSON.stringify(file);

            fs.writeFile("beneficiarios.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      //  Transforming the object into JSON and posting to proposal.json
      function userPriceAndInformationJson() {
        fs.readFile("proposta.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userPriceAndInformation);

            const json = JSON.stringify(file);

            fs.writeFile("proposta.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      userInformationsJson();
      userPriceAndInformationJson();

      //  Finishing the process and send the informations to the front
      res.redirect("../confirmPlan");
    }

    // ----------------------------------------> Fifth plan
    if (selectorPlan == 5) {
      //  Prices arrays
      let arrayPrice = [];
      let arrayFullPrice = [];

      //  Age validation per person to discover how many the beneficiary will pay
      if (
        ageFirstPerson == "" ||
        ageFirstPerson == 0 ||
        ageFirstPerson == null ||
        ageFirstPerson == undefined
      ) {
        arrayPrice.push({ firstPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFirstPerson <= 17) {
        arrayPrice.push({ firstPersonPrice: 50 });
        arrayFullPrice.push(50);
      } else if (ageFirstPerson >= 18 && ageFirstPerson <= 40) {
        arrayPrice.push({ firstPersonPrice: 60 });
        arrayFullPrice.push(60);
      } else {
        arrayPrice.push({ firstPersonPrice: 70 });
        arrayFullPrice.push(70);
      }

      if (
        ageSecondPerson == "" ||
        ageSecondPerson == 0 ||
        ageSecondPerson == null ||
        ageSecondPerson == undefined
      ) {
        arrayPrice.push({ secondPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageSecondPerson <= 17) {
        arrayPrice.push({ secondPersonPrice: 50 });
        arrayFullPrice.push(50);
      } else if (ageSecondPerson >= 18 && ageSecondPerson <= 40) {
        arrayPrice.push({ secondPersonPrice: 60 });
        arrayFullPrice.push(60);
      } else {
        arrayPrice.push({ secondPersonPrice: 70 });
        arrayFullPrice.push(70);
      }

      if (
        ageThirdPerson == "" ||
        ageThirdPerson == 0 ||
        ageThirdPerson == null ||
        ageThirdPerson == undefined
      ) {
        arrayPrice.push({ ageThirdPerson: 0 });
        arrayFullPrice.push(0);
      } else if (ageThirdPerson <= 17) {
        arrayPrice.push({ thirdPersonPrice: 50 });
        arrayFullPrice.push(50);
      } else if (ageThirdPerson >= 18 && ageThirdPerson <= 40) {
        arrayPrice.push({ thirdPersonPrice: 60 });
        arrayFullPrice.push(60);
      } else {
        arrayPrice.push({ thirdPersonPrice: 70 });
        arrayFullPrice.push(70);
      }

      if (
        ageFourthPerson == "" ||
        ageFourthPerson == 0 ||
        ageFourthPerson == null ||
        ageFourthPerson == undefined
      ) {
        arrayPrice.push({ fourthPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFourthPerson <= 17) {
        arrayPrice.push({ fourthPersonPrice: 50 });
        arrayFullPrice.push(50);
      } else if (ageFourthPerson >= 18 && ageFourthPerson <= 40) {
        arrayPrice.push({ fourthPersonPrice: 60 });
        arrayFullPrice.push(60);
      } else {
        arrayPrice.push({ fourthPersonPrice: 70 });
        arrayFullPrice.push(70);
      }

      //  adding the total price that the beneficiaries will pay
      let fullPrice =
        arrayFullPrice[0] +
        arrayFullPrice[1] +
        arrayFullPrice[2] +
        arrayFullPrice[3];
      let pay1 = arrayFullPrice[0];
      let pay2 = arrayFullPrice[1];
      let pay3 = arrayFullPrice[2];
      let pay4 = arrayFullPrice[3];

      //  beneficiarios.json object
      let userInformations = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        chosenPlan: selectorPlan,
      };

      //  proposta.json object
      let userPriceAndInformation = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        pay1: pay1,
        pay2: pay2,
        pay3: pay3,
        pay4: pay4,
        chosenPlan: selectorPlan,
        peoplePrice: arrayPrice,
        fullPrice: fullPrice,
      };

      //  Getting the information that will be used in front
      req.session.userPriceAndInformation = JSON.stringify(
        userPriceAndInformation
      );

      //  Transforming the object into JSON and posting to proposal.json
      function userInformationsJson() {
        fs.readFile("beneficiarios.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userInformations);

            const json = JSON.stringify(file);

            fs.writeFile("beneficiarios.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      //  Transforming the object into JSON and posting to proposal.json
      function userPriceAndInformationJson() {
        fs.readFile("proposta.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userPriceAndInformation);

            const json = JSON.stringify(file);

            fs.writeFile("proposta.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      userInformationsJson();
      userPriceAndInformationJson();

      //  Finishing the process and send the informations to the front
      res.redirect("../confirmPlan");
    }

    //  ----------------------------------------> Sixth plan until one person
    if (selectorPlan == 6 && selectorPerson == 1) {
      //  Prices arrays
      let arrayPrice = [];
      let arrayFullPrice = [];

      //  Age validation per person to discover how many the beneficiary will pay
      if (
        ageFirstPerson == "" ||
        ageFirstPerson == 0 ||
        ageFirstPerson == null ||
        ageFirstPerson == undefined
      ) {
        arrayPrice.push({ firstPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFirstPerson <= 17) {
        arrayPrice.push({ firstPersonPrice: 60 });
        arrayFullPrice.push(60);
      } else if (ageFirstPerson >= 18 && ageFirstPerson <= 40) {
        arrayPrice.push({ firstPersonPrice: 70 });
        arrayFullPrice.push(70);
      } else {
        arrayPrice.push({ firstPersonPrice: 80 });
        arrayFullPrice.push(80);
      }

      //  adding the total price that the beneficiaries will pay
      let fullPrice = arrayFullPrice[0];
      let pay1 = arrayFullPrice[0];

      //  beneficiarios.json object
      let userInformations = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        age1: ageFirstPerson,
        chosenPlan: selectorPlan,
      };

      //  proposta.json object
      let userPriceAndInformation = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        age1: ageFirstPerson,
        pay1: pay1,
        chosenPlan: selectorPlan,
        peoplePrice: arrayPrice,
        fullPrice: fullPrice,
      };

      //  Getting the information that will be used in front
      req.session.userPriceAndInformation = JSON.stringify(
        userPriceAndInformation
      );

      //  Transforming the object into JSON and posting to proposal.json
      function userInformationsJson() {
        fs.readFile("beneficiarios.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userInformations);

            const json = JSON.stringify(file);

            fs.writeFile("beneficiarios.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      //  Transforming the object into JSON and posting to proposal.json
      function userPriceAndInformationJson() {
        fs.readFile("proposta.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userPriceAndInformation);

            const json = JSON.stringify(file);

            fs.writeFile("proposta.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      userInformationsJson();
      userPriceAndInformationJson();

      //  Finishing the process and send the informations to the front
      res.redirect("../confirmPlan");
    }

    //  ----------------------------------------> Sixth plan with four people
    if (selectorPlan == 6 && selectorPerson != 1) {
      //  Prices arrays
      let arrayPrice = [];
      let arrayFullPrice = [];

      //  Age validation per person to discover how many the beneficiary will pay
      if (
        ageFirstPerson == "" ||
        ageFirstPerson == 0 ||
        ageFirstPerson == null ||
        ageFirstPerson == undefined
      ) {
        arrayPrice.push({ firstPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFirstPerson <= 17) {
        arrayPrice.push({ firstPersonPrice: 55 });
        arrayFullPrice.push(55);
      } else if (ageFirstPerson >= 18 && ageFirstPerson <= 40) {
        arrayPrice.push({ firstPersonPrice: 65 });
        arrayFullPrice.push(65);
      } else {
        arrayPrice.push({ firstPersonPrice: 75 });
        arrayFullPrice.push(75);
      }

      if (
        ageSecondPerson == "" ||
        ageSecondPerson == 0 ||
        ageSecondPerson == null ||
        ageSecondPerson == undefined
      ) {
        arrayPrice.push({ secondPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageSecondPerson <= 17) {
        arrayPrice.push({ secondPersonPrice: 55 });
        arrayFullPrice.push(55);
      } else if (ageSecondPerson >= 18 && ageSecondPerson <= 40) {
        arrayPrice.push({ secondPersonPrice: 65 });
        arrayFullPrice.push(65);
      } else {
        arrayPrice.push({ secondPersonPrice: 75 });
        arrayFullPrice.push(75);
      }

      if (
        ageThirdPerson == "" ||
        ageThirdPerson == 0 ||
        ageThirdPerson == null ||
        ageThirdPerson == undefined
      ) {
        arrayPrice.push({ thirdPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageThirdPerson <= 17) {
        arrayPrice.push({ thirdPersonPrice: 55 });
        arrayFullPrice.push(55);
      } else if (ageThirdPerson >= 18 && ageThirdPerson <= 40) {
        arrayPrice.push({ thirdPersonPrice: 65 });
        arrayFullPrice.push(65);
      } else {
        arrayPrice.push({ thirdPersonPrice: 75 });
        arrayFullPrice.push(75);
      }

      if (
        ageFourthPerson == "" ||
        ageFourthPerson == 0 ||
        ageFourthPerson == null ||
        ageFourthPerson == undefined
      ) {
        arrayPrice.push({ fourthPersonPrice: 0 });
        arrayFullPrice.push(0);
      } else if (ageFourthPerson <= 17) {
        arrayPrice.push({ fourthPersonPrice: 55 });
        arrayFullPrice.push(55);
      } else if (ageFourthPerson >= 18 && ageFourthPerson <= 40) {
        arrayPrice.push({ fourthPersonPrice: 65 });
        arrayFullPrice.push(65);
      } else {
        arrayPrice.push({ fourthPersonPrice: 75 });
        arrayFullPrice.push(75);
      }

      //  adding the total price that the beneficiaries will pay
      let fullPrice =
        arrayFullPrice[0] +
        arrayFullPrice[1] +
        arrayFullPrice[2] +
        arrayFullPrice[3];
      let pay1 = arrayFullPrice[0];
      let pay2 = arrayFullPrice[1];
      let pay3 = arrayFullPrice[2];
      let pay4 = arrayFullPrice[3];

      //  beneficiarios.json object
      let userInformations = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        chosenPlan: selectorPlan,
      };

      //  proposta.json object
      let userPriceAndInformation = {
        userQuantity: selectorPerson,
        name1: nameFirstPerson,
        name2: nameSecondPerson,
        name3: nameThirdPerson,
        name4: nameFourthPerson,
        age1: ageFirstPerson,
        age2: ageSecondPerson,
        age3: ageThirdPerson,
        age4: ageFourthPerson,
        pay1: pay1,
        pay2: pay2,
        pay3: pay3,
        pay4: pay4,
        chosenPlan: selectorPlan,
        peoplePrice: arrayPrice,
        fullPrice: fullPrice,
      };

      //  Getting the information that will be used in front
      req.session.userPriceAndInformation = JSON.stringify(
        userPriceAndInformation
      );

      //  Transforming the object into JSON and posting to beneficiarios.json
      function userInformationsJson() {
        fs.readFile("beneficiarios.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userInformations);

            const json = JSON.stringify(file);

            fs.writeFile("beneficiarios.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      //  Transforming the object into JSON and posting to proposal.json
      function userPriceAndInformationJson() {
        fs.readFile("proposta.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            const file = JSON.parse(data);
            file.push(userPriceAndInformation);

            const json = JSON.stringify(file);

            fs.writeFile("proposta.json", json, "utf8", function (err) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          }
        });
      }

      userInformationsJson();
      userPriceAndInformationJson();

      //  Finishing the process and send the informations to the front
      res.redirect("../confirmPlan");
    }
  },
};

module.exports = userController;
