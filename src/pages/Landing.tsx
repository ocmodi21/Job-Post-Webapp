import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Landing = () => {
  const token = useSelector((state: any) => state.user.token);
  return (
    <>
      {token === null ? (
        <div className="flex flex-col w-full px-[20px] py-[30px] md:px-[70px] h-screen">
          <div className="flex justify-center w-full h-screen flex-col">
            <span className="flex justify-center items-center text-blue-700 text-3xl md:text-4xl font-nunito font-bold">
              Welcome to Job Portal
            </span>

            <div className="flex flex-row justify-center items-center gap-5 mt-[20px]">
              <Link to="/login">
                <button className="px-[20px] py-[10px] border-[1px] border-black hover:bg-[#F5F7F8] rounded-lg font-nunito text-lg font-bold">
                  Sign In
                </button>
              </Link>

              <Link to="/register">
                <button className="px-[20px] py-[10px] border-[1px] border-black hover:bg-[#F5F7F8] rounded-lg font-nunito text-lg font-bold">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Landing;
