const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const middleware = require("./middlewares");
const fs = require("fs");
const PORT = 5000;

const app = express();
app.use(middleware);
app.post("/", (req, res) => {
  try {
    // Convert the array to a JSON string
    const data = JSON.stringify(req.body, null, 2);
    // Write the JSON string to the file
    fs.writeFileSync("world.json", data, "utf-8");
    res.send(req.body);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error saving data");
  }
});

app.use("/api", routes);

// * ------------------------------ Database and Server Connection ------------------------------

// mongoose
//   .connect(MongoDB_URL)
//   .then((result) => {
//     console.log("MongoDB is connected successfully");
//   })
//   .catch((err) => {
//     console.log(`🚀 ~ file: index.js:23 ~ mongoose.connect ~ err:\n =>`, err);
//   });

try {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${"http://localhost:" + PORT}`);
  });
} catch (error) {
  console.log(`🚀 ~ file: index.js:31 ~ error:\n =>`, error);
}
