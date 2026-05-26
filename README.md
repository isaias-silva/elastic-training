# estudo sobre elasticsearch

repositório de estudos sobre elastic.

## inicialização
 iniciar o container do elastic na porta 9200
```shell
cd docker && docker compose up --build -d
```
## tópicos:

### Indexing & mapping 
1- mapping definido via shell na inicialização do container.

2 - adicionar o arquivo .env na pasta api com a url local do elastic na propriedade ES_URL (http://localhost:9200)

3 - iniciar a api com bun run dev.

4 - indexar livros:

POST http://localhost:4100/batch/index
```json

[
  { "name": "Clean Code", "author": "Robert C. Martin", "price": 150, "description": "Manual de boas práticas para escrever código legível e sustentável", "keywords": ["tecnologia", "programação", "software"] },
  { "name": "O Senhor dos Anéis: A Sociedade do Anel", "author": "J.R.R. Tolkien", "price": 85, "description": "A jornada épica de Frodo para destruir o Um Anel", "keywords": ["ficção", "fantasia", "aventura"] },
  { "name": "O Algoritmo Mestre", "author": "Pedro Domingos", "price": 120, "description": "Como a busca pela máquina de aprendizado definitiva mudará o mundo", "keywords": ["tecnologia", "IA", "ciência"] },
  { "name": "Duna", "author": "Frank Herbert", "price": 95, "description": "Uma obra-prima da ficção científica sobre política, religião e ecologia", "keywords": ["ficção", "sci-fi", "clássico"] },
  { "name": "Refatoração", "author": "Martin Fowler", "price": 180, "description": "Guia para aperfeiçoar o design de códigos existentes", "keywords": ["tecnologia", "desenvolvimento", "arquitetura"] },
  { "name": "1984", "author": "George Orwell", "price": 60, "description": "A distopia clássica de George Orwell sobre vigilância e controle", "keywords": ["ficção", "distopia", "política"] },
  { "name": "Pai Rico, Pai Pobre", "author": "Robert Kiyosaki", "price": 70, "description": "Lições sobre finanças pessoais e independência financeira", "keywords": ["técnico", "finanças", "negócios"] },
  { "name": "O Nome do Vento", "author": "Patrick Rothfuss", "price": 110, "description": "A história de Kvothe, o mago e músico mais famoso de sua era", "keywords": ["ficção", "fantasia", "literatura"] },
  { "name": "Docker para Desenvolvedores", "author": "Rafael Gomes", "price": 140, "description": "Como criar e gerenciar containers de forma eficiente", "keywords": ["tecnologia", "devops", "infraestrutura"] },
  { "name": "O Homem Mais Rico da Babilônia", "author": "George S. Clason", "price": 45, "description": "Segredos milenares para o sucesso financeiro", "keywords": ["técnico", "finanças", "sucesso"] },
  { "name": "Neuromancer", "author": "William Gibson", "price": 80, "description": "O romance que definiu o gênero Cyberpunk", "keywords": ["ficção", "cyberpunk", "sci-fi"] },
  { "name": "Aprendizado de Máquina com Scikit-Learn e TensorFlow", "author": "Aurélien Géron", "price": 260, "description": "Guia prático para construir sistemas inteligentes", "keywords": ["tecnologia", "IA", "python"] },
  { "name": "Fundação", "author": "Isaac Asimov", "price": 105, "description": "Isaac Asimov narra a queda e o renascimento de um império galáctico", "keywords": ["ficção", "sci-fi", "espaço"] },
  { "name": "Expressões Regulares: Guia de Consulta Rápida", "author": "Aurelio Marinho Jargas", "price": 55, "description": "Domine o poder do Regex para manipulação de textos", "keywords": ["tecnologia", "ferramentas", "programação"] },
  { "name": "Cem Anos de Solidão", "author": "Gabriel García Márquez", "price": 90, "description": "A saga épica da família Buendía em Macondo", "keywords": ["ficção", "realismo mágico", "clássico"] },
  { "name": "Sprint", "author": "Jake Knapp", "price": 88, "description": "Como resolver grandes problemas e testar novas ideias em apenas cinco dias", "keywords": ["técnico", "inovação", "negócios"] },
  { "name": "Crônicas de Gelo e Fogo: A Guerra dos Tronos", "author": "George R.R. Martin", "price": 130, "description": "O jogo político pelo Trono de Ferro começa aqui", "keywords": ["ficção", "fantasia", "drama"] },
  { "name": "Arquitetura Limpa", "author": "Robert C. Martin", "price": 170, "description": "O guia do artesão para estrutura e design de software", "keywords": ["tecnologia", "arquitetura", "software"] },
  { "name": "Mindset: A Nova Psicologia do Sucesso", "author": "Carol S. Dweck", "price": 65, "description": "Como a nossa atitude mental influencia o sucesso", "keywords": ["técnico", "psicologia", "autoajuda"] },
  { "name": "O Guia do Mochileiro das Galáxias", "author": "Douglas Adams", "price": 75, "description": "Uma viagem hilária pelo universo após a destruição da Terra", "keywords": ["ficção", "humor", "sci-fi"] }
]

```
### pesquisa e consulta:

 http://localhost:4100/search?word=PALAVRA

### agregações:

Resumo por categoria (`keywords`) e estatísticas de preço usando agregação no Elasticsearch:

http://localhost:4100/aggregations?word=clean&minPrice=50&maxPrice=200&category=tecnologia
