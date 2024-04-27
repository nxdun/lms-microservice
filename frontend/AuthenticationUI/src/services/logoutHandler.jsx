import swal from "sweetalert2";

export const LogoutHandler = () => {
  try {
      console.log("logout initated");
      //no need to wait for the response, just log out
      localStorage.removeItem("auth");
      localStorage.removeItem("username");
      //return logout alert in return statement
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
