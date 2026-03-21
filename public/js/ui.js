function renderMerchantTypes(merchantTypes, merchantTypeSelect) {
  if(!merchantTypeSelect) {
    return;
  }

  merchantTypeSelect.innerHTML = '<option value="" selected disabled hidden>Оберіть тип пристрою</option>';

  merchantTypes.forEach((type) => {
    const optionElement = document.createElement('option');
    optionElement.value = type.value;
    optionElement.textContent = type.label;

    merchantTypeSelect.append(optionElement);
  });
}

function showNotification(notification, message, type) {
  if (!notification) {
    return;
  }

  notification.textContent = message;
  notification.classList.remove('notification--hidden');
  notification.classList.remove('notification--success');
  notification.classList.remove('notification--error');

  if (type === "success") {
    notification.classList.add('notification--success');
  }
  
  if (type === "error") {
    notification.classList.add('notification--error');
  }
};

function hideNotification(notification) {
  if (!notification) {
    return;
  }

  notification.textContent = '';
  notification.classList.add('notification--hidden');
  notification.classList.remove('notification--success');
  notification.classList.remove('notification--error');
};

function clearFieldsErrors(merchantTypeSelect, merchantCodeInput, commentTextarea) {
  merchantTypeSelect.classList.remove('form__select--error');
  merchantCodeInput.classList.remove('form__input--error');
  commentTextarea.classList.remove('form__textarea--error');
}

function renderRecordsResult(recordsResult, records) {
  if (!recordsResult) {
    return;
  }

  if (!records.length) {
    recordsResult.innerHTML = `<div class="records-result__empty">За вказаним мерчантом записи не знайдено<div>`;
    return;
  }

  const rows = records.map((record) => {
    return `
      <tr class="records-table__row">
        <td class="records-table__cell">${record.id}</td>
        <td class="records-table__cell">${record.merchantType}</td>
        <td class="records-table__cell">${record.merchantCode}</td>
        <td class="records-table__cell">${record.comment}</td>
        <td class="records-table__cell">${record.createdAt}</td>
      </tr>
    `;
  }).join('');

  recordsResult.innerHTML = `
    <table class="records-table">
      <thread>
        <th class="records-table__head-cell">ID</th>
        <th class="records-table__head-cell">Тип</th>
        <th class="records-table__head-cell">Номер</th>
        <th class="records-table__head-cell">Коментар</th>
        <th class="records-table__head-cell">Дата створення</th>
      </thread>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}