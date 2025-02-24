const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user-routes");
const dailyMarkRoutes = require('./routes/daily-mark.routes');
const achievementRoutes = require('./routes/achievement-routes');
const storyRoutes = require('./routes/story-routes');
const friendshipRoutes = require('./routes/friendship-routes');
const groupRoutes = require('./routes/group-routes');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/daily-mark", dailyMarkRoutes);
app.use("/api/v1/achievement", achievementRoutes);
app.use("/api/v1/story", storyRoutes);
app.use("/api/v1/friendship", friendshipRoutes);
app.use("/api/v1/group", groupRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });
  
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");

    sequelize
      .sync({ alter: true })
      .then(() => {
        console.log("All models were synchronized successfully!");
      })
      .catch((err) => console.log("Error syncing models:", err));
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
