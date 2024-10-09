var express = require("express");
var router = express.Router();

var model = require("./functions");

// convert query string formats from form data into JSON format
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// routes definitions
router.get("/", (req, res) => {
res.render("create", { title: "Add" });
});

// get form data for making a new character 
router.post("/character", async (request, response) => {
  // get form data
  let name = request.body.name; // get the value for field with name "name"
  let rarity = request.body.rarity; // request.body is form POST data
  let element = request.body.element;
  let weapon_class = request.body.weapon_class;
  let description = request.body.description;
  var newCharacter = { 
    "name": name,
    "rarity": rarity,
    "element": element,
    "weapon_class": weapon_class,
    "description": description
  };
  console.log(newCharacter);
  await model.addCharacter(newCharacter);
  response.redirect("/characters");
});

// get form data for making a new weapon 
router.post("/weapon", async (request, response) => {
  // get form data
  let name = request.body.name; // get the value for field with name "name"
  let rarity = request.body.rarity; // request.body is form POST data
  let className = request.body.class;
  let base_atk = request.body.base_atk;
  let second_stat = request.body['2nd_stat'];
  let second_stat_value_percentage = request.body['2nd_stat_value_%'];
  let description = request.body.description;
  var newWeapon = { 
    "name": name,
    "rarity": rarity,
    "class": className,
    "base_atk": base_atk,
    "2nd_stat": second_stat,
    "2nd_stat_value_%": second_stat_value_percentage,
    "description": description
  };
  console.log(newWeapon);
  await model.addWeapon(newWeapon);
  response.redirect("/weapons");
});

module.exports = router;