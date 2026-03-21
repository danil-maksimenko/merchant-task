const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const merchants = [
  { merchantType: 'atm', merchantCode: 'CADN1234' },
  { merchantType: 'atm', merchantCode: 'ANDS1382' },
  { merchantType: 'tso', merchantCode: 'TSOX5678' },
];

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

  return response.status(201).json({
    success: true,
    message: 'Мерчант знайдено',
    data: {
      merchantType,
      merchantCode: normalizedMerchantCode,
      comment
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});