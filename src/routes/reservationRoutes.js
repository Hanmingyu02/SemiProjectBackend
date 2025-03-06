const express = require('express');
const router = express.Router();
const {
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation,
    updateReservationStatus,
} = require('../controllers/reservationController');
// 예약 조회
router.get('/', getReservations);
// 예약 생성
router.post('/', createReservation);
// 예약 수정
router.put('/:reservation_id', updateReservation);
// 예약 삭제
router.delete('/:reservation_id', deleteReservation);
// 상태 관리
router.patch('/:reservation_id', updateReservationStatus);
module.exports = router;
