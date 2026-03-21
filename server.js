const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DB_FILE_PATH = path.join(__dirname, 'db.json')

const merchants = [
  { merchantType: 'atm', merchantCode: 'CADN1234' },
  { merchantType: 'atm', merchantCode: 'ANDS1382' },
  { merchantType: 'tso', merchantCode: 'TSOX5678' },
];

function readRecords() {
  const fileContent = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  return JSON.parse(fileContent);
}

function writeRecords(records) {
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(records, null, 2))
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/records', (request, response) => {
  const { merchantType, merchantCode, comment } = request.body;

  if (!merchantType || !merchantCode || !comment) {
    return response.status(400).json({
      success: false,
      message: `Усі поля є обов'язковими`
    });
  }

  const normalizedMerchantCode = merchantCode.trim().toUpperCase();

  const merchantExists = merchants.find((merchant) => {
    return (
      merchant.merchantType === merchantType &&
      merchant.merchantCode === normalizedMerchantCode
    );
  });

  if (!merchantExists) {
    return response.status(404).json({
      success: false,
      message: 'Мерчант не знайдено'
    });
  }

  const records = readRecords();
  
  const newRecord = {
    id: Date.now(),
    merchantType,
    merchantCode: normalizedMerchantCode,
    comment: comment.trim(),
    createdAt: new Date().toISOString()
  };

  records.push(newRecord);
  writeRecords(records);

  return response.status(201).json({
    success: true,
    message: 'Запис успішно збережено',
    data: newRecord
  });
});

app.get('/api/records', (request, response) => {
  const { merchantType, merchantCode } = request.query;

  if (!merchantType || !merchantCode) {
    return response.status(400).json({
      success: false,
      message: `Тип та Номер є обов'зяковими`
    });
  };

  const normalizedMerchantCode = merchantCode.trim().toUpperCase();
  const records = readRecords();

  const filteredRecords = records.filter((record) => {
    return (
      record.merchantType === merchantType &&
      record.merchantCode === normalizedMerchantCode
    );
  });

  return response.status(200).json({
    success: true,
    message: filteredRecords.length ? 'Записи знайдено' : 'Записи не знайдено',
    data: filteredRecords
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});