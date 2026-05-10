# Plano de Testes - Dashboard Epidemiológico (TP4)

Este documento descreve os cenários de teste baseados nos Casos de Uso definidos no diagrama arquitetural do sistema (Sprint TP2). Cada caso de uso possui testes cobrindo o caminho feliz e cenários de exceção.

---

## 1. Caso de Uso: Visualizar Mapa de Calor e Gráficos

* **Caso de Teste 1.1 (Caminho Feliz): Carregamento inicial com sucesso.**
  * **Ação:** O Cidadão/Gestor acessa a página inicial do Dashboard.
  * **Resultado Esperado:** O sistema deve renderizar o mapa e os gráficos de linha na tela em até 3 segundos, exibindo os dados consolidados do mês atual.
* **Caso de Teste 1.2 (Exceção): Falha na comunicação com a API.**
  * **Ação:** O usuário acessa o Dashboard, mas o backend (API) está fora do ar.
  * **Resultado Esperado:** A interface não deve "quebrar". O sistema deve exibir uma mensagem amigável: "Não foi possível carregar os dados no momento. Tente novamente mais tarde."
* **Caso de Teste 1.3 (Exceção): Banco de dados vazio.**
  * **Ação:** O usuário acessa o Dashboard num período onde a base de dados ainda não possui nenhum caso de doença cadastrado.
  * **Resultado Esperado:** Os gráficos devem renderizar vazios com a mensagem "Nenhum caso registrado no período".

---

## 2. Caso de Uso: Filtrar Dados Epidemiológicos (e Validar Período)

* **Caso de Teste 2.1 (Caminho Feliz): Filtro válido por intervalo de datas e doença.**
  * **Ação:** O usuário seleciona a doença "Dengue", insere Data Inicial "01/01/2024", Data Final "31/01/2024" e clica em Filtrar.
  * **Resultado Esperado:** O dashboard deve recarregar apenas com os casos de Dengue registrados no mês de janeiro de 2024.
* **Caso de Teste 2.2 (Exceção/Validação): Data final anterior à data inicial.**
  * **Ação:** O usuário preenche Data Inicial "15/02/2024" e Data Final "10/02/2024".
  * **Resultado Esperado:** O sistema deve impedir a busca, destacando o campo de data em vermelho e exibindo o erro: "A data final deve ser posterior à data inicial".
* **Caso de Teste 2.3 (Sem dados): Filtro de região sem ocorrências.**
  * **Ação:** O usuário filtra os dados por um bairro que não possui registros da doença selecionada.
  * **Resultado Esperado:** O sistema processa o filtro com sucesso e atualiza a tela informando "0 casos encontrados para este filtro".

---

## 3. Caso de Uso: Exportar Relatório CSV/PDF

* **Caso de Teste 3.1 (Caminho Feliz): Exportação de PDF com sucesso.**
  * **Ação:** Com os dados carregados na tela, o usuário clica no botão "Exportar PDF".
  * **Resultado Esperado:** O navegador deve iniciar o download de um arquivo `.pdf` contendo um resumo visual (print) do dashboard atual.
* **Caso de Teste 3.2 (Caminho Feliz): Exportação de CSV com sucesso.**
  * **Ação:** Com os dados carregados na tela, o usuário clica no botão "Exportar CSV".
  * **Resultado Esperado:** O navegador deve iniciar o download de um arquivo `.csv` contendo as linhas de dados brutos correspondentes ao filtro atual da tela.
* **Caso de Teste 3.3 (Exceção): Tentativa de exportação sem dados na tela.**
  * **Ação:** O usuário aplica um filtro que retorna "0 casos" e clica em "Exportar CSV".
  * **Resultado Esperado:** O botão de exportação deve estar desabilitado ou o sistema deve exibir um aviso: "Não há dados para exportar".

---

## 4. Caso de Uso: Configurar Alerta de Surto

* **Caso de Teste 4.1 (Caminho Feliz): Configuração de limite válido.**
  * **Ação:** O Gestor de Saúde acessa as configurações e define o "Limite Crítico" para 50 casos/semana e clica em Salvar.
  * **Resultado Esperado:** O sistema salva a configuração e exibe a mensagem de sucesso. Regiões com mais de 50 casos passam a ser destacadas em vermelho no mapa.
* **Caso de Teste 4.2 (Exceção): Inserção de valor negativo ou inválido.**
  * **Ação:** O Gestor tenta configurar o limite de casos com o valor "-10" ou letras ("abc").
  * **Resultado Esperado:** O sistema impede o salvamento e exibe o erro: "Insira um valor numérico válido e maior que zero."
* **Caso de Teste 4.3 (Exceção): Submissão com formulário em branco.**
  * **Ação:** O Gestor apaga o valor do limite crítico e tenta salvar.
  * **Resultado Esperado:** O sistema bloqueia a ação exigindo o preenchimento obrigatório do campo.

---

## 5. Caso de Uso: Sincronizar Base de Dados

* **Caso de Teste 5.1 (Caminho Feliz): Sincronização automática via API.**
  * **Ação:** A rotina do sistema (Backend) dispara a consulta à API Externa (DATASUS) no horário programado.
  * **Resultado Esperado:** Os novos casos são inseridos no banco de dados local com sucesso sem duplicar registros antigos.
* **Caso de Teste 5.2 (Exceção): Falha na conexão com a API Externa.**
  * **Ação:** O sistema tenta sincronizar, mas o servidor do DATASUS está fora do ar (Erro 500).
  * **Resultado Esperado:** O Backend registra a falha no log de erros do servidor e agenda uma nova tentativa, mantendo os dados antigos intactos para o usuário final.
* **Caso de Teste 5.3 (Exceção): Recebimento de dados corrompidos.**
  * **Ação:** A API Externa envia dados com o formato JSON quebrado ou sem campos obrigatórios (ex: sem o nome do bairro).
  * **Resultado Esperado:** O Backend deve rejeitar os registros inválidos, importar apenas os corretos e registrar um aviso no log do sistema.