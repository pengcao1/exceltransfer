var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
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
    }
})

var upload = multer({ storage: storage }).array('file')

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
        }
        return res.status(200).send(req.file)
        // Everything went fine.
    })
});


const convertExcel = (fileName) => {
    console.log("11 in convertExcel fileName=%s", fileName);
    const XLSX = require("xlsx");
    const workbook = XLSX.readFile(fileName);
    const sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach((value,index,array) => {
        // const worksheet = workbook.Sheets[value]
        console.log("value=", value);
        console.log("index=", index);
        console.log("array=", array);
            var worksheet = workbook.Sheets[value];
            var headers = {};
            var data = [];
            for (var z in worksheet) {
              if (z[0] === "!") continue;
              //parse out the column, row, and value
              var col = z.substring(0, 1);
              var row = parseInt(z.substring(1));
              var value = worksheet[z].v;

              //store header names
              if (row == 1) {
                headers[col] = value;
                continue;
              }

              if (!data[row]) data[row] = {};
              data[row][headers[col]] = value;
            }
            //drop those first two rows which are empty
            data.shift();
            data.shift();
            console.log(data);
    });
    // sheet_name_list.forEach(())
    // const sheetNames = sheetContent.SheetNames;
    // const workSheet = sheetContent.Sheets[sheetNames[0]];
    // console.log("workSheet=, ", workSheet);
    // console.log("sheetNames=", sheetNames[0]);
   // console.log("sheetContent, ",sheetContent);
}
app.listen(8100, function () {
    convertExcel("public/1559737321420_httest.xlsx");
    console.log('App running on port 8100');
});
