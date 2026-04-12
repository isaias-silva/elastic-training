import Elysia, { t } from "elysia";
import * as elasticService from "../services/elasticService";
import { SearchQuery } from "../interfaces/SearchQuery";

export default new Elysia()
    .decorate("index", "books")
    .decorate("generateElasticQuery", (query: Partial<SearchQuery>) => {
        const { word, maxPrice, minPrice, category } = query;

        const must = word ? [{
            multi_match: {
                query: word,
                fields: ["name", "description", "keywords", "author"]
            }
        }] : [];

       const filter = [];

        const rangeFilter: { range: { price: Record<string, number> } } = { range: { price: {} } };

        if (minPrice !== undefined) rangeFilter.range.price["gte"] = minPrice;
        if (maxPrice !== undefined) rangeFilter.range.price["lte"] = maxPrice;

        if (Object.keys(rangeFilter.range.price).length > 0) {
            filter.push(rangeFilter);
        }
        if (category) {
            filter.push({ term: {"keywords": category } });
        }
        return {

            bool: { must, filter }

        }
    }
    )

    .get("/search", async ({ query, index, generateElasticQuery }) => {

        const docs = await elasticService.searchDocuments(generateElasticQuery(query), index)

        return docs;
    }, {
        query: t.Object({
            word: t.Optional(t.String()),
            maxPrice: t.Optional(t.Number()),
            minPrice: t.Optional(t.Number()),
            category: t.Optional(t.String())

        })
    }).post("/index", async ({ body, index }) => {

        return await elasticService.indexDocument(body, index)
    }, {
        body: t.Object({

            name: t.String(),
            description: t.String(),
            price: t.Number(),
        })

    }).post("/batch/index", async ({ body, index }) => {
        body.forEach(async (data) => {

            const res = await elasticService.indexDocument(data, index)

        })

        return { message: "Batch indexing started" }
    }, {
        body: t.Array(t.Object({
            name: t.String(),
            description: t.String(),
            price: t.Number(),
            author: t.String(),
            keywords: t.Array(t.String())
        }))
    })