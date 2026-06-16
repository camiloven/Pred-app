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
      alert('Error al consultar');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto text-center pt-10">
        <h1 className="text-4xl font-bold mb-2">⚽ Predicciones Deportivas</h1>
        <p className="text-lg mb-10 text-slate-300">Ingresa el ID del partido</p>

        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={matchId}
            onChange={(e) => setMatchId(e.target.value)}
            placeholder="ID del partido"
            className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-5 py-4 text-lg"
          />
          <button
            onClick={fetchPrediction}
            disabled={loading}
            className="bg-blue-600 px-8 py-4 rounded-xl font-medium disabled:opacity-50"
          >
            {loading ? '...' : 'Buscar'}
          </button>
        </div>

        {result && (
          <div className="mt-10 bg-slate-900 p-6 rounded-2xl text-left">
            <pre className="text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
// Actualizado para nuevo deploy
