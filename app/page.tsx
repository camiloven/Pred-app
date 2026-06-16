'use client';

import { useState } from 'react';

export default function Home() {
  const [matchId, setMatchId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchPrediction = async () => {
    if (!matchId) {
      alert('Ingresa un ID de partido');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/prediction?matchId=${matchId}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('Error al consultar la API');
    }
    setLoading(false);
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #1e3a8a, #0f172a)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ⚽ Predicciones Deportivas
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8' }}>Predicciones en tiempo real</p>
        </div>

        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          borderRadius: '1rem',
          padding: '2rem',
          border: '1px solid #334155',
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              placeholder="ID del partido (ej: 123456)"
              style={{
                flex: 1,
                backgroundColor: '#1e2937',
                border: '1px solid #475569',
                borderRadius: '0.75rem',
                padding: '1rem 1.5rem',
                fontSize: '1.1rem',
                color: 'white'
              }}
            />
            <button
              onClick={fetchPrediction}
              disabled={loading}
              style={{
                backgroundColor: loading ? '#475569' : '#2563eb',
                color: 'white',
                padding: '1rem 2.5rem',
                borderRadius: '0.75rem',
                fontWeight: '600',
                fontSize: '1.1rem',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Consultando...' : 'Obtener Predicción'}
            </button>
          </div>
        </div>

        {result && (
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid #334155'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>📊 Resultado</h2>
            <pre style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: '1rem',
              borderRadius: '0.75rem',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              maxHeight: '500px'
            }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
