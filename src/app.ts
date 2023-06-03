import express from "express";
import userRoutes from "./routes/user";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`server is running in ${port}`);
});
