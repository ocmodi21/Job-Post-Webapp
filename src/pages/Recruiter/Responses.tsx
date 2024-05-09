import ResponseTable from "../../components/Table";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

type ResponseProp = {
  id: number;
  setRecruiterTabStatus: React.Dispatch<React.SetStateAction<string>>;
};

const Responses = ({ id, setRecruiterTabStatus }: ResponseProp) => {
  return (
    <div className="md:px-[30px] lg:px-[50px] xl:px-[70px]">
      <div className="flex flex-row items-center text-3xl font-bold mb-[15px] gap-4">
        <div onClick={() => setRecruiterTabStatus("AllJob")}>
          <KeyboardBackspaceIcon
            fontSize="large"
            sx={{ fontWeight: "bold", cursor: "pointer", color: "#021E45" }}
          />
        </div>
        <span>Job Responses</span>
      </div>

      <ResponseTable id={id} />
    </div>
  );
};

export default Responses;
