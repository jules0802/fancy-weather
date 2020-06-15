const openModal = (res, apiName) => {
  // eslint-disable-next-line no-undef
  const modal = M.Modal.getInstance(document.querySelector('.modal'));
  document.querySelector('.error-text').innerText = `${apiName} request failed with error ${res.status}. 
    ${res.status === 403 ? 'Request limit reached.' : ''}`;
  modal.open();
};


const getApiRes = async (url) => {
  let res;
  let data;
  try {
    res = await fetch(url);
    data = await res.json();
  } catch (err) {
    res = err;
  }
  return data;
};

export { openModal, getApiRes };
