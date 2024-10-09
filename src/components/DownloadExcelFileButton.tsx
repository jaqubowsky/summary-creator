'use client';

import { mutationKeys } from '@/lib/mutation-keys';
import { exportCommitsDataToExcel } from '@/services/api';
import { FormattedCommit } from '@/types/commits';
import { useMutationState } from '@tanstack/react-query';
import { Button } from './ui/button';

const DownloadExcelFileButton = () => {
  const commits = useMutationState({
    filters: { mutationKey: [mutationKeys.generateSummary] },
    select: (mutation) => mutation.state.data,
  })[0] as FormattedCommit[];

  return (
    <Button
      disabled={!commits?.length}
      onClick={() => exportCommitsDataToExcel(commits)}
      variant="default"
      className="px-4 py-2 rounded-md disabled:cursor-not-allowed"
    >
      Download Excel File
    </Button>
  );
};

export default DownloadExcelFileButton;

export { DownloadExcelFileButton };
