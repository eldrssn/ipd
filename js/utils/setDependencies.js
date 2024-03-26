export function setDependencies(input, box, dependenciesList) {
  if (!dependenciesList) return;

  dependenciesList.forEach((dependentSlug) => {
    const dependentInput = box.querySelector(`input[id='${dependentSlug}']`);

    if (dependentInput) {
      input.hasAttribute('checked')
        ? dependentInput.setAttribute('disabled', 'true')
        : dependentInput.removeAttribute('disabled');
    }

    if (
      input.getAttribute('id') === 'transparent-ppf' &&
      box.querySelector("[id='wrapping']").getAttribute('checked')
    ) {
      dependentInput.setAttribute('disabled', 'true');
    }

    if (
      input.getAttribute('id') === 'wrapping' &&
      box.querySelector("[id='transparent-ppf']").getAttribute('checked')
    ) {
      dependentInput.setAttribute('disabled', 'true');
    }
  });
}
