import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import jwtCheck from "./src/middlewares/auth";
import router from "./src/routes";
const app = express();
const port = 3001;

dotenv.config();

app.use(cors());
app.use(jwtCheck);
app.use((err, req, res, next) => {
  if (err?.name === 'UnauthorizedError') {
    res?.status(401).send('Unauthorized');
  }
});
app.use(router);

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})

export default app;