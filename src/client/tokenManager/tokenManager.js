const serverPath = "http://localhost:5000/api/";

export async function fetchWithToken(req) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = currentUser && currentUser.token ? currentUser.token : {};

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

