import mongoose  from "mongoose";

export const dbConnection = async () => {
      // Conectarse a la base de datos
   try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Data base connected")
   } catch (error) {
    console.log(error)
   }
  
};

