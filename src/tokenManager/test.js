const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
const { fetchWithToken } = require('./tokenManager');

function test () {
    const token = 'hello';
    localStorage.setItem('token', token);
    const req = {
      path: "/api/chat",
      header: "TEST_1"
    }
    let a = fetchWithToken(req);
    console.log(a);
};

test();
