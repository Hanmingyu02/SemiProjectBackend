const pool = require('../config/dbPool');

exports.getFields = async (req, res) => {
    const sql = `select field_id, name, location, status from fields order by field_id desc`;
    try {
        const [result] = await pool.query(sql);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
