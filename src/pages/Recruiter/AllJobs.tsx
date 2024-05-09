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
import useDebounce from "../../hooks/useDebounce";

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

  //Search
  const [searchData, setSearchData] = useState<jobInfoPropType[]>([]);
  const [searchText, setSearchText] = useState("");

  useDebounce(
    () => {
      setSearchData(filterData);
    },
    [jobData, searchText],
    500
  );

  const filterData = () => {
    const text = searchText.toLowerCase();
    const filteredJobs: jobInfoPropType[] = [];

    for (const job of jobData) {
      if (
        job.title.toLowerCase().includes(text) ||
        job.location.toLowerCase().includes(text) ||
        job.salary.toLowerCase().includes(text) ||
        job.company_name.toLowerCase().includes(text)
      ) {
        filteredJobs.push(job);
      }
    }
    return filteredJobs;
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;
  const currentData = searchData.slice(startIndex, endIndex);

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
      setSearchData(data.data.jobs);
    }
  };

  useEffect(() => {
    getAllJobsData();
  }, []);

  return (
    <div className="md:px-[30px] lg:px-[50px] xl:px-[70px]">
      <div className="flex text-3xl font-bold mb-[15px]">Posted Jobs</div>

      <SearchBar searchText={searchText} setSearchText={setSearchText} />

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
