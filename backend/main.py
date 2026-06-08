from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import random

import models
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API do Dashboard Epidemiológico ")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CasoCreate(BaseModel):
    bairro: str
    doenca: str
    casos_registrados: int
    risco: str

@app.get("/")
def read_root():
    return {"mensagem": "API rodando!"}

@app.post("/api/casos")
def criar_caso(caso: CasoCreate, db: Session = Depends(get_db)):
    novo_caso = models.CasoEpidemiologico(**caso.dict())
    db.add(novo_caso)
    db.commit()
    db.refresh(novo_caso)
    return novo_caso

@app.get("/api/casos")
def listar_casos(db: Session = Depends(get_db)):
    casos = db.query(models.CasoEpidemiologico).all()
    return casos

@app.delete("/api/casos/{caso_id}")
def deletar_caso(caso_id: int, db: Session = Depends(get_db)):
    caso = db.query(models.CasoEpidemiologico).filter(models.CasoEpidemiologico.id == caso_id).first()
    if caso:
        db.delete(caso)
        db.commit()
        return {"mensagem": f"Caso {caso_id} deletado com sucesso!"}
    return {"erro": "Caso não encontrado"}

# NOVA ROTA: Simula a Sincronização com DATASUS (UC5)
@app.post("/api/sincronizar")
def sincronizar_datasus(db: Session = Depends(get_db)):
    try:
        # Gera dados fictícios simulando uma API Externa
        bairros_novos = ["Lourdes", "Floresta", "Buritis"]
        for bairro in bairros_novos:
            novo_caso = models.CasoEpidemiologico(
                bairro=bairro,
                doenca="Dengue",
                casos_registrados=random.randint(10, 80),
                risco="Em análise"
            )
            db.add(novo_caso)
        db.commit()
        return {"mensagem": "Sincronização com DATASUS concluída!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro 500: Falha na conexão com DATASUS")