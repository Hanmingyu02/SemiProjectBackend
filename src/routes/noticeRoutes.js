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
router.get("/", getNotices);
// 게시글 작성
router.post("/", createNotice);
// 게시글 수정
router.post("/:notice_id", updateNotice);
// 게시글 삭제
router.delete("/:notice_id", deleteNotice);
// 게시글 검색
router.get("/search", searchNotices);
module.exports = router;
