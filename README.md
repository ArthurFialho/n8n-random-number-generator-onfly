# n8n Custom Random Number Generator Node -- ARTHUR FERNANDES FIALHO & SILVA

Um conector personalizado para n8n que gera números aleatórios verdadeiros usando a API Random.org.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte do processo seletivo da Onfly. O conector implementa uma integração com o Random.org para gerar números aleatórios verdadeiros dentro da plataforma n8n.

## ✨ Funcionalidades

- **Node personalizado "Random"** com uma única operação: "True Random Number Generator"
- **Inputs configuráveis**: Min e Max (aceita apenas números)
- **Integração com Random.org**: Utiliza a API oficial para gerar números verdadeiramente aleatórios
- **Interface amigável**: Nomes descritivos e ícone personalizado
- **Validação de entrada**: Verifica se Min não é maior que Max

## 🛠 Requisitos Técnicos

- Node.js 22 (LTS)
- Docker e Docker Compose
- Git
- WSL (se estiver usando Windows)

## 🚀 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/n8n-random-node.git
cd n8n-random-node
```

### 2. Instalar dependências do custom node

```bash
cd custom-nodes/n8n-nodes-random
npm install
```

### 3. Build do projeto

```bash
npm run build
```

### 4. Configurar e executar o ambiente Docker

```bash
cd ../../docker
docker-compose up -d
```

### 5. Verificar se os serviços estão rodando

```bash
docker ps
```

Você deve ver dois containers rodando:

- `postgres` (banco de dados)
- `n8n` (aplicação principal)

### 6. Acessar o n8n

Abra seu navegador e acesse: **http://localhost:5678**

## 🎯 Como Usar o Custom Node

1. **Acesse o n8n** em http://localhost:5678
2. **Crie um novo workflow** clicando em "Add Workflow"
3. **Adicione o node "Random"** procurando na barra lateral esquerda
4. **Configure os parâmetros**:
   - **Operation**: "True Random Number Generator" (padrão)
   - **Min**: Valor mínimo (exemplo: 1)
   - **Max**: Valor máximo (exemplo: 100)
5. **Execute o workflow** clicando no botão "Execute Workflow"
6. **Visualize o resultado** no painel de saída

## 📁 Estrutura do Projeto

```
n8n-random-node/
├── custom-nodes/
│   └── n8n-nodes-random/
│       ├── nodes/
│       │   └── Random/
│       │       ├── Random.node.ts    # Implementação principal do node
│       │       └── random.svg        # Ícone personalizado
│       ├── dist/                     # Arquivos compilados (gerados pelo build)
│       ├── package.json              # Configurações do npm e dependências
│       ├── tsconfig.json            # Configurações do TypeScript
│       └── index.ts                 # Ponto de entrada do módulo
├── docker/
│   └── docker-compose.yml          # Configuração do Docker (n8n + PostgreSQL)
├── .gitignore                       # Arquivos ignorados pelo Git
└── README.md                        # Este arquivo
```

### Variáveis de Ambiente (Docker)

O ambiente Docker está configurado com as seguintes variáveis:

**PostgreSQL:**

- `POSTGRES_DB`: n8n
- `POSTGRES_USER`: n8n
- `POSTGRES_PASSWORD`: n8n

**n8n:**

- `DB_TYPE`: postgresdb
- `N8N_BASIC_AUTH_ACTIVE`: false (desabilitado para facilitar testes)
- `WEBHOOK_URL`: http://localhost:5678

### Volumes Docker

- **PostgreSQL**: `postgres_data` - persiste dados do banco
- **n8n**: `n8n_data` - persiste configurações do n8n
- **Custom Node**: `../custom-nodes/n8n-nodes-random:/home/node/.n8n/custom` - monta o node personalizado

## 🧪 Executar Testes

### Teste Manual no n8n

1. Acesse http://localhost:5678
2. Crie um workflow com o node "Random"
3. Configure Min: 1, Max: 10
4. Execute e verifique se retorna um número entre 1 e 10
5. Teste casos extremos (Min = Max, números negativos, etc.)

### Teste da API Random.org

O node utiliza este endpoint específico conforme solicitado:

```
https://www.random.org/integers/?num=1&min={MIN}&max={MAX}&col=1&base=10&format=plain&rnd=new
```

### Verificar Logs

```bash
# Ver logs do n8n
docker-compose logs n8n

# Ver logs em tempo real
docker-compose logs -f n8n
```

## 🔄 Desenvolvimento e Debugging

### Recompilar após mudanças

```bash
cd custom-nodes/n8n-nodes-random
npm run build
cd ../../docker
docker-compose restart n8n
```

### Modo de desenvolvimento (watch)

```bash
cd custom-nodes/n8n-nodes-random
npm run watch
```

### Verificar se o node está carregado

No console do n8n, você deve ver logs indicando que o custom node foi carregado.

## 📊 Exemplo de Resposta

Quando executado com Min: 1 e Max: 100, o node retorna:

```json
{
  "result": 69,
  "min": 1,
  "max": 100,
  "source": "random.org"
}
```

## 🛑 Parar os Serviços

```bash
cd docker
docker-compose down
```

Para remover também os volumes (dados persistidos):

```bash
docker-compose down -v
```

## 🐛 Troubleshooting

### Problema: Node não aparece no n8n

**Solução**: Verifique se o build foi executado e reinicie o container n8n

### Problema: Erro de conexão com Random.org

**Solução**: Verifique sua conexão com internet e se a API Random.org está disponível

### Problema: Container não sobe

**Solução**: Verifique se as portas 5678 e 5432 não estão sendo usadas por outros serviços

### Problema: Erro de TypeScript

**Solução**: Certifique-se de ter o Node.js 22 instalado e execute `npm install` novamente

## 💻 Tecnologias Utilizadas

- **Node.js 22 (LTS)** - Runtime JavaScript
- **TypeScript** - Linguagem tipada
- **n8n** - Plataforma de automação
- **Docker & Docker Compose** - Containerização
- **PostgreSQL 13** - Banco de dados
- **Random.org API** - Geração de números aleatórios

## 📝 Notas Técnicas

- O custom node implementa a interface `INodeType` do n8n
- Utiliza `IExecuteFunctions` para acessar parâmetros e fazer requisições HTTP
- Inclui tratamento de erros e validação de entrada
- Segue as melhores práticas de desenvolvimento de nodes personalizados do n8n

## 📞 Suporte

Em caso de dúvidas sobre o processo seletivo, entre em contato com o time da Onfly através do email fornecido no teste.

---

**Desenvolvido para o processo seletivo Recruta Onfly - Etapa 3: Teste Técnico**
