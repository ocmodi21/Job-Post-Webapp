import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import useFetch from "../../hooks/useFetch";
import useStorage from "../../hooks/useStorage";
import { toast } from "react-toastify";
import { jobInfoPropType } from "../../types/JobInfo";
import CircularProgress from "@mui/material/CircularProgress";
import JobApplyCard from "../../components/JobApplyCard";
import { Pagination, Stack } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";

const ItemsPerPage = 10;

const AllJobs = () => {
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
    const data = await httpGet("candidate/newJobs", token);
    console.log(data);

    setLoading(false);
    if (data.isError) {
      toast.error(`${data.data}`);
      return;
    } else if (data) {
      setJobData(data.data);
      setSearchData(data.data);
    }
  };

  useEffect(() => {
    getAllJobsData();
  }, []);

  return (
    <div className="md:px-[30px] lg:px-[50px] xl:px-[70px]">
      <div className="flex text-3xl font-bold mb-[15px]">New Jobs</div>

      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      {!loading ? (
        <div className="mb-[30px]">
          {currentData.map((item) => (
            <div key={item.id}>
              <JobApplyCard
                title={item.title}
                location={item.location}
                salary={item.salary}
                company_name={item.company_name}
                description={item.description}
              />
            </div>
          ))}

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
