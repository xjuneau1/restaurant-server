const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const app = express();

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router")
const guestsRouter = require("./guests/guests.router")


app.use(cors());
app.use(express.json());
// app.use(express.bodyParser())

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);
app.use("/guests", guestsRouter)

app.use(notFound);
app.use(errorHandler);

module.exports = app;
