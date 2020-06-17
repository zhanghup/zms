import { GetValue, GetFormat } from "./value";

function FormatData(columns, data, showstyle) {
  let list = {};
  let level = {};
  let h = {};
  let datacolumns = [];

  function fmt(cols, idx, pidx) {
    if (!level[idx]) {
      level[idx] = 1;
    }
    let collength = 0;
    if (!cols || cols.length == 0) return [level[idx], collength];

    for (let i = 0; i < cols.length; i++) {
      let col = cols[i];

      if (col.children && col.children.length > 0) {
        let [crowlength, ccollength] = fmt(col.children, idx + 1, i);
        if (level[idx] < crowlength + 1) {
          level[idx] = crowlength + 1;
        }
        collength += ccollength;
        h[`${idx}-${pidx}-${i}`] = { col: ccollength, row: crowlength + 1, style: col.style, title: col.title };
      } else {
        collength += 1;
        h[`${idx}-${pidx}-${i}`] = { col: 1, row: 1, style: col.style, title: col.title };
      }
    }

    return [level[idx], collength];
  }

  function fmt2(cols, idx, pidx) {
    let rowlength = level[idx];
    for (let i = 0; i < cols.length; i++) {
      let hh = h[`${idx}-${pidx}-${i}`];
      let col = cols[i];

      if (hh.row == 1) {
        hh.row = rowlength;
      } else {
        hh.row = 1;
      }

      if (col.children && col.children.length > 0) {
        fmt2(col.children, idx + 1, i);
      } else {
        datacolumns.push(col);
      }

      if (!list[idx]) {
        list[idx] = "";
      }
      list[idx] += FormatCell(hh.title, hh.row, hh.col, showstyle ? hh.style : "");
    }
  }

  fmt(columns, 0);
  fmt2(columns, 0);

  let result = "";
  for (let i = 0; true; i++) {
    if (!list[i]) break;
    result += `<tr>${list[i]}</tr>`;
  }

  for (let d of data) {
    result += "<tr>";
    for (let col of datacolumns) {
      let v = GetValue(col.key, d, col.format);
      result += FormatCell(v, null, null, null);
    }
    result += "</tr>";
  }
  return result;
}

function FormatCell(value, rowspan, colspan, style) {
  return `<td${rowspan ? ` rowspan='${rowspan}'` : ""}${colspan ? ` colspan='${colspan}'` : ""}${style ? ` style='${style}'` : ""}>${value}</td>`;
}

const ExportExcel = function(columns, data, { filename = "数据.xlsx", sheetname = "数据", showstyle = false }) {
  let body = FormatData(columns, data, showstyle);

  //下载的表格模板数据
  let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${sheetname}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${body}</table></body></html>`;

  let uri = "data:application/vnd.ms-excel;base64," + btoa(unescape(encodeURIComponent(template)));

  var binStr = atob(uri.split(",")[1]),
    len = binStr.length,
    arr = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }

  var a = document.createElement("a");
  a.download = filename;
  a.innerHTML = "download";
  a.href = URL.createObjectURL(new Blob([arr]));
  a.click();
};

export default ExportExcel;
