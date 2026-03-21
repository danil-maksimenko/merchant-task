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