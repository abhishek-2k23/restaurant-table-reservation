import mongoose from "mongoose"

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL)
    if (connection.STATES.connected === 1) {
      console.log("Db connected successfully")
    }
  } catch (e) {
    console.log("Error in db connection ", e.message)
    process.exit(1)  // Exit the process if database connection fails
  }
}

export default dbConnection
