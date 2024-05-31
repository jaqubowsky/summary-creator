import { exportCommitsDataToExcel } from "@/services/api";
import { FormattedCommit } from "@/types/commits";
import { Button } from "./ui/button";

const DownloadExcelFileButton = ({ data }: { data: FormattedCommit[] }) => {
  const handleDownloadClick = async () => await exportCommitsDataToExcel(data);

  return (
    <Button
      onClick={handleDownloadClick}
      variant="default"
      className="px-4 py-2 rounded-md"
    >
      Download Excel File
    </Button>
  );
};

export default DownloadExcelFileButton;

export { DownloadExcelFileButton };
