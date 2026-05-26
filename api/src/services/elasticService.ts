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

export async function aggregateDocuments(query: any, index: string) {
    const res = await fetch(`${env.ES_URL}/${index}/_search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            size: 0,
            query,
            aggs: {
                categories: {
                    terms: {
                        field: "keywords",
                        size: 10
                    }
                },
                price_stats: {
                    stats: {
                        field: "price"
                    }
                }
            }
        })
    });

    const data = await res.json();

    return {
        total: data.hits.total.value,
        categories: data.aggregations.categories.buckets.map((bucket: any) => ({
            key: bucket.key,
            docCount: bucket.doc_count
        })),
        price: data.aggregations.price_stats
    };
}

export async function indexDocument(body:any, index:string) {
    const res = await fetch(`${env.ES_URL}/${index}/_doc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return await res.json();
}
