import { config } from "dotenv";
import { app } from "./app";
import { connectToDatabase } from "../databases/mongo/connection";

const runServer = async () => {
  try {
    config();
    const { MONGO_URI, PORT } = process.env;
    await connectToDatabase(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

runServer();