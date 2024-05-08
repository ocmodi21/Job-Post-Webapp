import { useEffect, useState } from "react";
import PaginationRounded from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import JobCard from "../../components/jobCard";
import useFetch from "../../hooks/useFetch";
import useStorage from "../../hooks/useStorage";
import { toast } from "react-toastify";
import { jobInfoPropType } from "../../types/JobInfo";
import CircularProgress from "@mui/material/CircularProgress";

type AllJobsProp = {
  setRecruiterTabStatus: React.Dispatch<React.SetStateAction<string>>;
  setJobId: React.Dispatch<React.SetStateAction<number>>;
};

const AllJobs = ({ setRecruiterTabStatus, setJobId }: AllJobsProp) => {
  const { httpGet } = useFetch();
  const { getDataFromStorage } = useStorage();
  const [jobData, setJobData] = useState<jobInfoPropType[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllJobsData = async () => {
    setLoading(true);
    const token = getDataFromStorage("userToken");
    const data = await httpGet("recruiter/jobs", token);
    console.log(data);

    setLoading(false);
    if (data.isError) {
      toast.error(`${data.data}`);
      return;
    } else if (data) {
      setJobData(data.data.jobs);
    }
  };

  useEffect(() => {
    getAllJobsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress sx={{ color: "#021E45" }} />
      </div>
    );
  }

  return (
    <div className="md:px-[30px] lg:px-[50px] xl:px-[70px]">
      <div className="flex text-3xl font-bold mb-[15px]">Posted Jobs</div>

      <SearchBar />

      <div className="mb-[30px]">
        {jobData.map((item, index) => (
          <div key={index}>
            <JobCard
              id={item.id}
              title={item.title}
              location={item.location}
              company_name={item.company_name}
              setRecruiterTabStatus={setRecruiterTabStatus}
              setJobId={setJobId}
            />
          </div>
        ))}
      </div>

      <div>
        <PaginationRounded />
      </div>
    </div>
  );
};

export default AllJobs;
