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

app.post('api/mahasiswa', (req, res) => {
    const { nama, nim, kelas, prodi } = req.body;

    if ( !nama || !nim || !kelas || !prodi ) {
        return res.status(400).json({message: 'nama, nim, kelas, prodi wajib diisi'});
    }

    db.query(
    'INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)',
    [nama, nim, kelas, prodi],
    (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
         }

            res.status(201).json({ message: 'User created successfully' });
         }
    );

});

app.put('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;
    const { nama, nim, kelas, prodi } = req.body;

    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ?, prodi = ? WHERE id = ?',
        [nama, nim, kelas, prodi, userId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }

            res.json({ message: 'User updated successfully' });
        }
    );
});

app.delete('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;

    db.query(
        'DELETE FROM mahasiswa WHERE id = ?',
        [userId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }

          

            res.json({ message: 'User deleted successfully' });
        }
    );
});


