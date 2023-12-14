require("dotenv").config();
const express = require("express");
const routes = require("./controllers");
const cors = require("cors");

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ROUTES

app.use(routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}....`);
});
