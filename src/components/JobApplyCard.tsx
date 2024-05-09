type JobApplyCardProp = {
  company_name: string;
  title: string;
  description: string;
  salary: string;
  location: string;
};

const JobApplyCard = ({
  title,
  company_name,
  description,
  salary,
  location,
}: JobApplyCardProp) => {
  return (
    <div className="flex w-full flex-col p-[15px] border-[1px] hover:border-black rounded-[5px] mb-4 cursor-pointer">
      <div className="flex justify-between">
        <div>
          <span className="flex text-2xl font-nunito font-bold">
            {company_name}
          </span>
        </div>
        <div className="hidden md:flex px-[20px] py-[7px] text-white font-nunito h-[40px] bg-[#021E45] rounded-[5px]">
          <span>Apply Now</span>
        </div>
      </div>

      <div>
        <div className="flex text-[16px] font-medium mt-[10px]">
          Role: {title}
        </div>
        <div className="flex text-[16px] font-medium font-nunito">
          Location: {location}
        </div>
        <div className="flex text-[16px] font-medium font-nunito">
          Salary: {salary}
        </div>

        <div className="flex flex-col mt-[15px]">
          <span className="flex text-[16px] font-medium font-nunito">
            Description:
          </span>
          <span className="flex text-[16px] font-medium font-nunito">
            {description}
          </span>
        </div>
      </div>

      <div className="flex md:hidden px-[20px] py-[7px] text-white h-[40px] bg-[#021E45] font-nunito rounded-[5px] mt-[15px] justify-center items-center">
        <span>Apply Now</span>
      </div>
    </div>
  );
};

export default JobApplyCard;
