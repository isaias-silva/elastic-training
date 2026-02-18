import { env } from "bun";
import { Product } from "../interfaces/Product";

export async function search(word: string) {

    const res = await fetch(`${env.ES_URL}/products/_search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: {
                multi_match: {
                    query: word
                }
            }
        })
    })
    const data = await res.json();

    return data.hits.hits.map((hit: any) => ({
        score: hit._score,
        ...hit._source
    }));
}

export async function index(body:Product) {
    const res = await fetch(`${env.ES_URL}/products/_doc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return await res.json();
}