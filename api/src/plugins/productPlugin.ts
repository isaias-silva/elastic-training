import Elysia, { t } from "elysia";
import * as elasticService from "../services/elasticService";

export default new Elysia()
    .get("/search", async ({ query }) => {

        return await elasticService.search(query.word)

    }).post("/index", async ({ body }) => {

        return await elasticService.index(body)
    }, {
        body: t.Object({

            name: t.String(),
            description: t.String(),
            price: t.Number()
        })
    }).post("/batch/index", async ({ body }) => {
        body.forEach((data) => elasticService.index(data))

    }, {
        body: t.Array(t.Object({
            name: t.String(),
            description: t.String(),
            price: t.Number()
        }))
    })