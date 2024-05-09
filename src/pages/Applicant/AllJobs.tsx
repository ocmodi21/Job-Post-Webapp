import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import useFetch from "../../hooks/useFetch";
import useStorage from "../../hooks/useStorage";
import { toast } from "react-toastify";
import { jobInfoPropType } from "../../types/JobInfo";
import CircularProgress from "@mui/material/CircularProgress";
import JobApplyCard from "../../components/JobApplyCard";
import { Pagination, Stack } from "@mui/material";

const ItemsPerPage = 10;

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
      <div className="flex text-3xl font-bold mb-[15px]">New Jobs</div>

      <SearchBar />

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
