import swal from "sweetalert2";

export const LogoutHandler = () => {
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
