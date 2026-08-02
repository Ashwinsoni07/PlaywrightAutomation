const ExcelJS = require('exceljs');



/**This below method is a asynchronous hence JS dosn't wait for the file details to be fetched
 * and continues the execution without the file. To handle such cases it is handled using a then keyword with a 
 * function defining thelatertasks.
 */
// workbook.xlsx.readFile("D:/Development/TestProject/dummyTestFile.xlsx").then(function(){
//     const worksheet = workbook.getWorksheet('Sheet1');
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {/**Iterating through each row and cell */
//             console.log(cell.value);

//         })
//     })

// });
async function writeExcel(searchText, changeText, filePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

     if (output.row === -1 || output.column === -1) {
        console.error(`Error: Could not find "${searchText}" in the Excel sheet.`);
        return; // Exits safely instead of crashing
    }

    const cell = worksheet.getCell(output.row, output.column);
    cell.value = changeText;
    await workbook.xlsx.writeFile(filePath);

    console.log("the cell value ahs been updated");

}

async function readExcel(worksheet, searchText) {

    let output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {/**Iterating through each row and cell */
            if (cell.value === searchText) {

                output.row = rowNumber;
                output.column = colNumber;

            }
            // console.log(cell.value);

        })
    });
    return output;

};

writeExcel("Banana", "Samsung", "D:/Development/TestProject/dummyTestFile.xlsx");//calling the defined function 


