// required exernal modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// load environment variables from .env
dotenv.config();

const router = require("./modules/admin/router");
const pageRouter = require("./modules/pages/router");

// app variables
const app = express();
const port = process.env.PORT || 8888;

// app configuration
app.set("view engine", "pug");

// set up folder for static files (e.g. CSS, client-side JS, images)
app.use(express.static(path.join(__dirname, "public")));

// use page routes from router
app.use("/", pageRouter);
app.use("/admin/add", router);

// server activation
app.listen(port, () => {
    console.log(`listening to requests on http://localhost:${port}`);
});

