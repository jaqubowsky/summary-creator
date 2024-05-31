import { FormattedCommit } from "@/types/commits";
import { Button } from "./ui/button";

const ExportToCSVButton = ({ data }: { data: FormattedCommit[] }) => {
  return (
    <Button variant="default" className="px-4 py-2 rounded-md">
      Export to CSV
    </Button>
  );
};

export { ExportToCSVButton };
