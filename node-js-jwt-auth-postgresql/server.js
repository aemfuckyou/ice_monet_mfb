const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"  //"http://localhost:8081" port frontend = 3000 port backend = 8080
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({alter: true}).then(async () => {
await initial();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to ice_monet application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
    await Role.findOrCreate({ where: { name: "user" } });
    await Role.findOrCreate({ where: { name: "moderator" } });
    await Role.findOrCreate({ where: { name: "admin" } });

    console.log("Roles initialized");
}

