import { useState } from "react";
import CustomButton from "../../components/CustomButton";

const JobApplications = () => {
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
  });

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
        <CustomButton title="Create Job" />
      </div>
    </div>
  );
};

export default JobApplications;
