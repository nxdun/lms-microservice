import axios from 'axios';
import Swal from 'sweetalert2';

export const Logsin = async (email, password) => {
    try {

        const response = await axios.post(`${import.meta.env.VITE_AUTH_SERVER}/login`, {
            email: email,
            password: password
        });
        //console log the response
        console.log("login res:",JSON.stringify(response));
  
  
      if (response.status === 200) {
        
        const data = response.data;
        localStorage.setItem('auth', data.token);
        return true; // Return true if login is successful
      } else {
        // Handle authentication errors
        return false; // Return false if login fails
      }
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire({
        title: "Oops!",
        text: "Username or password is incorrect",
        icon: "error",
        confirmButtonText: "Try again",
      });

      return false; // Return false if an error occurs during login
    }
  };