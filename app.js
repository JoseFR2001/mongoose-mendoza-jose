import express from "express";
import "dotenv/config";
import { startDB } from "./src/config/database.js";
import router from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", router);

app.listen(PORT, async () => {
  await startDB(), console.log(`Servidor escuchando en el puerto ${PORT}`);
});
