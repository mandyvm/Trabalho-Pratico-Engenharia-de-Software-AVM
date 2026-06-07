import { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

function App() {
  const [casos, setCasos] = useState([])
  const [filtroBairro, setFiltroBairro] = useState('')
  const [limiteCritico, setLimiteCritico] = useState(50)
  const [inputLimite, setInputLimite] = useState(50)

  const carregarDados = () => {
    axios.get('http://localhost:8000/api/casos')
      .then(res => setCasos(res.data))
      .catch(err => alert("Erro ao carregar dados. Tente novamente mais tarde."));
  }

  useEffect(() => {
    carregarDados();
  }, [])

  const casosFiltrados = filtroBairro
    ? casos.filter(caso => caso.bairro.toLowerCase().includes(filtroBairro.toLowerCase()))
    : casos;

  // Função UC3: Exportar CSV
  const exportarCSV = () => {
    if (casosFiltrados.length === 0) {
      alert("Não há dados para exportar");
      return;
    }
    const cabecalho = "Bairro,Doenca,Casos,Risco\n";
    const linhas = casosFiltrados.map(c => `${c.bairro},${c.doenca},${c.casos_registrados},${c.risco}`).join("\n");
    const blob = new Blob([cabecalho + linhas], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_epidemiologico.csv';
    a.click();
  }

  // Função UC4: Configurar Alerta
  const salvarLimite = () => {
    if (!inputLimite || inputLimite <= 0 || isNaN(inputLimite)) {
      alert("Insira um valor numérico válido e maior que zero.");
      return;
    }
    setLimiteCritico(Number(inputLimite));
    alert("Configuração salva! Regiões acima do limite ficarão em vermelho.");
  }

  // Função UC5: Sincronizar
  const sincronizar = () => {
    axios.post('http://localhost:8000/api/sincronizar')
      .then(res => {
        alert(res.data.mensagem);
        carregarDados();
      })
      .catch(err => alert("Erro 500: Falha na conexão com DATASUS"));
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#08427b', textAlign: 'center' }}>📊 Dashboard Epidemiológico</h1>
      
      {/* Barra de Ferramentas: Filtro, Exportar, Sync */}
      <div style={{ display: 'flex', gap: '10px', backgroundColor: '#e9ecef', padding: '15px', borderRadius: '8px', flexWrap: 'wrap' }}>
        <input 
          type="text" placeholder="Filtrar por Bairro..." 
          value={filtroBairro} onChange={(e) => setFiltroBairro(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
        />
        <button onClick={exportarCSV} style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>Exportar CSV</button>
        <button onClick={() => window.print()} style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}>Exportar PDF</button>
        <button onClick={sincronizar} style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '4px' }}>Sincronizar DATASUS</button>
      </div>

      {/* Painel de Alerta (UC4) */}
      <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <strong>Configurar Alerta de Surto:</strong>
        <input 
          type="number" value={inputLimite} onChange={(e) => setInputLimite(e.target.value)}
          style={{ padding: '5px', width: '80px' }}
        />
        <span>casos</span>
        <button onClick={salvarLimite} style={{ cursor: 'pointer', padding: '5px 10px' }}>Salvar</button>
      </div>

      {casosFiltrados.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>Nenhum caso encontrado para este filtro.</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <div style={{ width: '100%', height: 400, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
            <ResponsiveContainer>
              <BarChart data={casosFiltrados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bairro" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="casos_registrados" name="Quantidade de Casos">
                  {casosFiltrados.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.casos_registrados >= limiteCritico ? '#dc3545' : '#438dd5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default App