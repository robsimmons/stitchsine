import { useState } from 'react';
import { approxCos, errorCos } from './cosine-approx';

function App() {
  const [resolution, setResolution] = useState(16);
  const [amplitude, setAmplitude] = useState(6);
  return (
    <>
      {' '}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -10 1200 400">
        {Array.from({ length: 1000 }).map((_, i) => {
          const { exact } = approxCos(Math.round, amplitude, resolution, i / 10);
          return <circle cx={i + 5} cy={(exact + amplitude / 2) * 10 - 6} r={1} />;
        })}
        {Array.from({ length: 99 }).map((_, i) => {
          const x = i * 10 + 5;

          const { exact, approx } = approxCos(Math.round, amplitude, resolution, i);
          const y = (approx + amplitude / 2) * 10;

          return (
            <>
              {Array.from({ length: 7 }).map((_, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={x}
                  x2={x}
                  y1={y + 20 * j}
                  y2={y + 20 * j + 10}
                  stroke="black"
                  stroke-width="1"
                />
              ))}
            </>
          );
        })}
      </svg>
      <br />
      <table>
        <tr>
          <td>Wave Period &gt;&gt;</td>
          {Array.from({ length: 100 }).map((_, r) => {
            return <td>{(r + 1) * 2}</td>;
          })}
        </tr>
        <tr>
          <td>Amplitude vv</td>
        </tr>
        {Array.from({ length: 20 }).map((_, a) => {
          const currAmplitude = (a + 1) * 2;
          return (
            <tr>
              <td>{currAmplitude}</td>
              {Array.from({ length: 100 }).map((_, r) => {
                const currResolution = (r + 1) * 2;
                const { maxError, avgError } = errorCos(Math.round, currAmplitude, currResolution);
                return (
                  <td
                    onClick={() => {
                      setAmplitude(currAmplitude);
                      setResolution(currResolution);
                    }}
                    style={{
                      border:
                        currAmplitude === amplitude && currResolution === resolution
                          ? `2px solid black`
                          : '0',
                      color: `oklch(${Math.min(avgError * avgError * 5, 1)} 0 0)`, //`rgb(0% ${100 - Math.sqrt(avgError) * 100}% 0%)`,
                      background: `oklch(.71 ${Math.min(0.5 - maxError, 0.25)} 325)`,
                    }}>
                    max: {Math.floor(maxError * 1000) / 1000}
                    <br />
                    avg: {Math.floor(avgError * 1000) / 1000}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
      <svg style={{ height: 100 }} xmlns="http://www.w3.org/2000/svg" viewBox="-200 0 520 512">
        <path d="M0 192C0 103.6 71.6 32 160 32s160 71.6 160 160l0 128c0 88.4-71.6 160-160 160S0 408.4 0 320L0 192zM160 96c-53 0-96 43-96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96z" />
        <line x1="0" x2="500" y1="0" y2="500" stroke="orange" stroke-width="5" />
      </svg>
      <br />
    </>
  );
}

export default App;
