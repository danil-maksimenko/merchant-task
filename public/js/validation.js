function validateSaveForm(
  merchantTypeSelect,
  merchantCodeInput,
  commentTextarea,
  notification
) {
  clearFieldsErrors(merchantTypeSelect, merchantCodeInput, commentTextarea);
  hideNotification(notification);

  const merchantTypeValue = merchantTypeSelect.value.trim();
  const merchantCodeValue = merchantCodeInput.value.trim();
  const commentValue = commentTextarea.value.trim();

  let hasError = false;

  if (!merchantTypeValue) {
    merchantTypeSelect.classList.add('form__select--error');
    hasError = true;
  }

  if (!merchantCodeValue) {
    merchantCodeInput.classList.add('form__input--error');
    hasError = true;
  }

  if (!commentValue) {
    commentTextarea.classList.add('form__textarea--error');
    hasError = true;
  }

  if (hasError) {
    showNotification(notification, 'Будь ласка, заповніть усі поля форми', 'error');
    return false;
  }

  return true;
}
