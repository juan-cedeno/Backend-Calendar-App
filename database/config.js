const mongoose = require('mongoose');


const databaseConection = async () => {
   
    try {

        mongoose.connect(process.env.DB_CONECTION, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex : true
        });

        console.log('bd online');
  

    } catch (error) {
        throw new Error('error al conectarse')
    }

}

module.exports = {
    databaseConection
}