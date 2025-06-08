/**
 *
 * @param round Rounding function to use, should take numbers to one of the two closest integers
 * @param amplitude Height of the sine wave in units (peak-to-peak amplitude)
 * @param resolution Number of samples used per wave period
 * @param index Sample being taken
 */
export function approxCos(
  round: (x: number) => number,
  amplitude: number,
  resolution: number,
  index: number,
) {
  const x = (index / resolution) * 2 * Math.PI;
  const y = (Math.cos(x) * amplitude) / 2;
  const approx = round(y);
  return { exact: y, approx, error: Math.abs(y - approx) };
}

export function errorCos(round: (x: number) => number, amplitude: number, resolution: number) {
  let maxError = 0;
  let totalError = 0;
  for (let i = 0; i < resolution; i++) {
    const { error } = approxCos(round, amplitude, resolution, i);
    maxError = Math.max(maxError, error);
    totalError += error;
  }

  return { maxError, avgError: totalError / resolution };
}
