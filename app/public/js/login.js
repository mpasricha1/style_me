$(document).ready(() =>{
	let loginForm = $("#loginForm"); 
	let email = $("#username"); 
	let password = $("#password"); 

	loginForm.on("submit", (event) =>{
		event.preventDefault(); 
		console.log("submitted"); 

		let userData = {
			email: email.val().trim(),
			password: password.val().trim()
		}
		console.log(userData)

		$.post("login", userData).then( () =>{ 
			console.log("Sent Login"); 
			window.location.replace("/authenticated");
		})

	})
		
	
})