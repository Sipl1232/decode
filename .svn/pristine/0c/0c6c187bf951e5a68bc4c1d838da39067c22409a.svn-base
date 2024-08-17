import ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
import { API_SERVER, CommonApiData } from '../../EnvConfig/env_config';
import { NotificationSound } from './CommonNotification';

export const DownloadFileAtURL = (File) => {
    let FileName = `ImportFormat/${File}`
    const fileName = FileName.split('/').pop()
    const aTag = document.createElement('a');
    aTag.href = FileName
    aTag.setAttribute('download', fileName)
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
}

export const ERRORDATALIST = async (Status, FileName) => {
    try {
        let enableAlternateColor = false, enableHeaderColor = true
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1', {
            views: [{ state: 'frozen', ySplit: 1 }],
        });

        // Prepare the data for the worksheet
        const dataRows = Status.ErrorData.map(record =>
            Object.values(record)
        );

        // Extract headers
        const headers = Object.keys(Status.ErrorData[0]);

        // Add headers and data to the worksheet
        worksheet.addRow(headers);
        worksheet.addRows(dataRows);

        // Set header row style (bold and background color)
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true };
        if (enableHeaderColor) {
            headerRow.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'AAAAAA' },
            };
        }
        if (enableAlternateColor) {
            worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                if (rowNumber > 1 && rowNumber % 2 === 0) {
                    row.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'DDDDDD' },
                    };
                }
            });
        }

        // Set column widths to fit content
        worksheet.columns.forEach((column) => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, (cell) => {
                const length = cell.value ? String(cell.value).length : 0;
                maxLength = Math.max(maxLength, length);
            });
            column.width = maxLength < 12 ? 12 : maxLength; // Set a minimum width to avoid extremely narrow columns
        });
        // Generate and download the Excel file
        const buffer = await workbook.xlsx.writeBuffer();
        const dataBlob = new Blob([buffer], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${FileName}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Error creating Excel:', err);
    }
};

export const BulkClearData = (setName) => {
    //let a = document.querySelectorAll('.bulk-upload');
    //if (a.length > 0) {
    //    a[0].childNodes[2].innerHTML = '<span class="sc-fqkvVR kFhUBM"><span>Upload</span> or drop a file right here</span><span title="types: xlsx" class="file-types">xlsx</span>';
    //}
    setName('')

}

export const convertToJson = (csv) => {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            //if (headers[j] === 'Active') {
            //    obj[headers[j]] = Boolean(parseInt(currentline[j]) === 0 || currentline[j].toLowerCase() === ('No').toLowerCase() ? Boolean(false) : Boolean(currentline[j]));
            //}
            //else {
            //    obj[headers[j]] = currentline[j];
            //}
            obj[headers[j]] = currentline[j].toLowerCase() === 'true'.toLowerCase() ? true : currentline[j].toLowerCase() === 'false'.toLowerCase() ? false : currentline[j];

        }
        result.push(obj);
    }
    return JSON.stringify(result); //JSON
}

export const readFile = async (e) => {
    const file = e;
    let FileName = e.name;
    const data = await file.arrayBuffer(file);
    const excelFile = XLSX.read(data);
    const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];
    const exceljson = XLSX.utils.sheet_to_json(excelSheet, {
        defval: "", // Treat undefined cells as empty strings
        raw: false, // Keep raw data, such as format strings, dates, etc.
        header: 0 // Use the first row as keys
    });
    // Function to convert text to boolean
    const textToBoolean = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText === "true") {
            return true;
        } else if (lowerText === "false") {
            return false;
        }
        // Handle other cases if needed
        return null; // Or throw an error, or return a default value
    };
    // Convert text values to booleans in the exceljson object
    for (let i = 0; i < exceljson.length; i++) {
        const row = exceljson[i];
        for (const key in row) {
            if (row.hasOwnProperty(key)) {
                const value = row[key];
                if (typeof value === "string") {
                    const booleanValue = textToBoolean(value);
                    if (booleanValue !== null) {
                        row[key] = booleanValue;
                    }
                }
            }
        }
    }

    return { exceljson, FileName };
};

