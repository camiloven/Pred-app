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
      padding: '24px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px', paddingTop: '32px' }}>
          <h1 style={{ 
            fontSize: '2.8rem', 
            fontWeight: '700',
            background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ⚽ Predicciones Deportivas
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8' }}>Predicciones en tiempo real</p>
        </div>

        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #334155',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              placeholder="ID del partido (ej: 123456)"
              style={{
                flex: 1,
                backgroundColor: '#1e2937',
                border: '1px solid #475569',
                borderRadius: '12px',
                padding: '16px 20px',
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
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1.1rem'
              }}
            >
              {loading ? 'Consultando...' : 'Obtener Predicción'}
            </button>
          </div>
        </div>

        {result && (
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #334155'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>📊 Resultado</h2>
            <pre style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '20px',
              borderRadius: '12px',
              overflow: 'auto',
              maxHeight: '500px',
              whiteSpace: 'pre-wrap'
            }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
