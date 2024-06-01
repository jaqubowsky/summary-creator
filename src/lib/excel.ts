import { FormattedCommit } from "@/types/commits";
import * as ExcelJS from "exceljs";

const createNewWorkbook = (worksheetName: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(worksheetName);

  return { workbook, worksheet };
};

const capitalizeHeaders = (headers: (keyof FormattedCommit)[]) => {
  return headers.map(
    (header) => header.charAt(0).toUpperCase() + header.slice(1)
  );
};

const setFontAndFill = (row: ExcelJS.Row) => {
  row.font = { bold: true, color: { argb: "FFFFFF" } };

  row.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "4F81BD" },
  };
};

const setColumnWidths = (
  worksheet: ExcelJS.Worksheet,
  columnWidths: number[]
) => {
  worksheet.columns.forEach((column, index) => {
    column.width = columnWidths[index];
  });
};

const formatHoursAndMinutes = (worksheet: ExcelJS.Worksheet) => {
  worksheet.getColumn(10).numFmt = "0";
  worksheet.getColumn(11).numFmt = "0";
};

const addDataToWorksheet = (
  data: FormattedCommit[],
  worksheet: ExcelJS.Worksheet
) => {
  data.forEach((commit, index) => {
    const row = Object.values(commit);
    const dataRow = worksheet.addRow(row);

    if (
      row.some((cell) => cell !== undefined && cell !== null && cell !== "")
    ) {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: index % 2 === 0 ? "D9EAD3" : "FFFFFF" },
      };
    }

    const totalTimeCell = dataRow.getCell(12);
    totalTimeCell.value = {
      formula: `ROUND((J${dataRow.number}*60+K${dataRow.number})/60, 2)`,
    };
  });
};

const downloadWorkbook = async (workbook: ExcelJS.Workbook, name: string) => {
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}.xlsx`;
  document.body.appendChild(link);
  link.click();

  window.URL.revokeObjectURL(url);
};

export {
  addDataToWorksheet,
  capitalizeHeaders,
  createNewWorkbook,
  downloadWorkbook,
  formatHoursAndMinutes,
  setColumnWidths,
  setFontAndFill,
};
