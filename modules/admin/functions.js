const { MongoClient } = require("mongodb");

// create a new MongoCLient
// const dbUrl = `mongodb://${process.env.DBADMIN}:${process.env.DBADMINPWD}@${process.env.DBHOST}/?authSource=wuwa`;
const dbUrl = `mongodb+srv://${process.env.DBADMIN}:${process.env.DBADMINPWD}@${process.env.DBHOST}/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(dbUrl);

// MongoDb Functions
async function connection(){
  db = client.db("wuwa");
  return db;
}

async function getCharacters(){
  db = await connection();
  var results = db.collection("characters").find({});
  res = await results.toArray();
  return res;
}

async function getWeapons(){
  db = await connection();
  var results = await db.collection("weapons").findOne({}); // using findOne because I know there's only one document in the collection
  // console.log(results);
  var weapons = results.data;
  var filteredweapons = weapons.filter(weapon => weapon.rarity == 5); // filtering for only 5 star weapons in the interest of time
  return filteredweapons;
}

async function addCharacter(character){
  db = await connection();
  var status = await db.collection("characters").updateOne(
    {}, // left blank since there's only one document in the collection; otherwise, specify with id
    { $push: { data: character }}
  );
  console.log("character added");
} 

async function addWeapon(weapon){
  db = await connection();
  console.log
  var status = await db.collection("weapons").updateOne(
    {},
    { $push: { data: weapon}}
  );
  console.log("weapon added");
}

module.exports = {
  getCharacters,
  getWeapons,
  addCharacter,
  addWeapon
}