export const HandleBulkInsertData = async (url, Records, data, refreshData) => {
    let SuccessCount = 0
    let ErrorData = []
    let ErrorCount = 0
    if (Records.length !== 0) {
        for (let i = 0; i < Records.length; i++) {
            let response = ({ ...data, ...Records[i] })
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(response),
                headers: {
                    "Content-Type": "application/json"
                },
                // eslint-disable-next-line no-loop-func
            }).then(async (resp) => {
                let res = await resp.json();
                if (res.status === "SUCCESS") {
                    SuccessCount = SuccessCount + 1
                } else if (res.status === 'ERROR') {
                    ErrorData.push({ ...Records[i], ERROR: res.message })
                    ErrorCount = ErrorCount + 1
                }
            })
        }
    } else {
        alert('No Record Found !')
    }
    refreshData()
    return { SuccessCount, ErrorCount, ErrorData }
}

export const HandleBulkInsertDataJSON = async (url, Records, common, refreshData) => {
    let SuccessCount = 0
    let ErrorData = []
    let ErrorCount = 0
    if (Records.length !== 0) {
        let response = ({ ...common, data: Records })
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(response),
            headers: {
                "Content-Type": "application/json"
            },
            // eslint-disable-next-line no-loop-func
        }).then(async (resp) => {
            let res = await resp.json();
            if (res.status === "SUCCESS") {
                SuccessCount = SuccessCount + 1
            } else if (res.status === 'ERROR') {
                ErrorData.push({ ERROR: res.message })
                ErrorCount = ErrorCount + 1
            }
        })
    } else {
        alert('No Record Found !')
    }
    refreshData()
    return { SuccessCount, ErrorCount, ErrorData }
}

export const handleDownloadExcel = async (handleApiUrl, requestData, FileName, enableAlternateColor = false, enableHeaderColor = true, enableFilters = false) => {
    const apiUrl = handleApiUrl;
    const requestBody = {
        ...requestData,
        "Token": CommonApiData().Token,
        "LoginUserCode": CommonApiData().LoginUserCode,
        "Source": 'Web',
        "User": CommonApiData().UserName,
        Type: 'E',
        PageIndex: '1'
    };
    const requestHeaders = {
        'Content-Type': 'application/json',
    };
    try {
        const response = await fetch(`${API_SERVER + apiUrl}`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: requestHeaders,
        });
        const res = await response.json();
        if (res.status === "SUCCESS") {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sheet 1', {
                views: [{ state: 'frozen', ySplit: 1 }],
            });

            // Example: Set header row to bold and background color
            const headerRow = worksheet.addRow(res?.HeadersKey?.length > 0
                ? res.HeadersKey.filter((key) => {
                    return res?.HideColumns?.length > 0 ? !res?.HideColumns?.includes(key) : key
                })
                : Array.from(
                    new Set(
                        res?.Data?.flatMap((data) => Object.keys(data))
                            .filter((columnName) => !res?.HideColumns?.includes(columnName))
                    )
                ));
            const headerKey = (res?.HeadersKey?.length > 0 && res?.HeadersValue?.length > 0)
                ? res.HeadersValue.filter((key) => {
                    return res?.HideColumns?.length > 0 ? !res?.HideColumns?.includes(key) : key
                })
                : Array.from(
                    new Set(
                        res.Data?.flatMap((data) => Object.keys(data))
                            .filter((columnName) => !res?.HideColumns?.includes(columnName))
                    )
                );
            headerRow.font = { bold: true };
            if (enableHeaderColor) {
                headerRow.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'AAAAAA' },
                };
            };
            // Example: Enable filters
            if (enableFilters) {
                worksheet.autoFilter = {
                    from: { row: 1, column: 1 },
                    to: { row: 1, column: headerKey.length },
                };
            };

            // Example: Set alternate row background color
            for (let i = 2; i <= res.Data.length + 1; i++) {
                const row = worksheet.getRow(i);

                if (enableAlternateColor && i % 2 === 0) {
                    row.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'DDDDDD' },
                    };
                };

                row.values = res.HeadersValue?.length > 0 ?
                    res.HeadersValue?.map((key) => res.Data[i - 2][key])
                    : headerKey?.map((key) => res.Data[i - 2][key]);
            }



            // Set column widths to fit content
            worksheet.columns.forEach((column) => {
                let maxLength = 0;
                column.eachCell({ includeEmpty: true }, (cell) => {
                    const length = cell.value ? String(cell.value).length : 0;
                    maxLength = Math.max(maxLength, length);
                });
                column.width = maxLength < 12 ? 12 : maxLength; // Set a minimum width to avoid extremely narrow columns
            });

            //  //Auto-fit column width
            //worksheet.columns.forEach((column, index) => {
            //    let maxContentLength = column.header ? column.header.length : 0;

            //    for (let i = 2; i <= res.Data.length + 1; i++) {
            //        const content = res.Data[i - 2][res.HeadersValue[index]];
            //        if (content) {
            //            maxContentLength = Math.max(maxContentLength, content.toString().length);
            //        }
            //    }

            //    column.width = maxContentLength < 12 ? 12 : maxContentLength + 2;
            //});

            const buffer = await workbook.xlsx.writeBuffer();
            const data = new Blob([buffer], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${FileName}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } else if (res.Status === 'ERROR') {
            NotificationSound(res.status, res.message, res.focus);
        }
        else if (res.Status === 'UNAUTHORIZED') {
            NotificationSound(res.status, res.message, res.focus);
        }
    } catch (err) {
        NotificationSound('ERROR', err.message)
    }
};

