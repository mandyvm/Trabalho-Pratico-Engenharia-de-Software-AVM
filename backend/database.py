from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Cria um arquivo de banco de dados chamado 'banco_dados.db' na sua pasta
SQLALCHEMY_DATABASE_URL = "sqlite:///./banco_dados.db"

# Motor de conexão com o SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Função para abrir a conexão e fechar automaticamente após o uso
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()