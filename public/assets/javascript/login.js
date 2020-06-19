

function loading(){
    initialLoading = !initialLoading;
    return initialLoading;
}

async function registerHandler(){
    const url = '/auth/register';
    const method = 'POST';
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let body = {email, password};
    let headers = {};

    if (body){
        body = await JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(url, {method, body, headers});
    if (response.ok){
      window.location.href = '/'
    }else {
      await response.json().then(data => showValidationError('User already exist'))
    }
}

async function loginHandler(){
    const url = '/auth/login';
    const method = 'POST';
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let body = {email, password};
    let headers = {};

    if (body) {
        body = await JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(url, {method, body, headers, credentials:'include', redirect:'follow'});
    if (response.ok) {
      window.location.href = '/'
    } else {
      await response.json().then(data => showValidationError(`Invalid ${data.error_type}`))
    }
}

function showValidationError(error) {
  document.getElementById('wrong-auth').style.display = 'block'
  document.getElementById('wrong-auth').innerHTML =  error;
}