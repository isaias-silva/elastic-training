import { env } from "bun";

export async function searchDocuments(query:any, index:string) {

    const res = await fetch(`${env.ES_URL}/${index}/_search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
            body: JSON.stringify({
            query
        })
    })
   
    const data = await res.json();

    return data.hits.hits.map((hit: any) => ({
        score: hit._score,
        ...hit._source
    }));
}

export async function indexDocument(body:any, index:string) {
    const res = await fetch(`${env.ES_URL}/${index}/_doc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return await res.json();
}