require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const wokoutRoutes = require("./routes/workouts");

//express app
const app = express();

//interceptor
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} @ ${req.path}, body: ${req.body}`);
  next();
});

//routes
app.use("/api/workouts", wokoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB");
      console.log("Listening on port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
