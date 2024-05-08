type JobCardProp = {
  id: number;
  title: string;
  company_name: string;
  location: string;
  setRecruiterTabStatus: React.Dispatch<React.SetStateAction<string>>;
  setJobId: React.Dispatch<React.SetStateAction<number>>;
};

const JobCard = ({
  id,
  title,
  company_name,
  location,
  setRecruiterTabStatus,
  setJobId,
}: JobCardProp) => {
  return (
    <div className="flex justify-between items-center w-full px-[15px] py-[10px] border-[1px] hover:border-black rounded-[5px] mb-4 cursor-pointer">
      <div className="flex flex-col">
        <div>
          <span className="flex text-lg font-semibold">{company_name}</span>
        </div>
        <div>
          <span className="flex text-[14px] font-medium">Role: {title}</span>
        </div>
      </div>

      <div className="hidden md:flex">Location: {location}</div>

      <div
        className="px-[20px] py-[7px] text-white bg-[#021E45] rounded-[5px]"
        onClick={() => {
          setRecruiterTabStatus("View");
          setJobId(id);
        }}
      >
        <span>View</span>
      </div>
    </div>
  );
};

export default JobCard;
