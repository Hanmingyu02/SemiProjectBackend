const express = require("express");
const router = express.Router();
const {
    getNotices,
    createNotice,
    updateNotice,
    deleteNotice,
    searchNotices,
} = require("../controllers/noticeController");
// 게시글 조회

// 게시글 작성
// 게시글 수정
// 게시글 삭제
// 게시글 검색
module.exports = router;
