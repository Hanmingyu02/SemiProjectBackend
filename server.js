const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;

// 라우터 가져오기
const indexRouter = require("./src/routes/indexRouter");
const fieldRouter = require("./src/routes/fieldRoutes");
const noticeRouter = require("./src/routes/noticeRoutes");
const reservationRouter = require("./src/routes/reservationRoutes");
const authRouter = require("./src/routes/authRoutes");
const userRouter = require('./src/routes/userRoutes');

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 라우터와 연결
app.use("/", indexRouter);
app.use("/api/users", userRouter);
app.use("/api/fields" , fieldRouter);
app.use("/api/notices", noticeRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/auth", authRouter);

// 서버 가동
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
