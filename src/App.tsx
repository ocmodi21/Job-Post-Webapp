import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Landing from "./pages/Landing";
import RecruiterDashboard from "./pages/Recruiter/RecruiterDashboard";
import ToastAlert from "./components/ToastAlert";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useStorage from "./hooks/useStorage";
import { setToken } from "./redux/Slice/UserSlice";
import ApplicantDashboard from "./pages/Applicant/ApplicantDashboard";

const App = () => {
  const { getDataFromStorage } = useStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getDataFromStorage("userToken");
    const role = getDataFromStorage("userRole");
    if (token && role) {
      dispatch(setToken(token));
      if (role === "RECRUITER") {
        navigate("/recruiterDashboard");
      } else {
        navigate("/applicantDashboard");
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <ToastAlert />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/recruiterDashboard" element={<RecruiterDashboard />} />
        <Route path="/applicantDashboard" element={<ApplicantDashboard />} />
      </Routes>
    </>
  );
};

export default App;
