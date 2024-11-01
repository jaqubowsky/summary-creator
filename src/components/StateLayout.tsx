import { useStateStore } from "../stores/state.store";
import { Spinner } from "./Spinner";

const StateLayout = () => {
  const { state } = useStateStore();

  return (
    <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center h-screen bg-black bg-opacity-50 text-white z-[9999]">
      <Spinner className="w-12 h-12 fill-rose-600" />
      <p className="text-lg">
        {state === "fetching" && "Fetching your commits from the repos..."}
        {state === "generating" && "Generating the description for the commits..."}
        {state === "formatting" && "Formatting the commits..."}
      </p>
    </div>
  );
};

export default StateLayout;
