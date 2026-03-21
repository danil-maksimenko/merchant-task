const merchantTypes = [
  { value: 'atm', label: 'Банкомат' },
  { value: 'tso', label: 'ТСО' }
];

const merchantTypeSelect = document.getElementById('merchantType');

function renderMerchantTypes() {
  if(!merchantTypeSelect) {
    return;
  }

  merchantTypes.forEach((type) => {
    const optionElement = document.createElement('option');
    optionElement.value = type.value;
    optionElement.textContent = type.label;

    merchantTypeSelect.append(optionElement);
  })
}

renderMerchantTypes();