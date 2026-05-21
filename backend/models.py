from sqlalchemy import Column, Integer, String
from database import Base

class CasoEpidemiologico(Base):
    __tablename__ = "casos"

    id = Column(Integer, primary_key=True, index=True)
    bairro = Column(String, index=True)
    doenca = Column(String)
    casos_registrados = Column(Integer)
    risco = Column(String)