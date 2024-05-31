import { FormattedCommit } from "@/types/commits";
import { SummaryTableHeader } from "./SummaryTableHeader";
import { WorkDoneRow } from "./WorkDoneRow";
import { Table, TableBody } from "./ui/table";

const SummaryTable = ({ data }: { data: FormattedCommit[] }) => {
  return (
    <Table>
      <SummaryTableHeader />
      <TableBody>
        {data.map((commit, index) => (
          <WorkDoneRow key={index} commit={commit} />
        ))}
      </TableBody>
    </Table>
  );
};

export { SummaryTable };
