import PaginationRounded from "../../components/Pagination";
import ResponseTable from "../../components/Table";

const Responses = () => {
  return (
    <div className="md:px-[30px] lg:px-[50px] xl:px-[70px]">
      <div className="flex text-3xl font-bold mb-[15px]">Job Responses</div>
      <ResponseTable />

      <div className="mt-[30px]">
        <PaginationRounded />
      </div>
    </div>
  );
};

export default Responses;
