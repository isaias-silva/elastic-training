import { Elysia } from "elysia";
import productPlugin from "./plugins/productPlugin";



const app = new Elysia();

app.use(productPlugin)

app.listen(4100)
console.log(
  `server running in ${app.server?.hostname}:${app.server?.port}`
);
