const pool = require('../config/dbPool');
require('dotenv').config();

exports.getNotices = async (req, res) => {
    // users 테이블과 조인하여 이메일을 가져오는 쿼리
    const sql = `
        SELECT notices.notice_id, notices.title, notices.content, notices.created_at, users.username AS username
        FROM notices
        LEFT JOIN users ON notices.user_id = users.user_id
        ORDER BY notices.created_at DESC
    `;
    try {
        const [result] = await pool.query(sql);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getNoticeById = async (req, res) => {
    const { notice_id } = req.params;
    const sql = `
      SELECT notices.notice_id, notices.title, notices.content, notices.created_at, users.email AS username
        FROM notices
        LEFT JOIN users ON notices.user_id = users.user_id
        WHERE notices.notice_id = ?
    `;
    try {
        const [result] = await pool.query(sql, [notice_id]);
        if (result.length === 0) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }
        res.json(result[0]); // 결과가 하나일 경우, 첫 번째 요소를 반환
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNotice = async (req, res) => {
    const { title, content, user_id } = req.body;
    const noticeData = [title, content, user_id]; // 데이터를 배열로 저장
    try {
        const sql = `INSERT INTO notices (title, content, user_id) VALUES (?, ?, ?)`;
        const [result] = await pool.query(sql, noticeData);
        if (result.affectedRows > 0) {
            res.json({ result: 'success', message: '공지사항 등록 성공' });
        } else {
            res.json({ result: 'fail', message: '공지사항 등록 실패' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ result: 'fail', message: 'DB 에러 발생: ' + error.message });
    }
};

exports.updateNotice = async (req, res) => {
    const { notice_id } = req.params;
    const { title, content } = req.body;

    try {
        const noticeData = [title, content, notice_id];
        const sql = `update notices set title=?, content=? where notice_id=?`;
        const [result] = await pool.query(sql, noticeData);
        if (result.affectedRows === 0) {
            return res.json({ result: 'fail', message: '공지사항 수정 실패' });
        } else {
            return res.json({ result: 'success', message: '공지사항 수정 성공' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '공지사항 수정 중 오류 발생' });
    }
};

exports.deleteNotice = async (req, res) => {
    const { notice_id } = req.params;
    try {
        const sql = 'delete from notices where notice_id=?';
        const [result] = await pool.query(sql, [notice_id]);
        if (result.affectedRows === 0) {
            return res.json({ result: 'fail', message: '삭제할 공지사항이 존재하지 않음' });
        } else {
            res.json({ result: 'success', message: '공지사항 삭제 성공' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchNotices = async (req, res) => {
    // 추가적인 검색 로직을 작성할 수 있습니다.
};
