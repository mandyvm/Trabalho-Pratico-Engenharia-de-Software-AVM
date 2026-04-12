# Dashboard Epidemiológico - ODS 3 (Saúde e Bem-Estar)

Trabalho prático da disciplina de Engenharia de Software. Este projeto propõe uma solução de software focada no Objetivo de Desenvolvimento Sustentável (ODS) 3 da ONU, utilizando práticas de gerenciamento ágil (Scrum).

## 1. Definição do Problema e Objetivo
* **ODS Escolhido:** ODS 3 - Saúde e Bem-Estar.
* **O Problema:** Durante períodos de surto de doenças endêmicas (como a Dengue), a população e os gestores de saúde municipais enfrentam dificuldades para identificar rapidamente os "pontos quentes" (bairros com maior incidência) e a evolução temporal dos casos. A falta de visualização clara e em tempo real dificulta o direcionamento de recursos e campanhas de conscientização.
* **Objetivo:** Desenvolver uma ferramenta visual (dashboard) que centralize e facilite a interpretação de dados epidemiológicos locais, auxiliando na rápida tomada de decisão e na transparência para o cidadão.

## 2. Tipo de Solução e Justificativa
* **Solução:** Uma Aplicação Web (Dashboard de Dados) com Frontend e Backend separados.
* **Justificativa:** A solução em formato de dashboard foi escolhida porque gráficos e mapas de calor são a maneira mais eficiente de traduzir grandes volumes de dados de saúde pública em informações acionáveis. 
* **Arquitetura Técnica:**
  * O **Backend (Python + FastAPI)** será responsável por expor uma API REST que consulta, filtra e processa os dados epidemiológicos.
  * O **Frontend (React)** consumirá essa API para montar a interface interativa e renderizar os gráficos, garantindo uma arquitetura robusta e distribuída.

## 3. Requisitos do Sistema

### Requisitos Funcionais (RF)
* **RF01:** O sistema deve apresentar um mapa de calor (heatmap) indicando a concentração de casos relatados por bairro ou região.
* **RF02:** O sistema deve exibir um gráfico de linhas mostrando a evolução temporal dos casos.
* **RF03:** O usuário deve ser capaz de filtrar os dados do dashboard por tipo de agravo (ex: Dengue, Zika) e por intervalo de datas.
* **RF04:** O sistema deve destacar um "Alerta Crítico" visual se os casos em uma determinada região ultrapassarem um limite pré-estabelecido.
* **RF05:** O sistema deve permitir a exportação do resumo dos dados filtrados em formato PDF ou CSV.

### Requisitos Não Funcionais (RNF)
* **RNF01:** A interface web deve ser responsiva, garantindo boa usabilidade em monitores desktop e dispositivos móveis.
* **RNF02:** O tempo de resposta da API para a filtragem de dados não deve ultrapassar 2 segundos.
* **RNF03:** O backend deve ser desenvolvido utilizando os princípios de uma API RESTful.
* **RNF04:** O código-fonte deve ser gerenciado via Git, seguindo o fluxo de commits e branches.

## 4. Diagrama de Casos de Uso

![Diagrama de Casos de Uso](./docs/diagrama_casos_de_uso.png)

* **Atores:** * **Usuário (Cidadão / Gestor de Saúde):** Consome e filtra as informações.
  * **Sistema Fonte de Dados:** Alimenta o banco de dados via API.
