import { FormattedCommit } from "@/types/commits";
import { Button } from "./ui/button";

const ExportToCSVButton = ({ data }: { data: FormattedCommit[] }) => {
  const exportToCSV = () => {
    console.log("exported ", data);
  };

  return (
    <Button variant="secondary" className="px-4 py-2 rounded-md">
      Export to CSV
    </Button>
  );
};

export { ExportToCSVButton };
