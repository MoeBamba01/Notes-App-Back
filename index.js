require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();



mongoose.connect(config.connectionString);

app.use(express.json());

const userRouter = require("./Routes/userRoutes");
const noteRouter = require("./Routes/noteRoutes");


app.use(
    cors({
    origin: "*",
})
);

app.use('/', userRouter);
app.use('/', noteRouter);





app.get("/", (req, res) => {
    res.send({ data: "Hello !" });
});


app.listen(4000);

module.exports = app;
