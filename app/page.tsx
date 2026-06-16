'use client';

import { useState } from 'react';

export default function Home() {
  const [matchId, setMatchId] = useState('');
  const [result, setResult] = useState(null);
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
    } catch (e) {
      alert('Error al consultar la API');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', minHeight: '100vh', background: '#0f172a', color: 'white' }}>
      <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '30px' }}>⚽ Predicciones Deportivas</h1>
      
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <input
          type="text"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          placeholder="ID del partido"
          style={{ width: '100%', padding: '15px', fontSize: '18px', marginBottom: '10px', borderRadius: '8px' }}
        />
        <button 
          onClick={fetchPrediction}
          disabled={loading}
          style={{ width: '100%', padding: '15px', background: '#3b82f6', color: 'white', fontSize: '18px', borderRadius: '8px' }}
        >
          {loading ? 'Cargando...' : 'Obtener Predicción'}
        </button>

        {result && (
          <pre style={{ marginTop: '30px', background: '#1e2937', padding: '15px', borderRadius: '8px', overflow: 'auto' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