export const handleDownloadMultipleExcel = async (
    handleApiUrl,
    requestData,
    FileName,
    enableAlternateColor = false,
    enableHeaderColor = true,
    enableFilters = false,
) => {
    const apiUrl = handleApiUrl;
    const requestBody = requestData;
    const requestHeaders = {
        'Content-Type': 'application/json',
    };
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: requestHeaders,
        });
        const res = await response.json();
        if (res[0].Status === 'SUCCESS') {
            const workbook = new ExcelJS.Workbook();
            for (let sheetData of res) {
                const sheetName = Object.keys(sheetData.Data[0])[0]; // Get the sheet name
                const sheetRows = sheetData.Data[0][sheetName]; // Get the rows for the sheet

                const worksheet = workbook.addWorksheet(sheetName, {
                    views: [{ state: 'frozen', ySplit: 1 }],
                });

                const headers = Object.keys(sheetRows[0]);
                const headerRow = worksheet.addRow(headers);
                headerRow.font = { bold: true };

                if (enableHeaderColor) {
                    headerRow.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'AAAAAA' },
                    };
                }

                for (let rowData of sheetRows) {
                    const row = worksheet.addRow(Object.values(rowData));
                    if (enableAlternateColor && worksheet.lastRow.number % 2 === 0) {
                        row.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'DDDDDD' },
                        };
                    }
                }

                if (enableFilters) {
                    worksheet.autoFilter = {
                        from: { row: 1, column: 1 },
                        to: { row: 1, column: headers.length },
                    };
                }

                worksheet.columns.forEach(column => {
                    let maxLength = 0;
                    column.eachCell({ includeEmpty: true }, cell => {
                        const length = cell.value ? String(cell.value).length : 0;
                        maxLength = Math.max(maxLength, length);
                    });
                    column.width = maxLength < 12 ? 12 : maxLength;
                });

                // Remove first row (headers)
                worksheet.spliceRows(1, 1);

            }
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${FileName}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } else if (res[0].Status === 'ERROR') {
            NotificationSound(res[0].Status, res[0].Message, '');
        } else if (res[0].Status === 'UNAUTHORIZED') {
            NotificationSound(res[0].Status, res[0].Message, '');
        }

    } catch (err) {
        NotificationSound('ERROR', err.message);
    }
};


