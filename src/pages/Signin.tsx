import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import useStorage from "../hooks/useStorage";
import CustomButton from "../components/CustomButton";

const Signin = () => {
  const navigate = useNavigate();
  const { httpPost } = useFetch();
  const { setDataToStorage } = useStorage();

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const validateEmail = (email: string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (
      !userDetails.email ||
      userDetails.email === "" ||
      !userDetails.password ||
      userDetails.password === ""
    ) {
      toast.warn("All fields are mandatory.");
      return;
    } else if (!validateEmail(userDetails.email)) {
      toast.warn("Invalid Email");
      return;
    }

    setLoading(true);
    const data = await httpPost("user/login", userDetails);
    if (data.isError) {
      setLoading(false);
      toast.error(`${data.data}`);
      return;
    } else if (data) {
      toast.success("Login suceesfully!!");
      setDataToStorage("userToken", data.data.token);
      setDataToStorage("userRole", data.data.user.role);
      setLoading(false);

      if (data.data.user.role === "CANDIDATE") {
        navigate("/applicantDashboard");
      } else {
        navigate("/recruiterDashboard");
      }
    }
  };

  return (
    <div className="flex justify-center px-[30px] items-center w-full h-screen">
      <div className="flex justify-center items-center w-full md:w-[400px] rounded-[10px] shadow-2xl">
        <div className="flex flex-col w-full px-[20px] py-[40px] justify-center items-center">
          <span className="text-2xl text-center w-full md:w-[305px] md:text-[30px] font-nunito font-bold text-[#021E45]">
            Welcome Back!
          </span>
          <div className="flex flex-col my-8 w-full">
            <input
              className="w-full text-[14px] md:text-[16px] mt-2 bg-[#FFFAFA] p-[10px] font-nunito font-bold text-Background-secondary !outline-none rounded-sm border-[1px] border-gray-300"
              placeholder="Email"
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <input
              className="w-full text-[14px] md:text-[16px] mt-2 bg-[#FFFAFA] p-[10px] font-nunito font-bold text-Background-secondary !outline-none rounded-sm border-[1px] border-gray-300"
              placeholder="Password"
              type="password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-center w-full">
            <CustomButton
              title="Login"
              onClick={handleLogin}
              loading={loading}
            />
          </div>

          <div className="flex flex-row my-2 justify-center items-center w-full">
            <div className="flex w-[90px] md:w-[140px] border-t-[1px] border-solid border-Background-secondary"></div>
            <div>
              <span className="mx-[5px] font-nunito font-semibold">or</span>
            </div>
            <div className="flex w-[90px] md:w-[140px] border-t-[1px] border-solid border-Background-secondary"></div>
          </div>

          <div className="w-full flex justify-center items-center">
            <span className="font-nunito font-medium text-[12px] md:text-[14px]">
              Don't have an account?
            </span>
            <Link to="/register">
              <span className="ml-2 text-Background-secondary font-nunito font-bold text-[14px] md:text-[16px]">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
