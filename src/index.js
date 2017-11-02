const Excel = require('exceljs')

const workbook = new Excel.Workbook()
workbook.views = [
  {
    x: 0, y: 0, width: 10000, height: 20000,
    firstSheet: 0, activeTab: 1, visibility: 'visible'
  }
]

const sheet = workbook.addWorksheet('My Sheet')
// create a sheet with red tab colour
workbook.addWorksheet('My Color Sheet', {properties:{tabColor:{argb:'FFC0000'}}});

/* sheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
] */

sheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});

sheet.addRow([3, 'Sam', new Date()]);

var rowValues = [];
rowValues[1] = 4;
rowValues[5] = 'Kyle';
rowValues[9] = new Date();
sheet.addRow(rowValues);

sheet.getCell('A1').fill = {
    type: 'pattern',
    pattern:'solid',
    fgColor:{argb:'FFFF0000'}
};



sheet.mergeCells('B3:B4')
sheet.getCell('B3').value = 'merge'
sheet.getCell('B3').alignment = { vertical: 'middle', horizontal: 'center' }

workbook.xlsx.writeBuffer().then(buffer => {
  console.log(buffer.constructor)
})
workbook.xlsx.writeFile('demo.xlsx').then(function() {
  console.log('doen')
})
