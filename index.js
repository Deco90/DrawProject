const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/routes");
const BASE_PATH = "/api/v1";
const app = express();
const port = 3000;
const morgan = require("morgan");
const helmet = require("helmet");
const sqlLiteManager = require("./src/models/sqlLiteManager");

app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(`${BASE_PATH}/`, routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  sqlLiteManager.connect();
});
