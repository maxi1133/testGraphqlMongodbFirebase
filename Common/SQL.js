const sql = require('mssql')
const { connect } = sql

let obj = {
    user: 'sa',
    password: 'admin@1234',
    server: '192.168.1.170', 
    port: 1433,
    database: 'ismart',
    options : {
        trustServerCertificate : true
    }
}

connect( obj , () => console.log('connected db'))

module.exports = { sql }