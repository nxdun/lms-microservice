import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";

//async function for user login
export const Logsin = async (email, password) => {
    try {
      //send post request to auth server
      const response = await axios.post(`${import.meta.env.VITE_AUTH_SERVER}/login`, {
          email: email,
          password: password
      });

      //logging the response
  
      //if login is successful (status code 200)
      if (response.status === 200) {
        //extracting data from the response
        const decodedToken = jwtDecode(response.data.data.token.toString());
        
  
        // Store _id from decoded token in local storage or use it as needed
        const userId = decodedToken._id;

        localStorage.setItem("token", userId);
  
        console.log("User ID:", userId);
        return true; // Return true if login is successful
      } else {
        // Handle authentication errors
        return false; // Return false if login fails
      
      }
    } catch (error) {
      //catch and handle login errors
      console.error('Login failed:', error);

      //display error alert using sweetAlert2
      Swal.fire({
        title: "Oops!",
        text: "Username or password is incorrect",
        icon: "error",
        confirmButtonText: "Try again",
      });

      return false; // Return false if an error occurs during login
    }
  };