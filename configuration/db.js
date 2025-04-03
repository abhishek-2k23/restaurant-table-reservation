import mongoose from "mongoose"

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParse: true,
      useUnifiedTopology: true,
    })
    if (connection.STATES.connected === 1) {
      console.log("Db connected successfully")
    }
  } catch (e) {
    console.log("Error in db connection ", e.message)
  }
}

export default dbConnection
