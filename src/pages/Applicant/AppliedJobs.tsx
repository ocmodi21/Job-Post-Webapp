import AppliedJobsTable from "./AppliedJobsTable";

const AppliedJobs = () => {
  return (
    <div className="md:px-[30px] lg:px-[50px] xl:px-[70px]">
      <div className="flex flex-row items-center text-3xl font-bold mb-[15px] gap-4">
        <span>Applied Jobs</span>
      </div>

      <AppliedJobsTable />
    </div>
  );
};

export default AppliedJobs;
