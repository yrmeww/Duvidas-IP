const express = require('express');
const app = new express();

const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(require("./src/routes"));
app.use("/",express.static(__dirname+'/view'));

app.listen(process.env.port || 3000);

console.log("Running");

const query = require("./src/db_query");
const dbmanager = require("./src/db_manager");

//Placeholder callback test
function testeCallback(data){
    console.log("Data recieved:")
    console.log(data)
}