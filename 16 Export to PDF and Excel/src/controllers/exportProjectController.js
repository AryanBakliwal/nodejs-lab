const fs = require('node:fs');
const path = require('node:path');
const ExcelJS = require('exceljs');
const PDFPrinter = require('pdfmake');
const {StatusCodes} = require('http-status-codes');
const exampleProjectsFilePath = path.join(__dirname, "../helpers/exampleProjects.json");
const {projects} = JSON.parse(fs.readFileSync(exampleProjectsFilePath, "utf8"));

const exportProject = async (req, res) => {
    const fields = Object.keys(req.query);

    const newProj = projects.map((project) => {
        const filtered = {};
        for (const key of fields) {
            if (project.hasOwnProperty(key)) {
                filtered[key] = project[key];
            }
        }
        return filtered;
        // 
        // return Object.fromEntries(
        //     Object.entries(project).filter(([key]) => fields.includes(key))
        // );
    })
    
    if(req.params.type == 'excel') {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Test Sheet', {
            views: [
                {state: 'frozen', xSplit: 1, ySplit:1}
            ]
        });
        const columnList = Object.keys(newProj[0]).map((col) => {
            return {
                header: col,
                key: col
            }
        });
        worksheet.columns = [...columnList];
        const rows = newProj.map((obj) => Object.values(obj))
        worksheet.addRows(rows);
        const fPath = path.join(__dirname, '../files', 'test.xlsx');
        
        await workbook.xlsx.writeFile(fPath)
        .then(() => {
            res.download(fPath, 'exported_data.xlsx')
            return;
        })
        .catch(() => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to download file");
        })
    } else if(req.params.type == 'pdf') {
        const fonts = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            },
        };
        const headerList = Object.keys(newProj[0]).map((col) => {
            return {
                text: col,
                style: 'tableHeader',
                bold: true,
            }
        });
        const rows = newProj.map((obj) => Object.values(obj))
        const dd = {
            content: [
                {text: 'Projects', fontSize: 14, bold: true, alignment: 'center', margin: [0, 0, 0, 25] /*left, top, right, bottom*/},
		        {
			        table: {
				        headerRows: 1,
				        body: [headerList,...rows]
			        },
			        layout: 'lightHorizontalLines'
		        },
            ],
            defaultStyle: {
                font: 'Helvetica'
            }
        }
        const printer = new PDFPrinter(fonts);
        const pdfDoc = printer.createPdfKitDocument(dd)
        const fPath = path.join(__dirname, '../files', 'test.pdf')
        const writeStream = fs.createWriteStream(fPath)
        pdfDoc.pipe(writeStream);
        pdfDoc.end();
        writeStream.on('finish', () => {
            res.download(fPath, 'exported_data.pdf');
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).send("Invalid type");
    }
}

module.exports = {exportProject};