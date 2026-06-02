import useAxious from "../allHooks/useAxious";
import useData from "../allHooks/useData";
import { useLocation, useNavigate } from "react-router-dom";

const Google = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { googleSignIn } = useData();
  const axiousSecure = useAxious();

  const handleGoogleSubmit = () => {
    googleSignIn()
      .then((result) => {
        console.log("google sing in", result.user);
        const userInfo = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        // set user on database

        axiousSecure.post("/users", userInfo).then((res) => {
          if (res.data.message === "email alreay on database") {
            navigate(location.state?.from || "/", {
              replace: true,
            });
            console.log("email already exits on data base and you throw on home page");
          }
          if (res.data.insertedId) {
            navigate(location.state?.from || "/", {
              replace: true,
            });
            console.log("user created on database from social");
          }
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <button
      onClick={handleGoogleSubmit}
      className="btn bg-white text-black border-[#e5e5e5]"
    >
      <svg
        aria-label="Google logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <path fill="#fff" d="M0 0h512v512H0z" />
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          />
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          />
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          />
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          />
        </g>
      </svg>
      Login with Google
    </button>
  );
};

export default Google;
