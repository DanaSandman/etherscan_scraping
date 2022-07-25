require('dotenv').config()
const { DB_PASS } = process.env;

module.exports = {
  'dbURL': `mongodb+srv://etherburnadmin:${DB_PASS}@cluster0.bh8ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}
