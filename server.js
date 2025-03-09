require("dotenv").config();
const express = require("express");
const cors = require("cors");
const githubRoutes = require("./githubRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/github", githubRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
