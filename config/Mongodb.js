import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
//connection to Database
const connectDb = async () => {

    try {
        mongoose.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        })
        const url = `${process.env.MONGODB_URL}/MentorshipProject`;
        await mongoose.connect(url);
        console.log("Database connected sucessfully");
    } catch (error) {
        console.log(error)
    }

}
export default connectDb;