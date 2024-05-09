import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import useStorage from "../hooks/useStorage";

type JobApplyCardProp = {
  id: number;
  company_name: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  applyLoading: boolean;
  setApplyLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getAllJobsData: () => Promise<void>;
};

const JobApplyCard = ({
  id,
  title,
  company_name,
  description,
  salary,
  location,
  applyLoading,
  setApplyLoading,
  getAllJobsData,
}: JobApplyCardProp) => {
  const { getDataFromStorage } = useStorage();
  const token = getDataFromStorage("userToken");

  const handleApply = async (jobId: number) => {
    setApplyLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/candidate/applyJob/${jobId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();

      if (response.status !== 200) {
        toast.error(res.message);
      }
      setApplyLoading(false);
      toast.success("Applied Successfully");
      getAllJobsData();
    } catch (error) {
      setApplyLoading(false);
      toast.error("Something went wrong!!");
    }
  };
  return (
    <div className="flex w-full flex-col p-[15px] border-[1px] hover:border-black rounded-[5px] mb-4 cursor-pointer">
      <div className="flex justify-between">
        <div>
          <span className="flex text-2xl font-nunito font-bold">
            {company_name}
          </span>
        </div>
        <div
          className="hidden md:flex px-[20px] py-[7px] text-white font-nunito h-[40px] bg-[#021E45] rounded-[5px]"
          onClick={() => handleApply(id)}
        >
          {applyLoading ? (
            <CircularProgress size={"small"} sx={{ color: "white" }} />
          ) : (
            <span>Apply Now</span>
          )}
        </div>
      </div>

      <div>
        <div className="flex text-[16px] font-medium mt-[10px]">
          Role: {title}
        </div>
        <div className="flex text-[16px] font-medium font-nunito">
          Location: {location}
        </div>
        <div className="flex text-[16px] font-medium font-nunito">
          Salary: {salary}
        </div>

        <div className="flex flex-col mt-[15px]">
          <span className="flex text-[16px] font-medium font-nunito">
            Description:
          </span>
          <span className="flex text-[16px] font-medium font-nunito">
            {description}
          </span>
        </div>
      </div>

      <div
        className="flex md:hidden px-[20px] py-[7px] text-white h-[40px] bg-[#021E45] font-nunito rounded-[5px] mt-[15px] justify-center items-center"
        onClick={() => handleApply(id)}
      >
        {applyLoading ? (
          <CircularProgress sx={{ color: "#021E45" }} />
        ) : (
          <span>Apply Now</span>
        )}
      </div>
    </div>
  );
};

export default JobApplyCard;
