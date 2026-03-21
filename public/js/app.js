const merchantTypes = [
  { value: 'atm', label: 'Банкомат' },
  { value: 'tso', label: 'ТСО' }
];

const merchantTypeSelect = document.getElementById('merchantType');
const merchantCodeInput = document.getElementById('merchantCode');
const commentTextarea = document.getElementById('comment');
const saveForm = document.getElementById('saveForm');
const notification = document.getElementById('notification');

const searchMerchantTypeSelect = document.getElementById('searchMerchantType');
const searchMerchantCodeInput = document.getElementById('searchMerchantCode');
const searchForm = document.getElementById('searchForm');
const recordsResult = document.getElementById('recordsResult');

async function handleSaveFormSubmit(event) {
  event.preventDefault();

  const isFormValid = validateSaveForm(
    merchantTypeSelect,
    merchantCodeInput,
    commentTextarea,
    notification
  );

  if (!isFormValid) {
    return;
  }

  const payload = {
    merchantType: merchantTypeSelect.value,
    merchantCode: merchantCodeInput.value.trim(),
    comment: commentTextarea.value.trim()
  };

  try {
    const response = await fetch('/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      showNotification(notification, result.message, 'error');
      return;
    }

    showNotification(notification, result.message, 'success');
    
    saveForm.reset();
    renderMerchantTypes(merchantTypes, merchantTypeSelect);
    
    console.log('Server response:', result);
  } catch (error) {
    showNotification(
      notification,
      'Сталася помилка під час відправлення даних',
      'error'
    );
  }
}

async function handleSearchFormSubmit(event) {
  event.preventDefault();

  const merchantType = searchMerchantTypeSelect.value;
  const merchantCode = searchMerchantCodeInput.value.trim();

  if (!merchantType || !merchantCode) {
    showNotification(
      notification,
      'Для пошуку потрібно вибрати тип пристрою та ввести номер',
      'error'
    );
    return;
  }

  try {
    const response = await fetch(
      `/api/records?merchantType=${merchantType}&merchantCode=${merchantCode}`
    );

    const result = await response.json();

    if (!response.ok) {
      showNotification(notification, result.message, 'error')
      return;
    }

    showNotification(notification, result.message, 'success');
    renderRecordsResult(recordsResult, result.data);
  } catch (error) {
    showNotification(
      notification,
      'Сталася помилка під час отримання даних',
      'error'
    );
  }
};

renderMerchantTypes(merchantTypes, merchantTypeSelect);
renderMerchantTypes(merchantTypes, searchMerchantTypeSelect);

if (saveForm) {
  saveForm.addEventListener('submit', handleSaveFormSubmit);
}

if (searchForm) {
  searchForm.addEventListener('submit', handleSearchFormSubmit);
}