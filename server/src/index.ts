import app from "./server";
import { connectDB } from "./config/db";

connectDB().then(() => {
  app.listen(8000, () => {
    console.log("Server is running");
  });
});
