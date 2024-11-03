import mongoose from "mongoose";

class DbConnect {
  static connectMongo() {
    mongoose.connect(process.env.MONGO_URL as string)
      .then(() => console.log('Connected to MongoDB successfully'))
      .catch((error: unknown) => {
        if(error instanceof Error) {
            console.error('MongoDB connection error:', error?.message)
        } else {
            console.error('MongoDB connection error:', error)
        }
      });
  }
}


export default DbConnect