import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircularProgress, Pagination, Stack } from "@mui/material";
import useStorage from "../../hooks/useStorage";
import useFetch from "../../hooks/useFetch";
import SearchBar from "../../components/SearchBar";
import useDebounce from "../../hooks/useDebounce";

const ItemsPerPage = 10;

const AppliedJobsTable = () => {
  const { getDataFromStorage } = useStorage();
  const { httpGet } = useFetch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getAllResponses();
  }, []);

  //Search
  const [searchData, setSearchData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  useDebounce(
    () => {
      setSearchData(filterData);
    },
    [data, searchText],
    500
  );

  const filterData = () => {
    const text = searchText.toLowerCase();
    const filteredJobs: any[] = [];

    for (const job of data) {
      if (
        job.job.title.toLowerCase().includes(text) ||
        job.job.location.toLowerCase().includes(text) ||
        job.job.salary.toLowerCase().includes(text) ||
        job.job.company_name.toLowerCase().includes(text) ||
        job.job.status.toLowerCase().includes(text)
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

  const getAllResponses = async () => {
    setLoading(true);
    const token = getDataFromStorage("userToken");
    const applicationData = await httpGet(`candidate/appliedJobs`, token);

    setLoading(false);
    if (applicationData.isError) {
      toast.error(`${applicationData.data}`);
      return;
    } else if (applicationData) {
      setData(applicationData);
    }
  };

  return (
    <div className="flex flex-col">
      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      {!loading ? (
        <div className=" w-full inline-block align-middle">
          <div className="overflow-x-auto overflow-y-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-bold text-left text-gray-500 uppercase font-nunito"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-bold text-left text-gray-500 uppercase font-nunito"
                  >
                    Company Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-bold text-left text-gray-500 uppercase font-nunito"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-bold text-left text-gray-500 uppercase font-nunito"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-bold text-left text-gray-500 uppercase font-nunito"
                  >
                    Salary
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-md font-bold text-left text-gray-500 uppercase font-nunito"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 overflow-y-auto">
                {currentData ? (
                  currentData.map((item, index) => {
                    return (
                      <tr
                        key={item.job.id}
                        className="hover:bg-[#F5F7F8] cursor-pointer"
                      >
                        <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                          {item.job.company_name}
                        </td>
                        <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                          {item.job.title}
                        </td>
                        <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                          {item.job.location}
                        </td>
                        <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                          {item.job.salary}
                        </td>
                        <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                          {item.status === "ACCEPTED" ? (
                            <span className="flex text-[#1E4620] font-nunito font-bold bg-[#EDF7ED] justify-center items-center w-[120px] h-[35px] rounded-md">
                              Accepted
                            </span>
                          ) : null}

                          {item.status === "REJECTED" ? (
                            <span className="flex text-[#5F2120] font-nunito font-bold bg-[#FDEDED] justify-center items-center w-[120px] h-[35px] rounded-md">
                              Rejected
                            </span>
                          ) : null}

                          {item.status === "PENDING" ? (
                            <span className="flex text-[#7C3E3B] font-nunito font-bold bg-[#FEF6EA] justify-center items-center w-[120px] h-[35px] rounded-md">
                              Pending
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div>No Data Found</div>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-[30px]">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(data.length / ItemsPerPage)}
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

export default AppliedJobsTable;
