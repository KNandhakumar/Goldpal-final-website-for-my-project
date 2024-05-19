const userId = localStorage.getItem("userId");

// Set the user ID in the HTML content
const useridContainer = document.getElementById('useridContainer');
const useridContainer1 = document.getElementById('useridContainer1');
useridContainer.textContent = userId;
useridContainer1.textContent = userId;

//--------------------------------------------------------------------------------------------------------------------//

window.addEventListener('load', function() {
	// Extract the user ID from the URL parameters
	 
	const usernameElement = document.getElementById('username');
	const usernameElement1 = document.getElementById('username1');

	if (userId) {
		// Make an API call to fetch the username based on the user ID
		fetch('/api/users/username?userId=' + userId)
			.then(response => response.text())
			.then(data => {
				// Update the username in the specified container
				usernameElement.textContent = `Hello ${data || 'User'}`; // data is the plain text response
				usernameElement1.textContent = data;
			})
			.catch(error => {
				console.error('Error:', error);
				usernameElement.textContent = 'Username Not Found';
			});
	} else {
		usernameElement.textContent = 'User ID Not Found'; // Display a message if user ID is not found in the URL
	}
});

//--------------------------------------------------------------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
	 

	if (userId) {
		// Fetch user details based on the user ID from the URL
		fetch(`/api/users/${userId}`)
			.then(response => response.json())
			.then(user => {
				// Update the input fields with the fetched user details
				document.getElementById('input-username').value = user.username;
				document.getElementById('input-email').value = user.email;
				document.getElementById('input-registrationDtae').value = user.registrationDateTime;
				document.getElementById('input-mobile').value = user.phone;
				document.getElementById('input-accountstatus').value = user.accountStatus;
				document.getElementById('input-transactionamount').value = user.transactionamount;
				document.getElementById('input-transactiondate').value = user.transactiondate;
				document.getElementById('input-transactiontype').value = user.transactiontype;
				document.getElementById('input-reservedgold').value = user.goldgrams;
				document.getElementById('input-wallet').value = user.wallet;
			})
			.catch(error => console.error('Error fetching user details:', error));
	} else {
		console.error('User ID not found in the URL');
	}
});

//--------------------------------------------------------------------------------------------------------------------------------//
  function submitForgotPasswordForm() {
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const form = document.getElementById('forgotPasswordForm');

            // Validate the form fields (add more validation if needed)
            if (!oldPassword || !newPassword || !confirmPassword) {
                alert('All fields are required');
                return;
            }

            if (newPassword !== confirmPassword) {
                alert('New password and confirm password must match');
                return;
            }
            
            if (newPassword == oldPassword){
				 alert('New password and old password not be same');
                return;
			}

            // Create a data object to send in the request
            const data = {
				userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            };

            // Make an AJAX request to the server
            fetch('/api/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    // Handle the result from the server (success or error)
                    alert(result.message); // Display a message to the user
                    form.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                });
        }
         
//--------------------------------------------------------------------------------------------------------------------------------//
             

