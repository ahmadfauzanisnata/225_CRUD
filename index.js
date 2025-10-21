const express = require('express');
let mysql = require('mysql2');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'afi21092004', // sesuaikan dengan password MySQL kalian
    database: 'biodata',
    port: 3007
});

db.connect((err) =>{
    if (err) {
        console.error('Error connection to mysql: ' + err.stack);
        return;
    }
    console.log(' Connection successfully')
});

app.get('api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            console.error('error executing query: ' + err.stack);
            res.status(500).send('error');
            return;
        }
        res.json(results);
    });
});

