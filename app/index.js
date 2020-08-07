const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const env = process.env.NODE_ENV || "development";

const app = express();

if (env === "development") {
  require("dotenv").config();
}

app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/login", require("./routes/LoginRoute").LoginRouter);
app.use("/api/v1/register", require("./routes/LoginRoute").RegisterRouter);

app.use("/api/v1/product", require("./routes/ProductRoute"));
app.use("/api/v1/seller", require("./routes/SellerRoutes"));
app.use("/api/v1/commerce", require("./routes/CommerceRoutes").router);
app.use("/api/v1/commerceGet", require("./routes/CommerceRoutes").routerGet);

module.exports = app;
