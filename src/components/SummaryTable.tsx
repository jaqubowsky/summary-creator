import { FormattedCommit } from "@/types/commits";
import { SummaryTableHeader } from "./SummaryTableHeader";
import { WorkDoneRow } from "./WorkDoneRow";
import { Table, TableBody } from "./ui/table";

const SummaryTable = ({
  data,
  isLoading,
}: {
  data: FormattedCommit[];
  isLoading: boolean;
}) => {
  return (
    <Table>
      <SummaryTableHeader />
      <TableBody>
        {isLoading ? (
          <tr>
            <td colSpan={5} className="text-center py-4">
              Loading...
            </td>
          </tr>
        ) : (
          data.map((commit, index) => (
            <WorkDoneRow key={index} commit={commit} />
          ))
        )}
      </TableBody>
    </Table>
  );
};

export { SummaryTable };
