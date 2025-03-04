const pool = require('../config/dbPool');

exports.listUser = async (req, res) => {
    const sql = `select user_id,username,email,created_at,refreshtoken from users order by user_id desc`;
    try {
        const [result] = await pool.query(sql);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.creatUser = async (req, res) => {
    const {email, username, passwd} = req.body;
    const userData = [email, username, passwd];
    try {
        const sql = `insert into users(username,email,passwd) values(?,?,?)`;
        const [result] = await pool.query(sql, userData);
        if (result.affectedRows > 0) {
            res.json({ result: 'success', message: `등록 성공 회원번호는 ${result.insertId}번 입니다` });
        } else {
            res.json({ result: 'fail', message: '회원 정보 등록 실패' });
        }
    } catch (error) {
        console.error('error: ', err);
        res.status(500).json({ result: 'fail', message: 'DB 에러 발생: ' + err.message });
    }
};
exports.duplicatedEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const sql = `select * from users where email=?`;
        const [result] = await pool.query(sql, [email]);
        if (result.length === 0) {
            res.json({ result: 'ok', message: `${email}은 사용 가능합니다` });
        } else {
            res.json({ result: 'no', message: `${email}은 이미 사용 중입니다` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUser = async (req, res) => {
    try {
        const sql = `select * from users where user_id=?`;
        const { user_id } = req.params;
        const [result] = await pool.query(sql, [user_id]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUser = async (req, res) => {
    const { username, email, passwd } = req.body;
    const { user_id } = req.params;

    try {
        const data = [username, email, passwd, user_id];
        const sql = `update users set username=?, email=?, passwd=? where id=?`;
        const result = await pool.query(sql, data);
        if (result === 0) {
            return res.json({ result: 'fail', message: '회원정보 수정 실패' });
        } else {
            return res.json({ result: 'success', message: '회원정보 수정 성공' });
        }
    } catch (error) {
        console.error(error);
    }
};
exports.deleteUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const sql = `delete from users where user_id=?`;
        const [result] = await pool.query(sql, [user_id]);
        if (result.affectedRows === 0) {
            return res.json({ result: 'fail', message: '삭제할 회원정보가 존재하지 않음' });
        }
        res.json({ result: 'success', message: '회원정보 삭제 성공' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
