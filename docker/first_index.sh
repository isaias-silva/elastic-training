
until curl -s http://localhost:9200/_cluster/health | grep -q 'status.*\(green\|yellow\)'; do
  echo "Aguardando o Elasticsearch..."
  sleep 5
done


curl -X PUT "http://localhost:9200/books" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "name": { "type": "text", "analyzer":"portuguese"},
      "description":{"type":"text","analyzer":"portuguese"},
      "author":{"type":"text"},
      "price": { "type": "double"},
      "keywords": { "type": "keyword"}
   
    }
  }
}'
echo "
Índice 'books' criado com mapeamento personalizado.
"