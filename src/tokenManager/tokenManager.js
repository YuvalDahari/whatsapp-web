const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');

const serverPath = "http://localhost:5000/";

async function fetchWithToken(req) {
  const token = localStorage.getItem("token");

  if (token) {
    const updatedReqWithToken = {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch(serverPath + req.path, updatedReqWithToken);
    return response.json();
  }

  const response = await fetch(serverPath + req.path, req);
  return response.json();
}

module.exports = {
  fetchWithToken: fetchWithToken
};
