import { FormattedCommit } from '@/types/commits';
import { Input } from './ui/input';
import { TableCell, TableRow } from './ui/table';

const WorkDoneRow = ({ commit }: { commit: FormattedCommit }) => {
  return (
    <TableRow>
      {Object.entries(commit).map(([key, value]) => (
        <TableCell key={key}>
          <Input
            defaultValue={
              key === 'totalTime' && typeof value === 'number'
                ? value.toFixed(1)
                : value
            }
          />
        </TableCell>
      ))}
    </TableRow>
  );
};

export { WorkDoneRow };
