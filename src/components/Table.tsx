import SearchBar from "./SearchBar";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { UserInfoPropType } from "../types/UserInfo";
import useStorage from "../hooks/useStorage";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import { CircularProgress, Pagination, Stack } from "@mui/material";

type TableDataProp = {
  id: number;
};

const ItemsPerPage = 10;

const ResponseTable = ({ id }: TableDataProp) => {
  const { getDataFromStorage } = useStorage();
  const { httpGet } = useFetch();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [data, setData] = useState<UserInfoPropType[]>([]);

  const getAllResponses = async () => {
    setLoading(true);
    const token = getDataFromStorage("userToken");
    const applicationData = await httpGet(
      `recruiter/job/${id}/applications`,
      token
    );
    console.log(applicationData);

    setLoading(false);
    if (applicationData.isError) {
      toast.error(`${applicationData.data}`);
      return;
    } else if (data) {
      setData(applicationData.data.applications);
    }
  };

  useEffect(() => {
    getAllResponses();
  }, [id]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col">
      <SearchBar />

      {!loading ? (
        <div>
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
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-md font-bold text-left text-gray-500 uppercase font-nunito"
                    >
                      Second Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-md font-bold text-left text-gray-500 uppercase font-nunito"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-md font-bold text-left text-gray-500 uppercase font-nunito"
                    >
                      Contact Number
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
                    currentData.map((item) => {
                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-[#F5F7F8] cursor-pointer"
                        >
                          <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                            {item.first_name}
                          </td>
                          <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                            {item.last_name}
                          </td>
                          <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                            {item.email}
                          </td>
                          <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                            {item.phone_number}
                          </td>
                          <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                            <div className="flex fle-row gap-4">
                              <div onClick={() => setStatus("Accepted")}>
                                {status === "" ? (
                                  <div className="flex justify-center items-center border-[1px] rounded-[50%] border-[green] p-[5px]">
                                    <CheckIcon sx={{ color: "green" }} />
                                  </div>
                                ) : null}
                                {status === "Accepted" ? (
                                  <span className="flex text-[#1E4620] font-nunito font-bold bg-[#EDF7ED] justify-center items-center w-[120px] h-[35px] rounded-md">
                                    Accepted
                                  </span>
                                ) : null}
                              </div>

                              <div onClick={() => setStatus("Rejected")}>
                                {status === "" ? (
                                  <div className="flex justify-center items-center border-[1px] rounded-[50%] border-[red] p-[5px]">
                                    <CloseIcon sx={{ color: "red" }} />
                                  </div>
                                ) : null}
                                {status === "Rejected" ? (
                                  <span className="flex text-[#5F2120] font-nunito font-bold bg-[#FDEDED] justify-center items-center w-[120px] h-[35px] rounded-md">
                                    Rejected
                                  </span>
                                ) : null}
                              </div>
                            </div>
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

export default ResponseTable;
