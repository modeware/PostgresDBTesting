const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class UserRepo {

    static async find() {
        const { rows } = await pool.query('SELECT * FROM users');

        return toCamelCase(rows);
    }

    static async findById(id) {
        const {rows} = await pool.query(`
            SELECT * FROM users where id = $1;
        `, [id])

        return toCamelCase(rows);

    }

    static async insert(username, bio) {    
        const {rows} = await pool.query(`
        Insert into users (username, bio) values ($1, $2) RETURNING *;
    `, [username, bio])

    return toCamelCase(rows);

    }

    static async update(id, username, bio){
        const {rows} = await pool.query(`

            UPDATE users SET username = $1,
                bio=$2 where id = $3 RETURNING *
        `, [username, bio, id])

        return toCamelCase(rows)[0];
    }

    static async delete(id){
        const {rows} = await pool.query(`
            DELETE FROM users where id = $1 RETURNING *;
        `, [id])

        return toCamelCase(rows)[0];

    }

    static async count(){
        const {rows} = await pool.query('Select count(*) from users;');
        
        return parseInt(rows[0].count);
    }
}

module.exports = UserRepo;