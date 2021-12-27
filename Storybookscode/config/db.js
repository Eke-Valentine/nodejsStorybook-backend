const mongoose=require('mongoose')

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            UseUnifiedTopology:true
        })
        console.log(`mongo db connection established named  ${conn.connection.name} at ${conn.connection.host}`)

    }catch (e) {
        console.error(e);
        process.exit(1);
    }
}
module.exports =connectDb; 