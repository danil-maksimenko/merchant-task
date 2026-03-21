const merchantTypes = [
  { value: 'atm', label: 'Банкомат' },
  { value: 'tso', label: 'ТСО' }
];

const merchantTypeSelect = document.getElementById('merchantType');
const merchantCodeInput = document.getElementById('merchantCode');
const commentTextarea = document.getElementById('comment');
const saveForm = document.getElementById('saveForm');
const notification = document.getElementById('notification');

function handleSaveFormSubmit(event) {
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

  const merchantTypeValue = merchantTypeSelect.value;
  const merchantTypeObject = merchantTypes.find((type) => {
    return type.value === merchantTypeValue;
  });

  const merchantTypeLabel = merchantTypeObject ? merchantTypeObject.label : '';
  const merchantCodeValue = merchantCodeInput.value.trim();

  const merchantFullName = `${merchantTypeLabel} - ${merchantCodeValue}`;

  showNotification(notification, `Форма валідна. Мерчант: ${merchantFullName}`, 'success');

  console.log({
    merchantType: merchantTypeValue,
    merchantCode: merchantCodeValue,
    merchantDisplayName: merchantFullName,
    comment: commentTextarea.value.trim()
  });
}

renderMerchantTypes(merchantTypes, merchantTypeSelect);

if (saveForm) {
  saveForm.addEventListener('submit', handleSaveFormSubmit);
}