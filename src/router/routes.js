const express = require('express');
const IndexController = require('../controllers');

const router = express.Router();

router.get('/', (request, response) => { IndexController.index(request, response)});

router.use((request, response) => {
    return response.status(404).json({ status: 404, message: 'Not Found' });
});

module.exports = router;