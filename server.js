const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

dotenv.config();
const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend Server Running"));

const PORT = process.env.PORT || 7777;

// 서버 가동
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
