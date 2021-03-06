// Importing Required Library
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.static("build"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Importing Routes for in our index,js so that they become accessible
var productRouter = require("./routes/products");
var passwordRouter = require("./routes/password");
var bookingRouter = require("./routes/order");

// api/"name". We set our own custom unique name so that we can access and perform operation
app.use("/api/products", productRouter);
app.use("/api/password", passwordRouter);
app.use("/api/booking", bookingRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
