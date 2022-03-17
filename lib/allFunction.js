const db = require('../db/connection');

function getChoicesList (table, choicesToGet) {
    const sql = `SELECT ${choicesToGet} FROM ${table}`;
    db.promise().query(sql)
        .then( ([rows] ) => {
            console.log([rows]);
            return rows;
        })
        .catch(console.log)
        .then( () => db.end());
}

module.exports = { getChoicesList };