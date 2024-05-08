import PaginationRounded from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import JobCard from "../../components/jobCard";

const AllJobs = () => {
  return (
    <div className="md:px-[30px] lg:px-[50px] xl:px-[70px]">
      <div className="flex text-3xl font-bold mb-[15px]">Posted Jobs</div>

      <SearchBar />

      <div className="mb-[30px]">
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>

      <div>
        <PaginationRounded />
      </div>
    </div>
  );
};

export default AllJobs;
