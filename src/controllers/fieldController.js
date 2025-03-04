const pool = require("../config/dbPool");

exports.getFields = async (req, res) => {
    const sql = `select field_id, name, location, status from fields order by field_id desc`;
    try {
        const [result] = await pool.query(sql);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateFieldStatus = async (req, res) => {
    const { field_id } = req.params;
    try {
        const sql = `select * from fields where field_id=?`;
        const [results] = await pool.query(sql, [field_id]);
        if (results.length > 0) {
            const result = results[0];
            let newStatus;

            if (result.status === "AVAILABLE") {
                newStatus = "NOT AVAILABLE";
            } else {
                newStatus = "AVAILABLE";
            }
            const sql2 = `UPDATE fields SET status = ? WHERE field_id = ?`;
            await pool.query(sql2, [newStatus, field_id]); // await 추가
            return res.json({ result: "success", message: `${result.status} -> ${newStatus}` });
        }
        return res.json({ result: "fail", message: "해당 구장이 존재하지 않습니다." });
    } catch (error) {
        return res.status(500).json({ message: "DB Error", Error: error });
    }
};

exports.checkAvailability = async (req, res) => {
    const { field_id } = req.params;
    try {
        const sql = `select * from fields where field_id=?`;
        const [results] = await pool.query(sql, [field_id]);
        if (results.length > 0) {
            const result = results[0];
            if (result.status === "AVAILABLE") {
                return res.json({ result: "AVAILABLE", message: "예약가능 합니다." });
            } else {
                return res.json({ result: "NOT AVAILABLE", message: "예액 불가능 합니다." });
            }
        } else {
            return res.json({ result: "NOT AVAILABLE", message: "해당 구장이 존재하지 않습니다." });
        }
    } catch (error) {
        return res.status(500).json({ message: "DB Error", Error: error });
    }
};
