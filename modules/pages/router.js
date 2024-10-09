var express = require("express");
var pageRouter = express.Router();

var pages = require("../admin/functions");

// convert query string formats from form data into JSON format
pageRouter.use(express.urlencoded({ extended: true }));
pageRouter.use(express.json());

// routes definitions
pageRouter.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// to display characters in the view
pageRouter.get("/characters", async (req, res) => {
  let roster = await pages.getCharacters();
  // console.log(roster);
  // console.log(roster[0].data);
  // adding a price because the assignment asks for a business
  roster = roster[0].data.map(character => {
    if (character.name == "Rover" || character.name == "Rover (Havoc)"){
      character.price = 0; // the price is 0 because this is the main character of the game, who is free
    }
    else if (character.rarity == 5){
      character.price = 200.00;
    }
    else {
      character.price = 100.00;
    }
    // add image property with standardized casing and replace whitespaces with '_'
    character.image = `${character.name.toLowerCase().replace(/\s+/g,'_')}.jpg`;
    return character;
  });
  res.render("characters", { title: "Characters for purchase", roster }); // pass the array of documents to the view under the name of "roster"
  });
  
  // display weapons in the view
  pageRouter.get("/weapons", async (req, res) => {
  let armory = await pages.getWeapons();
  // console.log(armory);
  armory = armory.map(weapon => {
    if (weapon.rarity == 5){
      weapon.price = 200.00;
    }
    else if (weapon.rarity == 4){ // in the interest of time, I'll only be displaying 5 star weapons, but this code is just to show how I would price these weapons
      weapon.price = 150.00;
    }
    else if (weapon.rarity == 3){ 
      weapon.price = 100.00;
    }
    else{
      weapon.price = 0;
    }
    // add image property
    weapon.image = `${weapon.name.toLowerCase().replace(/\s+/g,'_')}.webp`;
    return weapon;
  });
  res.render("weapons", { title: "Weapons for purchase", armory }); // pass the array of documents to the view under the variable name of "armory"
  });

module.exports = pageRouter;