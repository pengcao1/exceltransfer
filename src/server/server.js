var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName)
        convertExcel(fileName);
    }
})

var upload = multer({ storage: storage }).array('file')

app.get('/', function (req, res) {
    return res.send('Hello Server')
})
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err)
            return res.status(500).json(err)
            // A Multer error occurred when uploading.
        } else if (err) {
            console.log(err ,"--")
            return res.status(500).json(err)
            // An unknown error occurred when uploading.
        }


        console.log(req.file, "99");
        return res.status(200).send(req.file)
        // Everything went fine.
    })
});


const convertExcel = (fileName) => {
    console.log("11 in convertExcel fileName=%s", fileName);
    const excelToJson = require('convert-excel-to-json');
    const fs = require('fs');
    const result = excelToJson({
        sourceFile: 'public/'+fileName,
        sheets: [{
            name: 'Purchase map',
            header: {
                rows: 1
            },
            columnToKey: {
                A: 'Base Course Type',
                B: 'ISBN',
                C: 'Course name',
                D: 'Upsell in-app purchase ISBN',
                E: 'Upsell course name',
                F: 'Upsell2 in-app purchase ISBN',
                G: 'Upsell2 course name',
                H: 'Upgrade in-app purchase ISBN',
                I: 'Upgrade course name'
            }
        }, {
            name: 'Format map',
            header: {
                rows: 1
            },
            columnToKey: {
                A: 'Base Course Type',
                B: 'ISBN',
                C: 'Course name - Upsell Card & Library',
                D: 'Course name - Learn Page',
                E: 'Course Description - Upsell Card',
                F: 'Other format 1 (Upsell) ISBN',
                G: 'Other format 2 (Upgrade) ISBN',
                H: 'Other format 3 (DVD) ISBN'
            }
        }]
    });


}
app.listen(8100, function () {
    console.log('App running on port 8100');
});
