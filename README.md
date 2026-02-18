# estudo sobre elasticsearch

nesse repositório para estudo é testado o indexing e mapping do elasticsearch em conjunto com bun.

### endpoints:

1 - após iniciar o container do elastic na porta 9200:
- defininir o mapping
  
POST http://localhost:9200/products

```json
{
  "mappings": {
    "properties": {
      "name": { "type": "text", "analyzer": "portuguese" },
      "price": { "type": "float" },
      "description": {
        "type": "text",
        "analyzer": "portuguese"
    }}}
}

```

2 - adicionar o arquivo .env na pasta app com a url local do elastic na propriedade ES_URL (http://localhost:9200/products)

3 - iniciar a api com bun run dev.

4 - indexar produtos:

POST http://localhost:4100/batch/index
```json

[
  {"name": "Boné Águia de Fogo", "price": 300, "description": "Melhor produto de boné"},
  {"name": "Camiseta Algodão Egípcio", "price": 150, "description": "Conforto extremo para o dia a dia"},
  {"name": "Tênis Urban Runner", "price": 450, "description": "Performance e estilo nas ruas"},
  {"name": "Jaqueta de Couro Vintage", "price": 890, "description": "Estilo clássico com durabilidade"},
  {"name": "Calça Jeans Slim Fit", "price": 220, "description": "Corte moderno e ajuste perfeito"},
  {"name": "Relógio Sport Digital", "price": 180, "description": "Resistente à água com cronômetro"},
  {"name": "Óculos de Sol Aviador", "price": 350, "description": "Lentes polarizadas com proteção UV"},
  {"name": "Mochila Tech 30L", "price": 280, "description": "Compartimento acolchoado para notebook"},
  {"name": "Cinto de Couro Italiano", "price": 120, "description": "Acabamento premium artesanal"},
  {"name": "Moletom Oversized", "price": 190, "description": "Tecido flanelado de alta gramatura"},
  {"name": "Bermuda Cargo Militar", "price": 140, "description": "Bolsos utilitários e tecido ripstop"},
  {"name": "Sapato Social Oxford", "price": 400, "description": "Elegância para ocasiões formais"},
  {"name": "Gorro de Lã Inverno", "price": 60, "description": "Proteção térmica com estilo"},
  {"name": "Meias Performance Cano Alto", "price": 45, "description": "Tecnologia que absorve o suor"},
  {"name": "Corrente de Prata 925", "price": 550, "description": "Design minimalista e sofisticado"},
  {"name": "Shorts de Banho Floral", "price": 95, "description": "Secagem rápida para o verão"},
  {"name": "Camisa Polo Piquet", "price": 130, "description": "Visual casual refinado"},
  {"name": "Blazer Slim Moderno", "price": 620, "description": "Corte italiano para eventos"},
  {"name": "Carteira de Couro Compacta", "price": 85, "description": "Design slim com bloqueio RFID"},
  {"name": "Pulseira de Aço Escovado", "price": 110, "description": "Acessório robusto e moderno"},
  {"name": "Regata Dry Fit", "price": 75, "description": "Ideal para treinos intensos"},
  {"name": "Chinelo Ergonômico", "price": 115, "description": "Máximo conforto para os pés"},
  {"name": "Colete Térmico Puff", "price": 320, "description": "Leve e isolante para o frio"},
  {"name": "Bandana Estampada", "price": 35, "description": "Acessório versátil em algodão"},
  {"name": "Suspensório Retrô", "price": 55, "description": "Toque clássico ao visual"},
  {"name": "Gravata de Seda", "price": 145, "description": "Textura suave e brilho discreto"},
  {"name": "Botas de Trilha Impermeável", "price": 580, "description": "Solado com máxima aderência"},
  {"name": "Parka de Nylon", "price": 410, "description": "Resistente ao vento e chuva leve"},
  {"name": "Camisa de Linho", "price": 260, "description": "Frescor e elegância natural"},
  {"name": "Tênis Casual Branco", "price": 310, "description": "O básico essencial que combina com tudo"},
  {"name": "Boné Snapback Graffiti", "price": 165, "description": "Arte urbana bordada à mão"},
  {"name": "Luvas de Couro Térmicas", "price": 175, "description": "Forro em lã para invernos rigorosos"},
  {"name": "Cachecol de Cashmere", "price": 490, "description": "Luxo e maciez incomparáveis"},
  {"name": "Shoulder Bag Minimalista", "price": 135, "description": "Praticidade para carregar o essencial"},
  {"name": "Pijama de Algodão Soft", "price": 160, "description": "Noites de sono com total conforto"},
  {"name": "Sandália de Couro", "price": 200, "description": "Estilo rústico e duradouro"},
  {"name": "Jaqueta Jeans Destroyer", "price": 380, "description": "Lavagem moderna com puídos"},
  {"name": "Calça Jogger Moletom", "price": 170, "description": "Punhos elásticos e cordão de ajuste"},
  {"name": "Anel de Tungstênio", "price": 240, "description": "Material ultra resistente a riscos"},
  {"name": "Pulseira de Couro Trançado", "price": 90, "description": "Detalhes em aço inoxidável"},
  {"name": "Camiseta Estampa Exclusiva", "price": 110, "description": "Edição limitada de artista local"},
  {"name": "Sobretudo de Lã Batida", "price": 1100, "description": "Peça premium para alta elegância"},
  {"name": "Capa de Chuva Transparente", "price": 125, "description": "Design futurista e funcional"},
  {"name": "Bucket Hat Reversível", "price": 98, "description": "Dois estilos em um único chapéu"},
  {"name": "Mala de Viagem de Mão", "price": 470, "description": "Tamanho ideal para cabine de avião"},
  {"name": "Suéter Gola V", "price": 210, "description": "Malha leve para meia-estação"},
  {"name": "Bota Chelsea de Camurça", "price": 530, "description": "Clássico britânico com sola de borracha"},
  {"name": "Camisa Xadrez Flanela", "price": 185, "description": "Visual lenhador autêntico"},
  {"name": "Boné Trucker Vintage", "price": 140, "description": "Tela respirável e aba curva"}
]

```

5 - pesquisar em http://localhost:4100/search?word=PALAVRA