# Documentação de Arquitetura - Dashboard Epidemiológico

Esta documentação descreve as decisões arquiteturais do projeto, modeladas utilizando o padrão C4 Model, em atendimento aos requisitos do Sprint TP2.

## 1. Escolhas de Tecnologias
Para o desenvolvimento deste projeto, adotou-se uma arquitetura moderna dividida entre cliente (Frontend) e servidor (Backend), utilizando as seguintes tecnologias:

* **Frontend (React.js):** Escolhido pela sua arquitetura baseada em componentes, o que facilita a criação de interfaces interativas e a integração com bibliotecas de visualização de dados (gráficos e mapas).
* **Backend (Python + FastAPI):** O FastAPI foi selecionado por ser um framework moderno, de alta performance e nativamente assíncrono. O Python possui o melhor ecossistema para manipulação de dados (Pandas, NumPy), o que é ideal para processar as informações epidemiológicas antes de enviá-las ao frontend.
* **Banco de Dados (SQLite / PostgreSQL):** Utilizado para armazenar o histórico de casos de dengue consolidados, permitindo consultas e filtros rápidos pela API.

## 2. Justificativa do Modelo Arquitetural
O modelo arquitetural escolhido foi o **Cliente-Servidor (Client-Server)** com comunicação via **API RESTful**. 
A justificativa para essa escolha baseia-se na *separação de responsabilidades (Separation of Concerns)*:
* O **Frontend (Single Page Application)** fica responsável exclusivamente por renderizar a interface de usuário, mapas e gráficos, consumindo menos recursos do servidor.
* O **Backend** atua como uma camada de segurança e processamento, sendo o único responsável por se conectar ao banco de dados e consumir APIs públicas (ex: DATASUS), entregando os dados já limpos e formatados em JSON para o cliente.
Isso garante que o sistema seja escalável e que a interface seja fluida para o usuário final.

## 3. C4 Model - Diagrama de Contexto (Nível 1)
O diagrama abaixo ilustra o sistema como uma caixa preta, focando em quem o utiliza e com quais sistemas externos ele se comunica.

*(Insira a imagem do Nível 1 aqui: `![Contexto](./contexto.png)`)*

## 4. C4 Model - Diagrama de Container (Nível 2)
O diagrama abaixo detalha os contêineres internos que compõem o sistema de Dashboard, mostrando a separação entre a aplicação Web, a API e o Banco de Dados.

*(Insira a imagem do Nível 2 aqui: `![Container](./container.png)`)*
