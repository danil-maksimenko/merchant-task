const fs = require('fs');
const path = require('path');

const DB_FILE_PATH = path.join(__dirname, '..', 'db.json')


function readRecords() {
  const fileContent = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  return JSON.parse(fileContent);
}

function writeRecords(records) {
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(records, null, 2))
}

module.exports = {
  readRecords,
  writeRecords
};