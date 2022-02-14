const express = require('express')
const Router = express.Router()

Router.post('/add-paper', (req, res) => {
    res.send('Paper added successfully');
})
    .delete('/delete-paper', (req, res) => {
        res.send('Paper deleted successfully');
    })

module.exports = Router