require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("./models/User");
require("./services/passport");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  dbName: "test"
});

const app = express();
require("./services/middleware")(app);
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
