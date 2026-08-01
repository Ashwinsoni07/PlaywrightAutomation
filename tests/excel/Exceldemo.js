const ExcelJS = require('exceljs');


const workbook = new ExcelJS.Workbook();
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
async function excelTest() {

    let output = { row: -1, column: -1 };

    await workbook.xlsx.readFile("D:/Development/TestProject/dummyTestFile.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {/**Iterating through each row and cell */
            if (cell.value === "iphone") {

                output.row = rowNumber;
                output.column = colNumber;

            }
            console.log(cell.value);

        })
    });

    const cell = worksheet.getCell(output.row, output.column);
    cell.value = "Samsung";
    await workbook.xlsx.writeFile("D:/Development/TestProject/dummyTestFile.xlsx");

}

excelTest();//calling the defined function 


