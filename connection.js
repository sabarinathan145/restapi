const mongoose = require("mongoose");
const connectTODB = async()=> mongoose.connect(process.env.mongdb_url ,
     {
    useNewUrlParser : true,
    useFindAndModify : false,
    useUnifiedTopology :true,
});

module.exports = connectTODB;