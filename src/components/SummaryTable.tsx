'use client';

import { mutationKeys } from '@/lib/mutation-keys';
import { FormattedCommit } from '@/types/commits';
import { useIsMutating, useMutationState } from '@tanstack/react-query';
import { SummaryTableHeader } from './SummaryTableHeader';
import { WorkDoneRow } from './WorkDoneRow';
import { Table, TableBody, TableCell, TableRow } from './ui/table';

const SummaryTable = () => {
  const commits = useMutationState({
    filters: { mutationKey: [mutationKeys.generateSummary] },
    select: (mutation) => mutation.state.data,
  })[0] as FormattedCommit[];

  const isMutating = useIsMutating({
    mutationKey: [mutationKeys.generateSummary],
  });

  return (
    <Table>
      <SummaryTableHeader />
      <TableBody>
        {isMutating ? (
          <TableRow>
            {Array.from({ length: 12 }).map((_, index) => (
              <TableCell key={index}>
                <div className="animate-pulse bg-gray-400 h-8 w-24 rounded-md"></div>
              </TableCell>
            ))}
          </TableRow>
        ) : (
          commits?.map((commit, index) => (
            <WorkDoneRow key={index} commit={commit} />
          ))
        )}
      </TableBody>
    </Table>
  );
};

export { SummaryTable };
