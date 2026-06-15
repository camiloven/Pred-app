export function calculatePowerRating(elo: number, xgDiff: number, availability: number, context: number) {
  return elo * 0.3 + xgDiff * 0.4 + availability * 0.2 + context * 0.1;
}
export function powerRatingToExpectedGoals(pr: number) {
  return Math.max(0, (pr - 5) * 0.3 + 1.5);
}
export function monteCarloSimulation(lambdaH: number, lambdaA: number, sims = 1000) {
  let h = 0, d = 0, a = 0;
  for (let i = 0; i < sims; i++) {
    const gh = samplePoisson(lambdaH), ga = samplePoisson(lambdaA);
    if (gh > ga) h++; else if (gh === ga) d++; else a++;
  }
  return { home: h / sims, draw: d / sims, away: a / sims };
}
function samplePoisson(lambda: number) {
  let L = Math.exp(-lambda), k = 0, p = 1;
  do { k++; p *= Math.random(); } while (p > L);
  return k - 1;
}
