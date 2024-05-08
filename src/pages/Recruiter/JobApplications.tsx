import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import useStorage from "../../hooks/useStorage";

const JobApplications = () => {
  const [loading, setLoading] = useState(false);
  const { httpPost } = useFetch();
  const { getDataFromStorage } = useStorage();
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleApplication = async () => {
    console.log(jobData);
    if (
      !jobData.title ||
      jobData.title === "" ||
      !jobData.location ||
      jobData.location === "" ||
      !jobData.salary ||
      jobData.salary === "" ||
      !jobData.description ||
      jobData.description === ""
    ) {
      toast.warn("All fields are mandatory.");
      return;
    }

    setLoading(true);
    const token = getDataFromStorage("userToken");
    console.log(token);
    const data = await httpPost("recruiter/job", jobData, token);
    if (data.isError) {
      setLoading(false);
      toast.error(`${data.data}`);
      return;
    } else if (data) {
      toast.success("Job created suceesfully!!");
      setLoading(false);
      setJobData({
        title: "",
        location: "",
        salary: "",
        description: "",
      });
    }
  };

  return (
    <div className="md:px-[30px] lg:px-[50px] xl:px-[70px]">
      <div className="flex text-3xl font-bold mb-[30px]">Job Application</div>

      <div className="w-full md:w-[80%]">
        <div className="mb-[15px]">
          <span className="text-[20px] font-medium">Job Title</span>
          <input
            className="w-full text-[16px] md:text-[16px] mt-1 lg:mt-[5px] bg-white px-[10px] py-[8px] font-medium text-Background-secondary !outline-none rounded-sm border-[1px] border-gray-300"
            placeholder="Enter Job Title"
            type="text"
            value={jobData.title}
            onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
          />
        </div>

        <div className="mb-[15px]">
          <span className="text-[20px] font-medium">Locaton</span>
          <input
            className="w-full text-[16px] md:text-[16px] mt-1 lg:mt-[5px] bg-white px-[10px] py-[8px] font-medium text-Background-secondary !outline-none rounded-sm border-[1px] border-gray-300"
            placeholder="Enter Job Location"
            type="text"
            value={jobData.location}
            onChange={(e) =>
              setJobData({ ...jobData, location: e.target.value })
            }
          />
        </div>

        <div className="mb-[15px]">
          <span className="text-[20px] font-medium">Expected Salary</span>
          <input
            className="w-full text-[16px] md:text-[16px] mt-1 lg:mt-[5px] bg-white px-[10px] py-[8px] font-medium text-Background-secondary !outline-none rounded-sm border-[1px] border-gray-300"
            placeholder="Enter Job Salary"
            type="text"
            value={jobData.salary}
            onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
          />
        </div>

        <div className="mb-[15px]">
          <span className="text-[20px] font-medium">Job Description</span>
          <textarea
            className="w-full text-[16px] md:text-[16px] mt-1 lg:mt-[5px] bg-white px-[10px] py-[8px] font-medium text-Background-secondary !outline-none rounded-sm border-[1px] border-gray-300"
            placeholder="Enter Job Description"
            rows={5}
            value={jobData.description}
            onChange={(e) =>
              setJobData({ ...jobData, description: e.target.value })
            }
          />
        </div>
      </div>

      <div className="w-full mt-[20px] md:w-[40%] lg:w-[30%] xl:w-[20%]">
        <CustomButton
          title="Create Job"
          onClick={handleApplication}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default JobApplications;
