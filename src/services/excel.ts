import * as excel from "@/lib/excel";
import { getJSONDataInOrder } from "@/lib/format/format";
import { FormattedCommit } from "@/types/commits";

export const exportCommitsDataToExcel = async (data: FormattedCommit[] | undefined) => {
  if (!data) return;

  const { workbook, worksheet } = excel.createNewWorkbook("Commits");

  const correctOrder = [
    "person",
    "description",
    "issue",
    "client",
    "product",
    "category",
    "date",
    "start",
    "end",
    "hours",
    "minutes",
    "totalTime",
  ];

  const orderedData = getJSONDataInOrder(data, correctOrder);
  const headers = Object.keys(orderedData[0]) as (keyof FormattedCommit)[];

  const capitalizedHeaders = excel.capitalizeHeaders(headers);
  const headerRow = worksheet.addRow(capitalizedHeaders);
  excel.setFontAndFill(headerRow);

  const columnWidths = [20, 40, 30, 15, 15, 20, 15, 10, 10, 10, 10, 15];
  excel.setColumnWidths(worksheet, columnWidths);

  excel.addDataToWorksheet(orderedData, worksheet);
  excel.formatHoursAndMinutes(worksheet);

  await excel.downloadWorkbook(workbook, "commits");
};
