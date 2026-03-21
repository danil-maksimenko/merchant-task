const {
  findMerchant,
  createRecord,
  getRecordsByMerchant
} = require('../services/recordService');

function createRecordHandler(request, response) {
  const { merchantType, merchantCode, comment } = request.body;

  if (!merchantType || !merchantCode || !comment) {
    return response.status(400).json({
      success: false,
      message: "Усі поля є обов'язковими"
    });
  }

  const merchantExists = findMerchant(merchantType, merchantCode);

  if (!merchantExists) {
    return response.status(404).json({
      success: false,
      message: 'Мерчант не знайдено'
    });
  }

  const newRecord = createRecord(merchantType, merchantCode, comment);

  return response.status(201).json({
    success: true,
    message: 'Запис успішно збережено',
    data: newRecord
  });
}

function getRecordsHandler(request, response) {
  const { merchantType, merchantCode } = request.query;

  if (!merchantType || !merchantCode) {
    return response.status(400).json({
      success: false,
      message: "Параметри merchantType та merchantCode є обов'язковими"
    });
  }

  const records = getRecordsByMerchant(merchantType, merchantCode);

  return response.status(200).json({
    success: true,
    message: records.length ? 'Записи знайдено' : 'Записи не знайдено',
    data: records
  });
}

module.exports = {
  createRecordHandler,
  getRecordsHandler
};