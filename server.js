const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

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

  return response.status(201).json({
    success: true,
    message: 'Дані успішно отримані сервером',
    data: {
      merchantType,
      merchantCode,
      comment
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});