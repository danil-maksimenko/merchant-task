const express = require('express');
const {
  createRecordHandler,
  getRecordsHandler
} = require('../controllers/recordController');

const router = express.Router();

router.post('/records', createRecordHandler);
router.get('/records', getRecordsHandler);

module.exports = router;