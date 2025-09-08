const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/api/products", (req, res) => {
    res.json([
        

    ])
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  