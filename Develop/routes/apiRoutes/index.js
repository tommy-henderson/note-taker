const fs = require('fs');
const db = require('../../db/db.json')
const router = require('express').Router();
const uniqid = require('uniqid');

// gets notes from db.json file and sends data
router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));

        res.send(data)
    })
})

// Post notes with title and text
router.post('/api/notes', (req, res) => {
    let newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    }
    // Reads notes page and adds data to note
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;

        let newData = JSON.parse(data);
        newData.push(newNote);
        console.log(newData)

        // Uses FS to write new content to db.json file
        fs.writeFile('./db/db.json', JSON.stringify(newData), (err) => {
            if (err) throw err;

            res.send('successfully added');
        })
    });

})

module.exports = router;