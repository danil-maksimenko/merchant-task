const merchants = require('../data/merchants');
const { readRecords, writeRecords } = require('../utils/recordFile');

function findMerchant(merchantType, merchantCode) {
  const normalizedMerchantCode = merchantCode.trim().toUpperCase();

  return merchants.find((merchant) => {
    return (
      merchant.merchantType === merchantType &&
      merchant.merchantCode === normalizedMerchantCode
    );
  });
}

function createRecord(merchantType, merchantCode, comment) {
  const normalizedMerchantCode = merchantCode.trim().toUpperCase();
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

  return newRecord;
}

function getRecordsByMerchant(merchantType, merchantCode) {
  const normalizedMerchantCode = merchantCode.trim().toUpperCase();
  const records = readRecords();

  return records.filter((record) => {
    return (
      record.merchantType === merchantType &&
      record.merchantCode === normalizedMerchantCode
    );
  });
}

module.exports = {
  findMerchant,
  createRecord,
  getRecordsByMerchant
};