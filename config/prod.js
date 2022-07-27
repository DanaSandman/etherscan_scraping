require('dotenv').config()
const { DB_PASS } = process.env;
console.log('DB_PASS dev', DB_PASS);

module.exports = {
  'dbURL': `mongodb+srv://etherburnadmin:${DB_PASS}@cluster0.bh8ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}
