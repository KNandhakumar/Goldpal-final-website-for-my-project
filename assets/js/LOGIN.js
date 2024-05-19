/*function showLoader() {
	var loader = document.getElementById('loader');
	loader.style.display = 'block';

	  
}
function showLoader1() {
	var loader = document.getElementById('loader1');
	loader.style.display = 'block';

	  
}*/

document.getElementById('loginForm').addEventListener('submit', function(event) {
	event.preventDefault();

	const loader = document.getElementById('loader');
	const form = document.getElementById('loginForm');

	loader.style.display = 'block'; // Show the loader

	const userId = document.getElementById('userId').value;
	const password = document.getElementById('password').value;

	/*// Log the values to the console
	console.log('UserId:', userId);
	console.log('Password:', password);
*/
	// Create a JavaScript object with the user data
	const data = {
		userId: userId,
		password: password
	};

	fetch('http://localhost:8080/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data) // Send user data as JSON
	})
		.then(response => response.json())
		.then(data => {
			const toast = document.getElementById('toast');
			if (data.success) {
				/*alert('Login successful');*/
				toast.innerText = 'SignIn success';
				toast.style.backgroundColor = '#4CAF50';

				// Save the user ID and role in local storage
				localStorage.setItem('userId', userId);
				localStorage.setItem('userRole', data.role);

				// Redirect based on user role
				if (data.role === 'admin') {
					window.location.href = '/admindash.html';
				} else {
					window.location.href = '/Dashboard.html';
				}
			} else {
				/*alert('Login failed');*/
				toast.innerText = 'SignIn failed';
				toast.style.backgroundColor = '#f44336';
			}
			toast.style.display = 'block';
			setTimeout(() => {
				toast.style.display = 'none';
			}, 3000); // Hide the toast after 3 seconds (adjust as needed)
		})
		.catch(error => {
			/*console.error('Error:', error);
			alert('Login failed');*/
			console.error('Error:', error);
			const toast = document.getElementById('toast');
			toast.innerText = 'SignIn failed';
			toast.style.backgroundColor = '#f44336'; // Red color for failure
			toast.style.display = 'block';
			setTimeout(() => {
				toast.style.display = 'none';
			}, 3000);
		})
		.finally(() => {
			loader.style.display = 'none'; // Hide the loader after submission
		});
});





document.getElementById('SignUpForm').addEventListener('submit', function(event) {
	event.preventDefault();

	const loader = document.getElementById('loader');
	const form = document.getElementById('SignUpForm');
	const toast = document.getElementById('toast1');

	loader.style.display = 'block'; // Show the loader

	const username = document.getElementsByName('username')[0].value;
	const phone = document.getElementsByName('phone')[0].value;
	const email = document.getElementsByName('email')[0].value;
	const password = document.getElementById('password1').value;

	const userData = {
		username: username,
		phone: phone,
		email: email,
		password: password
	};
	
	console.log(userData);

	fetch('http://localhost:8080/api/users/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userData)
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('SignUp failed');
			}
			return response.json();
		})
		.then(data => {
			const toast = document.getElementById('toast1');
			if (data.success) {
				toast.innerText = 'SignUp successful';
				toast.style.backgroundColor = '#4CAF50'; // Green color for success
				toast.style.display = 'block';
				setTimeout(() => {
				toast.style.display = 'none';
			}, 3000); // Hide the toast after 5 seconds (adjust as needed)
				form.reset();
			} else {
				toast.innerText = data.error || 'SignUp failed';
				toast.style.backgroundColor = '#f44336'; // Red color for failure
				toast.style.display = 'block';
				setTimeout(() => {
				toast.style.display = 'none';
			}, 3000); // Hide the toast after 5 seconds (adjust as needed)
			}
		})
		.catch(error => {
			console.error('Error:', error);
			toast.innerText = 'SignUp failed';
			toast.style.backgroundColor = '#f44336'; // Red color for failure
			toast.style.display = 'block';
		})
		.finally(() => {
			loader.style.display = 'none'; // Hide the loader after submission
			setTimeout(() => {
				toast.style.display = 'none';
			}, 3000); // Hide the toast after 5 seconds (adjust as needed)
		});
});




