# Plano de Testes e Resultados - Dashboard Epidemiológico (TP5)

Este documento descreve os cenários de teste baseados nos Casos de Uso definidos no diagrama arquitetural do sistema. Todos os testes foram executados e validados durante o Sprint TP5.

---

## 1. Caso de Uso: Visualizar Mapa de Calor e Gráficos

* **Caso de Teste 1.1 (Caminho Feliz): Carregamento inicial com sucesso.**
  * **Ação:** O Gestor acessa a página inicial do Dashboard.
  * **Resultado Esperado:** O sistema deve renderizar os gráficos exibindo os dados consolidados do banco de dados.
  * **Resultado Obtido (TP5): PASSOU ✅.** O gráfico de barras foi renderizado com sucesso, consumindo dados reais do banco SQLite via FastAPI.

* **Caso de Teste 1.2 (Exceção): Falha na comunicação com a API.**
  * **Ação:** O usuário acessa o Dashboard, mas o backend (API) está desligado ou fora do ar.
  * **Resultado Esperado:** A interface não deve "quebrar", exibindo uma mensagem amigável de erro.
  * **Resultado Obtido (TP5): PASSOU ✅.** O sistema interceptou a falha e exibiu o alerta: "Erro ao carregar dados. Tente novamente mais tarde."

* **Caso de Teste 1.3 (Exceção): Banco de dados vazio.**
  * **Ação:** O usuário acessa o Dashboard com o banco de dados limpo.
  * **Resultado Esperado:** Os gráficos não devem quebrar e devem informar a ausência de dados.
  * **Resultado Obtido (TP5): PASSOU ✅.** O sistema processa a lista vazia com sucesso e exibe a mensagem "Nenhum caso encontrado para este filtro".

---

## 2. Caso de Uso: Filtrar Dados Epidemiológicos

* **Caso de Teste 2.1 (Caminho Feliz): Filtro válido por região (Bairro).**
  * **Ação:** O usuário digita "Centro" na barra de filtros.
  * **Resultado Esperado:** O dashboard deve recarregar em tempo real apenas com os casos correspondentes.
  * **Resultado Obtido (TP5): PASSOU ✅.** A busca reativa atualizou o gráfico e a lista de detalhes instantaneamente na tela.

* **Caso de Teste 2.2 (Exceção): Filtro de região sem ocorrências.**
  * **Ação:** O usuário filtra os dados por um bairro que não possui registros (Ex: "Bairro Inexistente").
  * **Resultado Esperado:** O sistema processa o filtro e atualiza a tela informando ausência de dados.
  * **Resultado Obtido (TP5): PASSOU ✅.** O sistema ocultou o gráfico e exibiu o aviso em vermelho: "Nenhum caso encontrado para este filtro".

* **Caso de Teste 2.3 (Caminho Alternativo): Limpeza do filtro.**
  * **Ação:** O usuário apaga o texto digitado na barra de busca.
  * **Resultado Esperado:** O sistema deve voltar a exibir todos os dados gerais.
  * **Resultado Obtido (TP5): PASSOU ✅.** A remoção do texto restaurou a visualização completa de todos os bairros no gráfico.

---

## 3. Caso de Uso: Exportar Relatório CSV/PDF

* **Caso de Teste 3.1 (Caminho Feliz): Exportação de PDF com sucesso.**
  * **Ação:** O usuário clica no botão "Exportar PDF".
  * **Resultado Esperado:** O sistema deve preparar um arquivo visual do dashboard para impressão/salvamento em PDF.
  * **Resultado Obtido (TP5): PASSOU ✅.** A função nativa de impressão do navegador foi acionada corretamente focando no relatório.

* **Caso de Teste 3.2 (Caminho Feliz): Exportação de CSV com sucesso.**
  * **Ação:** O usuário clica no botão "Exportar CSV".
  * **Resultado Esperado:** O navegador deve iniciar o download de um arquivo `.csv` contendo os dados brutos filtrados.
  * **Resultado Obtido (TP5): PASSOU ✅.** O arquivo `relatorio_epidemiologico.csv` foi gerado e baixado com as colunas corretas.

* **Caso de Teste 3.3 (Exceção): Tentativa de exportação sem dados na tela.**
  * **Ação:** O usuário aplica um filtro que não retorna casos e clica em "Exportar CSV".
  * **Resultado Esperado:** O sistema deve impedir o download e avisar o usuário.
  * **Resultado Obtido (TP5): PASSOU ✅.** A ação foi bloqueada e o sistema exibiu o alerta de erro: "Não há dados para exportar".

---

## 4. Caso de Uso: Configurar Alerta de Surto

* **Caso de Teste 4.1 (Caminho Feliz): Configuração de limite válido.**
  * **Ação:** O Gestor define o "Limite Crítico" para 10 casos e clica em Salvar.
  * **Resultado Esperado:** Regiões com quantidade maior ou igual ao limite passam a ser destacadas em vermelho.
  * **Resultado Obtido (TP5): PASSOU ✅.** O limite foi salvo e as barras do gráfico atualizaram dinamicamente suas cores com base na nova regra.

* **Caso de Teste 4.2 (Exceção): Inserção de valor negativo ou inválido.**
  * **Ação:** O Gestor tenta configurar o limite de casos com um valor negativo (Ex: "-5").
  * **Resultado Esperado:** O sistema impede o salvamento e exibe um erro.
  * **Resultado Obtido (TP5): PASSOU ✅.** O sistema bloqueou a ação com o alerta: "Insira um valor numérico válido e maior que zero."

* **Caso de Teste 4.3 (Exceção): Submissão com formulário em branco.**
  * **Ação:** O Gestor apaga o valor da caixa de texto e tenta salvar.
  * **Resultado Esperado:** O sistema bloqueia a ação exigindo o preenchimento.
  * **Resultado Obtido (TP5): PASSOU ✅.** O mesmo bloqueio de validação de campo vazio foi acionado com sucesso.

---

## 5. Caso de Uso: Sincronizar Base de Dados

* **Caso de Teste 5.1 (Caminho Feliz): Sincronização via API.**
  * **Ação:** O usuário aciona o botão "Sincronizar DATASUS" para buscar novos dados externos.
  * **Resultado Esperado:** Os novos casos são inseridos no banco de dados e o gráfico é atualizado.
  * **Resultado Obtido (TP5): PASSOU ✅.** A API simulou a inserção de novos casos de doenças de outras regiões e o gráfico reagiu imediatamente aos novos registros.

* **Caso de Teste 5.2 (Exceção): Falha na conexão com a API Externa.**
  * **Ação:** O sistema tenta sincronizar, mas o servidor externo está fora do ar.
  * **Resultado Esperado:** O sistema deve manter a estabilidade e exibir uma mensagem de erro de conexão.
  * **Resultado Obtido (TP5): PASSOU ✅.** Ao forçar uma falha de rota no backend, o frontend interceptou o problema e exibiu: "Erro 500: Falha na conexão com DATASUS".
