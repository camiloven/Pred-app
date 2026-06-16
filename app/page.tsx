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
          <p className="text-xl text-slate-400">Predicciones en tiempo real de partidos</p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 shadow-xl mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              placeholder="ID del partido (ej: 123456)"
              className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={fetchPrediction}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 px-10 py-4 rounded-xl font-semibold text-lg transition-all active:scale-95"
            >
              {loading ? 'Consultando...' : 'Obtener Predicción'}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Usa un matchId válido
          </p>
        </div>

        {result && (
          <div className="bg-slate-900/70 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
            {result.ok && result.data ? (
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  📊 Resultado
                </h2>
                <pre className="bg-black/50 p-4 rounded-xl text-sm overflow-auto max-h-96">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-red-400 text-center py-8">No se pudo obtener la información</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
