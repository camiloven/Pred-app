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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ⚽ Predicciones Deportivas
          </h1>
          <p className="text-xl text-slate-400">Predicciones en tiempo real</p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 shadow-xl mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              placeholder="ID del partido (ej: 123456)"
              className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={fetchPrediction}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 px-10 py-4 rounded-xl font-semibold text-lg"
            >
              {loading ? 'Consultando...' : 'Obtener Predicción'}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-slate-900/70 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4">📊 Resultado</h2>
            <pre className="bg-black/50 p-4 rounded-xl text-sm overflow-auto whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
