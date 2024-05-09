type SearchBarProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ searchText, setSearchText }: SearchBarProps) => {
  return (
    <div className="flex pt-3 pb-5">
      <div className="relative w-full flex lg:justify-between">
        <input
          className="w-full md:w-[60%] lg:w-[50%] xl:w-[40%] text-[14px] md:text-[16px] px-[10px] py-[8px] font-nunito font-semibold text-Background-secondary !outline-none rounded-[5px] border-[1px] border-gray-300"
          placeholder="Search"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
