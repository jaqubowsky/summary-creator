import { SummaryAside } from './SummaryAside';
import { SummaryHeader } from './SummaryHeader';
import { SummaryTable } from './SummaryTable';

export default function MainPage() {
  return (
    <div className="flex h-screen w-full flex-col dark:bg-gray-950 dark:text-gray-50">
      <SummaryHeader />
      <div className="flex h-full">
        <SummaryAside />
        <div className="bg-zinc-900 flex flex-col gap-4 w-full flex-1 overflow-auto p-6">
          <SummaryTable />
        </div>
      </div>
    </div>
  );
}
