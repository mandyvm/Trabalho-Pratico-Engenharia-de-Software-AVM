import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [casos, setCasos] = useState([])

  useEffect(() => {
    // Aqui o React está "ligando" para o seu Python!
    axios.get('http://localhost:8000/api/casos')
      .then(response => {
        setCasos(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar os dados da API:", error)
      })
  }, [])

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#08427b' }}>📊 Dashboard Epidemiológico (ODS 3)</h1>
      <hr />
      <h2>Monitoramento de Casos por Região</h2>
      
      <div style={{ marginTop: '20px' }}>
        {casos.length === 0 ? (
          <p>Carregando dados do servidor...</p>
        ) : (
          <ul style={{ fontSize: '18px', lineHeight: '1.6' }}>
            {casos.map(caso => (
              <li key={caso.id}>
                <strong>{caso.bairro}:</strong> {caso.casos} registros 
                <span style={{ 
                  marginLeft: '10px', 
                  color: caso.risco === 'Crítico' ? 'red' : caso.risco === 'Alto' ? 'orange' : 'green' 
                }}>
                  (Risco {caso.risco})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App