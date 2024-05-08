import SearchBar from "./SearchBar";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const data = [
  {
    id: 1,
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.jhonson@example.com",
    mobileNumber: "9875261127",
  },
  {
    id: 2,
    firstName: "Benjamin",
    lastName: "Davis",
    email: "benjamin.davis@example.com",
    mobileNumber: "9875261127",
  },
  {
    id: 3,
    firstName: "Olivia",
    lastName: "Rodriguez",
    email: "olivia.rodriguez@example.com",
    mobileNumber: "9875261127",
  },
  {
    id: 4,
    firstName: "Michael",
    lastName: "White",
    email: "michael.white@example.com",
    mobileNumber: "9875261127",
  },
  {
    id: 5,
    firstName: "Sophia",
    lastName: "Martinez",
    email: "sophia.martinez@example.com",
    mobileNumber: "9875261127",
  },
  {
    id: 6,
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.jhonson@example.com",
    mobileNumber: "9875261127",
  },
  {
    id: 7,
    firstName: "Benjamin",
    lastName: "Davis",
    email: "benjamin.davis@example.com",
    mobileNumber: "9875261127",
  },
  {
    id: 8,
    firstName: "Olivia",
    lastName: "Rodriguez",
    email: "olivia.rodriguez@example.com",
    mobileNumber: "9875261127",
  },
  {
    id: 9,
    firstName: "Michael",
    lastName: "White",
    email: "michael.white@example.com",
    mobileNumber: "9875261127",
  },
  {
    id: 10,
    firstName: "Sophia",
    lastName: "Martinez",
    email: "sophia.martinez@example.com",
    mobileNumber: "9875261127",
  },
];

const ResponseTable = () => {
  const [status, setStatus] = useState("");
  return (
    <div className="flex flex-col">
      <SearchBar />

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
              {data.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#F5F7F8] cursor-pointer"
                  >
                    <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                      {item.firstName}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                      {item.lastName}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-800 whitespace-nowrap font-nunito font-semibold">
                      {item.mobileNumber}
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResponseTable;
