import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing body
app.use(express.json());

//Middleware for handling CORS POLICY
//opt 1: Allow all origins with default default of cors
app.use(cors());
//opt2: Allow Custom origins
//app.use(
// cors({
//  origin: "http://localhost:5555/books",
// methods: ["GET", "POST", "PUT", "DELETE"],
// allowedHeaders: ["Content-Type"],
//})
//);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack tutorial");
});

app.use("/books", booksRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App connected to database`);
    app.listen(PORT, () => {
      console.log(`App is listening to PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
