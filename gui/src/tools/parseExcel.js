import XLSX from "xlsx"


//TODO Parse Configs and Variables

function parse(data) {
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    //TODO Parse Work Sheets 
    var wb = {SheetNames:workbook.SheetNames,Sheets:{}}
    workbook.SheetNames.forEach(function(sheetName) {
        //var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var XL_sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName],{header:1});
        /* TODO  Send WB JSON */
        wb.Sheets[sheetName] = XL_sheet
      })
    var json_object = JSON.stringify(wb);
    try {
         window.sendJson(json_object)
    } catch {
       console.log("sendJson function not found")
    }

    return workbook

}



export default parse
