import { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function App() {
  const [casos, setCasos] = useState([])

  // Busca os dados do banco de dados real via API
  useEffect(() => {
    axios.get('http://localhost:8000/api/casos')
      .then(response => {
        setCasos(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar os dados da API:", error)
      })
  }, [])

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#08427b', textAlign: 'center' }}>📊 Dashboard Epidemiológico (ODS 3)</h1>
      <hr style={{ marginBottom: '30px' }} />
      
      <h2>Monitoramento de Casos por Região</h2>
      
      {casos.length === 0 ? (
        <p>Carregando dados do banco de dados...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Sessão do Gráfico */}
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ textAlign: 'center', color: '#333' }}>Casos de Doenças Registrados</h3>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={casos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bairro" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* A barra do gráfico puxa a quantidade de casos do banco */}
                  <Bar dataKey="casos_registrados" name="Quantidade de Casos" fill="#438dd5" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sessão da Lista Detalhada */}
          <div>
            <h3>Detalhes Brutos</h3>
            <ul style={{ fontSize: '18px', lineHeight: '1.8' }}>
              {casos.map(caso => (
                <li key={caso.id}>
                  <strong>{caso.bairro}:</strong> {caso.casos_registrados} registros de {caso.doenca} 
                  <span style={{ 
                    marginLeft: '10px', 
                    fontWeight: 'bold',
                    color: caso.risco === 'Alto' ? 'red' : caso.risco === 'Médio' ? 'orange' : 'green' 
                  }}>
                    (Risco {caso.risco})
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  )
}

export default App