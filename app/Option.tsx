const fs = require('fs');
const xlsx = require('xlsx');
const { DataFrame } = require('pandas-js');

const filePath = '/path/to/your/one-drive/file.xlsx';

const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

const df = new DataFrame(data);

const searchValue = 'your_value'; // Replace 'your_value' with the value you want to search for
const idColumnIndex = df.columns.indexOf('id');
const rowIndex = df.findIndex((row:any) => row.get(idColumnIndex) === searchValue);

if (rowIndex !== -1) {
    // Row found, add new information
    const newInfo = 'your_new_info'; // Replace 'your_new_info' with the new information you want to add
    df.set(rowIndex, 'newInfoColumn', newInfo); // Replace 'newInfoColumn' with the name of the column where you want to add the new information
} else {
    // Row not found
    console.log('Value not found in the id column.');
}
