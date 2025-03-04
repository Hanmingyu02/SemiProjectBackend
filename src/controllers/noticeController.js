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
exports.updateNotice = async (req, res) => {};
exports.deleteNotice = async (req, res) => {};
exports.searchNotices = async (req, res) => {};
