import { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import useStorage from "../hooks/useStorage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { httpPost } = useFetch();
  const { setDataToStorage } = useStorage();

  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    role: "",
    company_name: "",
  });

  const handleRegister = async () => {
    const validateEmail = (email: string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateMobileNo = (mobile: string) => {
      return /^\d{10}$/.test(mobile);
    };

    if (
      !userDetails.first_name ||
      userDetails.first_name === "" ||
      !userDetails.last_name ||
      userDetails.last_name === "" ||
      !userDetails.email ||
      userDetails.email === "" ||
      !userDetails.phone_number ||
      userDetails.phone_number === "" ||
      !userDetails.password ||
      userDetails.password === ""
    ) {
      toast.warn("All fields are mandatory.");
      return;
    } else if (!validateEmail(userDetails.email)) {
      toast.warn("Invalid Email");
      return;
    } else if (!validateMobileNo(userDetails.phone_number)) {
      toast.warn("Invalid Mobile Number");
      return;
    }

    setLoading(true);
    const data = await httpPost("user/register", userDetails);
    if (data.isError) {
      setLoading(false);
      toast.error(`${data.data}`);
      return;
    } else if (data) {
      toast.success("Verification link sent on email.");
      setDataToStorage("userToken", data.data.token);
      setDataToStorage("userRole", userDetails.role);
      setLoading(false);
      setUserDetails({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        role: "",
        company_name: "",
      });
    }
  };

  return (
    <div className="flex justify-center px-[30px] items-center w-full h-screen">
      <div className="flex justify-center items-center w-full md:w-[400px] rounded-[10px] shadow-2xl">
        <div className="flex flex-col w-full px-[20px] py-[40px] justify-center items-center">
          <span className="text-2xl text-center w-full md:w-[305px] md:text-[30px] font-nunito font-bold text-[#021E45]">
            Registration
          </span>
          <div className="flex flex-col my-8 w-full">
            <input
              className="w-full text-[14px] md:text-[16px] bg-[#FFFAFA] p-[10px] font-nunito font-bold text-Background-secondary !outline-none rounded-sm border-[1px] border-gray-300"
              placeholder="FirstName"
              type="text"
              value={userDetails.first_name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, first_name: e.target.value })
              }
            />
            <input
              className="w-full text-[14px] md:text-[16px] mt-2 bg-[#FFFAFA] p-[10px] font-nunito font-bold text-Background-secondary !outline-none rounded-sm border-[1px] border-gray-300"
              placeholder="LastName"
              type="text"
              value={userDetails.last_name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, last_name: e.target.value })
              }
            />
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
              placeholder="Mobile No."
              type="text"
              value={userDetails.phone_number}
              onChange={(e) =>
                setUserDetails({ ...userDetails, phone_number: e.target.value })
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
            <div className="mt-2">
              <Box>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ textAlign: "center" }}
                  >
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userDetails.role}
                    label="Age"
                    onChange={(e: SelectChangeEvent) =>
                      setUserDetails({
                        ...userDetails,
                        role: e.target.value as string,
                      })
                    }
                    sx={{
                      "& .MuiSelect-select": {
                        padding: "10px",
                        fontFamily: "Nunito Sans",
                        color: "#021E45",
                        fontWeight: "700",
                      },
                      "& .MuiInputLabel-root": {
                        fontFamily: "Nunito Sans",
                        fontWeight: "700",
                      },
                      "& .MuiInputBase-input": {
                        backgroundColor: "#FFFAFA",
                      },
                    }}
                  >
                    <MenuItem value={"RECRUITER"}>Recruiter</MenuItem>
                    <MenuItem value={"CANDIDATE"}>Candidate</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>

            {userDetails.role === "RECRUITER" ? (
              <input
                className="w-full text-[14px] md:text-[16px] mt-2 bg-[#FFFAFA] p-[10px] font-nunito font-bold text-Background-secondary !outline-none rounded-sm border-[1px] border-gray-300"
                placeholder="Company Name"
                type="text"
                value={userDetails.company_name}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    company_name: e.target.value,
                  })
                }
              />
            ) : null}
          </div>

          <div className="flex items-center justify-center w-full">
            <CustomButton
              title="Register"
              onClick={handleRegister}
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
              Already have an account?
            </span>
            <Link to="/login">
              <span className="ml-2 text-Background-secondary font-nunito font-bold text-[14px] md:text-[16px]">
                Sign in
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
