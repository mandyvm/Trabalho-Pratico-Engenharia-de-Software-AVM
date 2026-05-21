from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

import models
from database import engine, get_db

# Isso cria o arquivo banco_dados.db e as tabelas automaticamente
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API do Dashboard Epidemiológico")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Esquema Pydantic para validar os dados que chegam do Frontend
class CasoCreate(BaseModel):
    bairro: str
    doenca: str
    casos_registrados: int
    risco: str

@app.get("/")
def read_root():
    return {"mensagem": "API do Dashboard Epidemiológico com SQLite rodando!"}

# Rota para CADASTRAR um novo caso no banco de dados
@app.post("/api/casos")
def criar_caso(caso: CasoCreate, db: Session = Depends(get_db)):
    novo_caso = models.CasoEpidemiologico(
        bairro=caso.bairro,
        doenca=caso.doenca,
        casos_registrados=caso.casos_registrados,
        risco=caso.risco
    )
    db.add(novo_caso)
    db.commit()
    db.refresh(novo_caso)
    return novo_caso

# Rota para LER os dados do banco (Substitui os dados mockados da TP3)
@app.get("/api/casos")
def listar_casos(db: Session = Depends(get_db)):
    casos = db.query(models.CasoEpidemiologico).all()
    return casos

# Rota para DELETAR um caso pelo ID
@app.delete("/api/casos/{caso_id}")
def deletar_caso(caso_id: int, db: Session = Depends(get_db)):
    caso = db.query(models.CasoEpidemiologico).filter(models.CasoEpidemiologico.id == caso_id).first()
    if caso:
        db.delete(caso)
        db.commit()
        return {"mensagem": f"Caso {caso_id} deletado com sucesso!"}
    return {"erro": "Caso não encontrado"}