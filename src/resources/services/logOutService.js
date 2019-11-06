function logOutService(error) {
  const { response } = error;

  switch (response.status) {
    case 401:
      document.location.href = `/accounts/logout?next=${document.location.pathname}`;
      break;
    case 403:
      // notyf.alert('Access forbidden.');
      console.log('Access forbidden.');
      break;
    default:
      break;
  }

  return Promise.reject(error);
}

export default logOutService;
