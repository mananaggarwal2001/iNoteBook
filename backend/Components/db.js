const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true";
const connectToMongo = async () => {
    try {

        await mongoose.connect(mongoURI, () => {
            console.log("The connection is made successfully in the given mongoose model in the application");

        })

        console.log("Mongodb connected in the given server.")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectToMongo;