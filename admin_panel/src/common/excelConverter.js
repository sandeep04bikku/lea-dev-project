import ExcelJS from 'exceljs';
import Papa from 'papaparse';

const fieldMappings = {
    user: ['Full Name', 'Email', 'Phone Number', 'Country Code', 'Password'],
    trainer: ['Full Name', 'Email','Phone Number','Country Code','Password'],
    question: ['Question', 'Answer', 'Marks Per Question', 'Option1', 'Option2', 'Option3', 'Option4']
};

export const readFile = (file, fileType, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rawData = [];

            if (fileType === 'csv') {
                // Parse CSV file using PapaParse
                Papa.parse(file, {
                    header: true,
                    complete: (result) => {
                        rawData = result.data;
                        const formattedData = transformData(rawData, type);
                        resolve(formattedData);
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            } else {
                // Load Excel file using ExcelJS
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(file);
                const worksheet = workbook.getWorksheet(1);

                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) return; // Skip header row
                    const rowData = {};
                    row.eachCell((cell, colNumber) => {
                        const header = worksheet.getRow(1).getCell(colNumber).value;
                        rowData[header] = cell.value;
                    });
                    rawData.push(rowData);
                });

                const formattedData = transformData(rawData, type);
                resolve(formattedData);
            }
        } catch (error) {
            reject(error);
        }
    });
};

const transformData = (rawData, type) => {
    // Retrieve the field mapping for the given type or use an empty array if not found
    const mapping = fieldMappings[type] || [];

    return rawData
        .map(item => {
            const transformedItem = {};

            // Process the predefined fields from the mapping
            mapping.forEach(field => {
                // Normalize the field name by converting to lowercase and replacing spaces with underscores
                const normalizedField = field.toLowerCase().replace(/\s+/g, '_');
                transformedItem[normalizedField] = item[field] || item[field.toLowerCase()] || '';
            });

            // Handle any additional fields that are not covered by the predefined mapping
            Object.keys(item).forEach(key => {
                const normalizedKey = key.toLowerCase().replace(/\s+/g, '_');
                // Only add the field if it hasn't been added already
                if (!(normalizedKey in transformedItem)) {
                    transformedItem[normalizedKey] = item[key] || '';
                }
            });

            // Return the transformed item
            return transformedItem;
        })
        .filter(item => {
            // Filter out items with any empty required fields
            return mapping.every(field => {
                const normalizedField = field.toLowerCase().replace(/\s+/g, '_');
                return item[normalizedField] !== '';
            });
        });
};






// const transformData = (rawData) => {
//     return rawData.map(item => ({
//         full_name: item.Name || '',
//         email: item['Email'] || '',
//         phone_number: item['Phone Number'] || '',
//         country_code: item['Country Code'] || ''
//     }));
// };














// //without header only xlsx file
// import ExcelJS from 'exceljs';

// export const readExcelFile = (file) => {
//     return new Promise(async (resolve, reject) => {
//         const workbook = new ExcelJS.Workbook();
//         try {
//             await workbook.xlsx.load(file);

//             // Assuming the first sheet is the one we want to read
//             const worksheet = workbook.worksheets[0];
//             const rawData = [];

//             worksheet.eachRow((row, rowNumber) => {

//                 console.log(rowNumber,"row");
//                 // Skip the header row
//                 if (rowNumber === 1) return;

//                 const rowData = {};
//                 row.eachCell((cell, colNumber) => {
//                     const header = worksheet.getRow(1).getCell(colNumber).value; // Assumes headers are in the first row
//                     rowData[header] = cell.value;
//                 });
//                 rawData.push(rowData);
//             });

//             // Transform the raw data into the desired format
//             const formattedData = transformData(rawData);
//             resolve(formattedData);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

// const transformData = (rawData) => {
//     return rawData.map(item => ({
//         full_name: item.Name || '',
//         email: item['Email'].text || '',
//         phone_number: item['Phone Number'] || '',
//         country_code: item['Country Code'] || ''
//     }));
// };





////csv file
// import { parse } from 'csv-parse';

// export const readCSVFile = (file) => {
//     return new Promise((resolve, reject) => {
//         const rawData = [];
//         const parser = parse(file, { columns: true }); // `columns: true` automatically uses the first row as headers

//         parser.on('readable', () => {
//             let record;
//             while ((record = parser.read()) !== null) {
//                 rawData.push(record);
//             }
//         });

//         parser.on('error', (error) => {
//             reject(error);
//         });

//         parser.on('end', () => {
//             // Transform the raw data into the desired format
//             const formattedData = transformData(rawData);
//             resolve(formattedData);
//         });
//     });
// };

// const transformData = (rawData) => {
//     return rawData.map(item => ({
//         full_name: item.Name || '',
//         email: item['Email'] || '',
//         phone_number: item['Phone Number'] || '',
//         country_code: item['Country Code'] || ''
//     }));
// };










// import * as XLSX from 'xlsx';

// export const readExcelFile = (file) => {
//     console.log(file);
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();

//         reader.onload = (e) => {
//             const binaryStr = e.target.result;
//             try {
//                 const workbook = XLSX.read(binaryStr, { type: 'binary' });

//                 // Assuming the first sheet is the one we want to read
//                 const firstSheetName = workbook.SheetNames[0];
//                 const worksheet = workbook.Sheets[firstSheetName];

//                 console.log(worksheet,"worksheet");

//                 // Convert sheet to JSON
//                 const rawData = XLSX.utils.sheet_to_json(worksheet);

//                 console.log(rawData,"rawdata");

//                 // Transform the raw data into the desired format
//                 if (typeof transformData === 'function') {
//                     const formattedData = transformData(rawData);
//                     resolve(formattedData);
//                 } else {
//                     reject(new Error('transformData is not defined or not a function'));
//                 }
//             } catch (error) {
//                 reject(error);
//             }
//         };

//         reader.onerror = (error) => {
//             reject(error);
//         };

//         reader.readAsBinaryString(file);
//     });
// };

// const transformData = (rawData) => {
//     return rawData.map(item => ({
//         name: item.Name || '',
//         email: item.Email || '',
//     }));
// };







// //with header
// import ExcelJS from 'exceljs';

// export const readExcelFile = (file) => {
//     return new Promise(async (resolve, reject) => {
//         const workbook = new ExcelJS.Workbook();
//         try {
//             await workbook.xlsx.load(file);

//             // Assuming the first sheet is the one we want to read
//             const worksheet = workbook.worksheets[0];
//             const rawData = [];

//             // Iterate over each row
//             worksheet.eachRow((row, rowNumber) => {
//                 if (rowNumber === 1) {
//                     return; // Skip the header row
//                 }

//                 const rowData = {};
//                 // Iterate over each cell in the row
//                 row.eachCell((cell, colNumber) => {
//                     // Assuming headers are in the first row
//                     const header = worksheet.getRow(1).getCell(colNumber).value;
//                     const value = cell.value;
//                     console.log(`Cell [${row.number}, ${colNumber}]: Header=${header}, Value=${value}`);
//                     rowData[header] = value;
//                 });

//                 // Push rowData into rawData array
//                 rawData.push(rowData);
//             });

//             // Transform the raw data into the desired format
//             const formattedData = transformData(rawData);
//             resolve(formattedData);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

// const transformData = (rawData) => {
//     return rawData.map(item => ({
//         name: item.Name || '',
//         email: item.Email || '',
//         phoneNumber: item['Phone Number'] || '',
//         countryCode: item['Country Code'] || ''
//     }));
// };




