var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
const CONFIG = require('./const');

app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //TODO: create public folder is not exits
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '_' + file.originalname;
        cb(null, fileName)
        //convertExcel('public/'+fileName);
        return
    }
})

var upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    //file filter
    if (
      ["xls", "xlsx"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  }
}).single("file");

app.get('/', function (req, res) {
    return res.send('Hello Server')
})
app.post('/upload', function (req, res) {
    // console.log(res, "9911");
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err)
            return res.status(500).json(err)
            // A Multer error occurred when uploading.
        } else if (err) {
            console.log(err ,"--")
            return res.status(500).json(err)
            // An unknown error occurred when uploading.
        } else if (!req.file) {
            return res.status(501).json(err);
        }

        console.log(req.file.path);
        const re = convertExcel(req.file.path);
        console.log("===== ",re);
        return res.status(200).json(re).send();
        // Everything went fine.
    })
    //console.log(res, "9911");
});


const convertExcel = (fileName) => {
    console.log("11 in convertExcel fileName=%s", fileName);
    const XLSX = require("xlsx");
    const workbook = XLSX.readFile(fileName);
    const sheet_name_list = workbook.SheetNames;
    let allSheetJson = [];
    sheet_name_list.forEach((value,index,array) => {
        var worksheet = workbook.Sheets[value];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        //console.log(jsonData);
        jsonData.map((value,index,array) => {
            // console.log("++++++++++++++++++++");
            Object.keys(value).map((value, index, array) => {
                // console.log(CONFIG.EXCEL_HEADER_FORMAT[index+1], "vs", value);
                if (CONFIG.EXCEL_HEADER_FORMAT[index+1] !== value) {
                    // console.error("EXCEL FORMAT error");
                    // console.log(CONFIG.EXCEL_HEADER_FORMAT[index+1], "vs", value);
                }
            });
            // console.log(value);
            // console.log(index);
            // console.log(array);
            console.log(jsonData);
        });
        allSheetJson.push(jsonData);
    });
    return allSheetJson;
}
app.listen(8100, function () {
    console.log('App running on port 8100');
});
