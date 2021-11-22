const mongoose=require('mongoose')

const  connectMyDB= async (req, res, next) => {
try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log(" db is connected from ",db.connection.host,db.connection.port );
    
} catch (error) {
    console.error(error);
    process.exit(1);
}

}

module.exports=connectMyDB

