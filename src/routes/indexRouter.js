const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send(`
        <a href="/api/users">회원관리</a>
        <a href="/api/fields">경기장관리</a>
        <a href="/api/notices">공지사항</a>
        <a href="/api/reservations">예약관리</a>
        <a href="/api/auth/login">로그인</a>
    `);
});

module.exports = router;