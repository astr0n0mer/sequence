import express, { Request, Response } from "express";

// Create Express server
const app = express();

// Define a GET route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! How are you");
});

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
