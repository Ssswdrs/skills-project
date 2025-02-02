import db from '../db.js'

const log = async () => {
    const data = await db.query('SELECT * FROM users ')
    return data
}

export default {log}