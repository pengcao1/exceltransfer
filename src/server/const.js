const EXCEL_HEADER_FORMAT = {
         1: "姓名",
         2: "单位",
         3 : "级别",
         4 : "备注",
};

const EXCEL_DATA_TYPES = {
         Boolean: 'b',
         Error: 'e',
         Number: 'n',
         Date: 'd',
         Text: 's',
         Stub: 'z',
};

const test = 
[
  { 姓名: true, 单位: false, 备注: "sheetjs" },
  { 姓名: "foo", 单位: "bar", 级别: 41689.937997685185, 备注: "0.3" },
  { 姓名: "baz", 级别: "qux" }
];

module.exports = { EXCEL_HEADER_FORMAT, EXCEL_DATA_TYPES };
// export { EXCEL_HEADER_FORMAT, EXCEL_DATA_TYPES };