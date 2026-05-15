let express = require("express");
const cors = require("cors");
let authRoutes = require("./routes/auth.routes");
let blogRoutes = require("./routes/blog.routes");
let projectRoutes = require("./routes/project.routes");
let profileRoutes = require("./routes/profile.routes");

let cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/error.middleware");

let app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);

app.use(errorMiddleware);

module.exports = app;
