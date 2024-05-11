import swal from "sweetalert2";

//function to handle user logout
export const LogoutHandler = () => {
  localStorage.clear();
  try {
      return swal.fire({
        title: "User Logged Out",
        icon: "success",
        confirmButtonText: "Okay"
      
    }).then((result) => {
      if (result.isConfirmed) {
        //navigate to login page
        window.location.href = "/login";
      }
    });
    
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
