import { config } from "dotenv";
import { app } from "./app";

const runServer = async () => {
  try {
    config();
    const { PORT } = process.env;

    if (!PORT) {
      throw new Error("PORT environment variable is not defined");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

runServer();