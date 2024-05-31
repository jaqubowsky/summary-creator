import { FormattedCommit } from "@/types/commits";
import { Input } from "./ui/input";
import { TableCell, TableRow } from "./ui/table";

const WorkDoneRow = ({ commit }: { commit: FormattedCommit }) => {
  return (
    <TableRow>
      <TableCell>
        <Input defaultValue={commit.person} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.description} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.issue} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.client} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.product} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.category} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.date} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.start} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.end} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.hours} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.minutes} />
      </TableCell>
      <TableCell>
        <Input defaultValue={commit.totalTime.toFixed(1)} />
      </TableCell>
    </TableRow>
  );
};

export { WorkDoneRow };
