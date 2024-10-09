import { DownloadExcelFileButton } from './DownloadExcelFileButton';

const SummaryHeader = () => {
  return (
    <header className="bg-gray-900 dark:bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Commit Tracker</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <DownloadExcelFileButton />
        </div>
      </div>
    </header>
  );
};

export { SummaryHeader };
