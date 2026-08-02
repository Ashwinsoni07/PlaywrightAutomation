const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');



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
async function writeExcel(searchText, changeText, change, filePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    if (output.row === -1 || output.column === -1) {
        console.error(`Error: Could not find "${searchText}" in the Excel sheet.`);
        return; // Exits safely instead of crashing
    }

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
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

// writeExcel("Banana", 350, "C:/Users/mishr/Downloads/download");//calling the defined function 

test('Upload download excel vaidation', async ({ page }) => {

    const searchText = "Mango";
    const changeText = 320;

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 30000 }),
        page.getByRole('button', { name: 'Download' }).click()
    ]);

    // const downloadPromise = page.waitForEvent('download', { timeout: 30000 });//waiting for the download to complete
    // await page.getByRole('button', { name: 'Download' }).click();
    await writeExcel(searchText, changeText, { rowChange: 0, colChange: 2 }, "C:/Users/mishr/Downloads/download.xlsx");//calling the defined function 

    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:/Users/mishr/Downloads/download.xlsx");//this only work if the upload button has
    // type attribute as file 
    const textLocator = await page.getByText(searchText);
    const desiredRow = await page.getByRole('row').filter({ has: textLocator });
    console.log();
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(`${changeText}`);
    console.log("The Value was updated successfully!");



})
