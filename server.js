const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

app.use(cors());

/*
** parse requests of application/json
*/
app.use(express.json());

/*
** parse requests of application/x-www-form-urlencoded
*/
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Role based application is running" });
});

/*
** Declare all available routes
*/
require('./app/routes/auth.routes')(app);

db.sequelize.sync();

/*
** Set server port
*/
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});