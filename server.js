const express = require("express");
const router = require("./routes/imageRouter");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization,image-name",
};
app.use(cors(corsOptions));
//Literally use the router
app.use("/api/images/", router);

app.options("*", cors());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
