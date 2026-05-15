let express = require("express");
let authRoutes = require("./routes/auth.routes");
let cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware");
let app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

module.exports = app;
