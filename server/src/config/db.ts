import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Encode credentials to handle special characters
const username = encodeURIComponent(process.env.DB_USERNAME as string);
const password = encodeURIComponent(process.env.DB_PASSWORD as string);

const uri = `mongodb+srv://${username}:${password}@cluster0.vgvhsan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true, // enforce TLS
});

// Connect to MongoDB
export async function connectDB(): Promise<void> {
  try {
    await client.connect(); // no need for isConnected()
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

export default client;
