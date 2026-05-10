from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API do Dashboard Epidemiológico")

# Configuração do CORS para que o React acesse esta API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # inserir futuramente a url do react
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rota de casos
@app.get("/api/casos")
def get_casos():
    return [
        {"id": 1, "bairro": "Centro", "casos": 15, "risco": "Alto"},
        {"id": 2, "bairro": "Savassi", "casos": 5, "risco": "Baixo"},
        {"id": 3, "bairro": "Pampulha", "casos": 22, "risco": "Crítico"}
    ]

@app.get("/")
def read_root():
    return {"mensagem": "API do Dashboard Epidemiológico está rodando!"}