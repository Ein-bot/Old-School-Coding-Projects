//setups a HTTP POST Request to send to app's CREATE endpoint and displays result
async function testCreate(){
	const config = new Object();
	config.method = "POST";
	config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
	config.body = JSON.stringify({'email': createEmail.value, 'password': createPassword.value});
	const response = await fetch("http://localhost:3000/register", config);
	const data = await response.json()
	document.body.innerHTML += `<p style="color: white; font-size: large; text-align: center;">${JSON.stringify(data)}</p>`
}
async function testLogin(){
	const config = new Object();
	config.method = "POST";
	config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
	config.body = JSON.stringify({'email': loginId.value, 'password': loginPassword.value});
	const response = await fetch("http://localhost:3000/login", config);
	const data = await response.json()
	sessionStorage.token = data.token;
	document.body.innerHTML += `<p style="color: white; font-size: large; text-align: center;">${JSON.stringify(data)}</p>`
}