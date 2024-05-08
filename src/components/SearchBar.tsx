const SearchBar = () => {
  return (
    <div className="flex pt-3 pb-5">
      <div className="relative w-full flex lg:justify-between">
        <div className="flex md:w-[446px] flex-row">
          <input
            className="w-full text-[14px] md:text-[16px] mr-[20px] px-[10px] py-[6px] font-nunito font-semibold text-Background-secondary !outline-none rounded-[5px] border-[1px] border-gray-300"
            placeholder="Search"
            type="text"
          />
          <button
            style={{ textTransform: "none" }}
            className="bg-[#021E45] text-white w-[120px] font-nunito text-[16px] px-[20px] py-[5px] md:mr-[20px] lg:mr-[0px] font-semibold rounded-[5px]"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
