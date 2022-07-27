require('dotenv').config()
// const { DB_PASS } = process.env;

const DB_PASS = "etherburn1234";
console.log('DB_PASS dev', DB_PASS);

module.exports = {
  // 'dbURL': 'mongodb://localhost:27017',
  'dbURL': `mongodb+srv://etherburnadmin:${DB_PASS}@cluster0.bh8ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}
 