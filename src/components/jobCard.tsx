const JobCard = () => {
  return (
    <div className="flex justify-between items-center w-full px-[15px] py-[10px] border-[1px] hover:border-black rounded-[5px] mb-4 cursor-pointer">
      <div className="flex flex-col">
        <div>Title</div>
        <div>Company Name</div>
      </div>

      <div className="hidden md:flex">Location</div>

      <div className="px-[20px] py-[7px] text-white bg-[#021E45] rounded-[5px]">
        <span>View</span>
      </div>
    </div>
  );
};

export default JobCard;
