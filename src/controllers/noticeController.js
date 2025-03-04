const pool = require("../config/dbPool");
require("dotenv").config();

exports.getNotices = async (req, res) => {
    const sql = `select * from notices order by user_id desc`;
    try {
        const [result] = await pool.query(sql);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};
exports.createNotice = async (req, res) => {
    const [title, content] = req.body;
    const noticeData = [title, content];
    try {
        const sql = `insert into notices(title, content) values(?,?)`;
        const [result] = await pool.query(sql, noticeData);
        if (result.affectedRows > 0) {
            res.json({ result: "success", message: "공지사항 등록 성공" });
        } else {
            res.json({ result: "fail", message: "공지사항 등록 실패" });
        }
    } catch (error) {
        res.status(500).json({ result: "fail", message: "DB 에러 발생: " + err.message });
    }
};
exports.updateNotice = async (req, res) => {
    const { notice_id } = req.params;
    const { title, content } = req.body;

    try {
        const noticeData = [title, content, notice_id];
        const sql = `update notices set title=?, content=? where notice_id=?`;
        const [result] = await pool.query(sql, noticeData);
        if (result === 0) {
            return res.json({ result: "fail", message: "공지사항 수정 실패" });
        } else {
            return res.json({ result: "success", message: "공지사항 수정 성공" });
        }
    } catch (error) {
        console.error(error);
    }
};
exports.deleteNotice = async (req, res) => {
    const { notice_id } = req.params;
    try {
        const sql = "delete from notices where notice_id=?";
        const [result] = await pool.query(sql, notice_id);
        if (result.affectedRows === 0) {
            return res.json({ result: "fail", message: "삭제할 공지사항이 존재하지 않음" });
        } else {
            res.json({ result: "success", message: "공지사항 삭제 성공" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.searchNotices = async (req, res) => {};
