import { useEffect, useState } from "react";
import PaginationRounded from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import useFetch from "../../hooks/useFetch";
import useStorage from "../../hooks/useStorage";
import { toast } from "react-toastify";
import { jobInfoPropType } from "../../types/JobInfo";
import CircularProgress from "@mui/material/CircularProgress";
import JobApplyCard from "../../components/JobApplyCard";

const AllJobs = () => {
  const { httpGet } = useFetch();
  const { getDataFromStorage } = useStorage();
  const [jobData, setJobData] = useState<jobInfoPropType[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllJobsData = async () => {
    setLoading(true);
    const token = getDataFromStorage("userToken");
    const data = await httpGet("candidate/newJobs", token);
    console.log(data);
    setLoading(false);
    if (data.isError) {
      toast.error(`${data.data}`);
      return;
    } else if (data) {
      setJobData(data.data);
    }
  };

  useEffect(() => {
    getAllJobsData();
  }, []);

  return (
    <div className="md:px-[30px] lg:px-[50px] xl:px-[70px]">
      <div className="flex text-3xl font-bold mb-[15px]">New Jobs</div>

      <SearchBar />

      <div className="mb-[30px]">
        {!loading ? (
          jobData.map((item) => (
            <div key={item.id}>
              <JobApplyCard
                title={item.title}
                location={item.location}
                salary={item.salary}
                company_name={item.company_name}
                description={item.description}
              />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <CircularProgress sx={{ color: "#021E45" }} />
          </div>
        )}
      </div>

      <div>
        <PaginationRounded />
      </div>
    </div>
  );
};

export default AllJobs;
