import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import JobCard from "../../components/jobCard";
import useFetch from "../../hooks/useFetch";
import useStorage from "../../hooks/useStorage";
import { toast } from "react-toastify";
import { jobInfoPropType } from "../../types/JobInfo";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

type AllJobsProp = {
  setRecruiterTabStatus: React.Dispatch<React.SetStateAction<string>>;
  setJobId: React.Dispatch<React.SetStateAction<number>>;
};

const ItemsPerPage = 10;

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

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;
  const currentData = jobData.slice(startIndex, endIndex);

  return (
    <div className="md:px-[30px] lg:px-[50px] xl:px-[70px]">
      <div className="flex text-3xl font-bold mb-[15px]">Posted Jobs</div>

      <SearchBar />

      {!loading ? (
        <div>
          <div className="mb-[30px]">
            {currentData.map((item, index) => (
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
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(jobData.length / ItemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                size="large"
                variant="outlined"
                shape="rounded"
                sx={{
                  "& li .Mui-selected": {
                    color: "white",
                    backgroundColor: "#021E45",
                  },
                }}
              />
            </Stack>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <CircularProgress sx={{ color: "#021E45" }} />
        </div>
      )}
    </div>
  );
};

export default AllJobs;
