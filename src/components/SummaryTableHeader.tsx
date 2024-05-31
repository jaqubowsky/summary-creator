import { TableHead, TableHeader, TableRow } from "./ui/table";

const SummaryTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Person</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Issue</TableHead>
        <TableHead>Client</TableHead>
        <TableHead>Product</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Start</TableHead>
        <TableHead>End</TableHead>
        <TableHead>Hours</TableHead>
        <TableHead>Minutes</TableHead>
        <TableHead>Total Time</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export { SummaryTableHeader };
