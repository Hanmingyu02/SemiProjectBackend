const pool = require('../config/dbPool');
require('dotenv').config();
exports.getReservations = async (req, res) => {
    try {
        const [result] = await pool.query(sql);
        const sql = `select * from Reservations order by id desc`;
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};
exports.createReservation = async (req, res) => {
    const { user_id, field_id, start_time, end_time } = req.body;
    const reservationData = [user_id, field_id, start_time, end_time, 'PENDING'];
    try {
        if (!user_id || !field_id || !start_time || !end_time) {
            return res.status(400).json({
                result: 'fail',
                message: '모든 필드(user_id, field_id, start_time, end_time)가 필요합니다',
            });
        }

        const start = new Date(start_time);
        const end = new Date(end_time);
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
            return res.status(400).json({
                result: 'fail',
                message: '유효한 시간 범위가 필요합니다 (end_time > start_time)',
            });
        }

        const [userResult] = await pool.query('select user_id from users where user_id = ?', [user_id]);
        if (userResult.length === 0) {
            return res.status(404).json({ result: 'fail', message: '사용자를 찾을 수 없습니다' });
        }

        const [fieldResult] = await pool.query('select status from fields where field_id = ?', [field_id]);
        if (fieldResult[0].status !== 'AVAILABLE') {
            return res.status(400).json({ result: 'fail', message: '경기장이 사용 가능하지 않습니다' });
        }

        // 중복 예약 체크
        const [overlapResult] = await pool.query(
            `select reservation_id from Reservations 
             where field_id = ? 
             and (
                 (start_time BETWEEN ? AND ?) 
                 or (end_time BETWEEN ? AND ?) 
                 or (start_time <= ? AND end_time >= ?)
             )`,
            [field_id, start_time, end_time, start_time, end_time, start_time, end_time]
        );
        if (overlapResult.length > 0) {
            return res.status(400).json({
                result: 'fail',
                message: '이 시간대에 이미 예약된 경기장이 있습니다',
            });
        }

        // 트랜잭션 시작
        await pool.beginTransaction();

        // 예약 생성
        const [reservationResult] = await pool.query(
            `insert into Reservations (user_id, field_id, start_time, end_time, status) 
             values (?, ?, ?, ?, ?)`,
            reservationData
        );

        // 필드 상태 변경 (RESERVED)
        await pool.query("update fields set status = 'NOT AVAILABLE' where field_id = ?", [field_id]);

        // 트랜잭션 커밋
        await pool.commit();

        res.status(201).json({
            result: 'success',
            message: '예약 성공',
            reservation_id: reservationResult.insertId,
        });
    } catch (error) {
        await pool.rollback();
        res.status(500).json({ result: 'fail', message: '서버 오류', error: error.message });
    }
};

exports.updateReservation = async (req, res) => {};
exports.deleteReservation = async (req, res) => {};
exports.updateReservationStatus = async (req, res) => {};
