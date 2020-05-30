const openModal = (res, apiName) => {
  const modal = M.Modal.getInstance(document.querySelector('.modal'));
  document.querySelector('.error-text').innerText = `${apiName} request failed with error ${res.status}. 
    ${res.status === 403 ? 'Request limit reached.' : ''}`;
  modal.open();
}
export { openModal } 