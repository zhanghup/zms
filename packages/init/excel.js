function FormatData(columns, data) {
  let list = {};
  let level = {};

  function fmt(cols, idx) {
    if (!level[idx]) {
      level[idx] = 1;
    }
    let collength = 0;
    if (!cols || cols.length == 0) return [level[idx], collength];

    let h = {};
    for (let i = 0; i < cols.length; i++) {
      let col = cols[i];

      if (col.children && col.children.length > 0) {
        let [crowlength, ccollength] = fmt(col.children, idx + 1);
        if (level[idx] < crowlength + 1) {
          level[idx] = crowlength + 1;
        }
        collength += ccollength;
        h[i] = { index: i, col: ccollength, row: crowlength + 1, style: col.style, title: col.title };
      } else {
        collength += 1;
        h[i] = { index: i, col: 1, row: 1, style: col.style, title: col.title };
      }
    }

    return [level[idx], collength];
  }

  function fmt2(cols, idx) {
    let rowlength = level[idx];
    for (let i = 0; i < cols.length; i++) {
      let hh = h[i];

      if (h[i].row == 1) {
        hh.row = rowlength;
      } else {
        hh.row = 1;
      }
      console.log(hh, rowlength);

      if (!list[idx]) {
        list[idx] = "";
      }
      list[idx] += FormatCell(hh.title, hh.row, hh.col, hh.style);
    }
  }

  fmt(columns, 0);
  fmt2(columns, 0);

  let result = "";
  for (let i = 0; true; i++) {
    if (!list[i]) break;
    result += `<tr>${list[i]}</tr>`;
  }
  return result;
}

function FormatCell(value, rowspan, colspan, style) {
  return `<td${rowspan ? ` rowspan='${rowspan}'` : ""}${colspan ? ` colspan='${colspan}'` : ""}${style ? ` style='${style}'` : ""}>${value}</td>`;
}

const ExportExcel = function(columns, data, { filename = "数据.xlsx", sheetname = "数据", showstyle = false }) {
  let body = FormatData(columns, data);

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
