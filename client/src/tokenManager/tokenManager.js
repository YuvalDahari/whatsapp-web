export async function fetchWithToken(req) {
  debugger;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = currentUser && currentUser.token ? currentUser.token : {};
  const  serverPath = process.env.REACT_APP_SERVER_PATH + '/api/';
  if (JSON.stringify(token) !== '{}') {
    const updatedReqWithToken = {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${token}`
      }
    };
    
    const response = await fetch(serverPath + req.path, updatedReqWithToken);
    const clonedResponse = response.clone();
    return clonedResponse;
  }

  const response = await fetch(serverPath + req.path, req);
  const clonedResponse = response.clone();
  return clonedResponse;
}

