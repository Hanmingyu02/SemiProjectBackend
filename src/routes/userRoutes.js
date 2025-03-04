const express = require('express');
const router = express.Router();
const {
    listUser,
    creatUser,
    getUser,
    duplicatedEmail,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
//모든 회원 조회
router.get('/', listUser);
// 특정 회원 조회
router.get('/:user_id', getUser);
// 회원 가입
router.post('/', creatUser);
// 이메일 중복
router.post('/duplex', duplicatedEmail);
// 회원 정보 수정
router.put('/:user_idid', updateUser);
// 회원 정보 삭제
router.delete('/:user_id', deleteUser);
module.exports = router;
