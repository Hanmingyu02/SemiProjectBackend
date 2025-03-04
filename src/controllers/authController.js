const pool = require('../config/dbPool');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user, secret, expiresIn) => {
    return jwt.sign(user, secret, { expiresIn });
};

exports.login = async (req, res) => {
    const { email, passwd } = req.body;
    try {
        const sql = 'select user_id,username,email from users where email=? and passwd=?';

        const [result] = await pool.query(sql, [email, passwd]);
        if (result.length === 0) {
            return res.status(401).json({ result: 'fail', message: '아이디 또는 비밀번호를 확인하시오.' });
        }
        const user = result[0];

        const accessToken = generateToken(user, process.env.ACCESS_SECRET, '15m');
        const refreshToken = generateToken(user, process.env.REFRESH_SECRET, '1d');

        const sql2 = 'update users set refreshToken =? where user_id=?';
        await pool.query(sql2, [refreshToken, user.user_id]);

        res.json({ result: 'success', data: user, message: '로그인 성공', accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: 'DB Error', message: error.message });
    }
};

exports.refreshVerify = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'refresh token이 없어요' });

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Refresh Token' });
        }
        const sql = `select user_id,username,email from users where refreshToken=?`;
        const [result] = await pool.query(sql, [refreshToken]);
        if (result.length === 0) {
            return res.status(403).json({ message: '인증받지 않은 회원입니다' });
        }
        const user = result[0];
        const newAccessToken = generateToken(user, process.env.ACCESS_SECRET, '15m');
        res.json({ accessToken: newAccessToken });
    });
};
exports.logout = async (req, res) => {
    const { email } = req.body;
    try {
        const sql = 'update users set refreshToken=null where email=?';
        const [result] = await pool.query(sql, [email]);
        if (result.affectedRows > 0) {
            res.json({ result: 'success', message: '로그아웃 처리 되었습니다' });
        } else{
            res.status(400).json({ message: '유효하지 않은 사용자 입니다' });
        }
    } catch (error) {
        res.status(500).json({ message: 'DB Error-로그아웃 중 에러 발생 ' + error });
    }
};
