const gasData = {
  Nitrogen: { a: 28.9, b: -0.1571, c: 0.8081, d: -2.873 },
  Oxygen: { a: 25.48, b: 1.52, c: -0.7155, d: 1.312 },
  Air: { a: 28.11, b: 0.1967, c: 0.4802, d: -1.966 },
  Hydrogen: { a: 29.11, b: -0.1916, c: 0.4003, d: -0.8704 },
  "Carbon Monoxide": { a: 28.16, b: 0.1675, c: 0.5372, d: -2.222 },
  "Carbon Dioxide": { a: 22.26, b: 5.981, c: -3.501, d: 7.469 },
  "Water vapour": { a: 32.24, b: 0.1923, c: 1.055, d: -3.595 },
  "Nitric Oxide": { a: 29.34, b: -0.09395, c: 0.9747, d: -4.187 },
  "Nitrous Oxide": { a: 24.11, b: 5.8632, c: -3.562, d: 10.58 },
  "Nitrogen Dioxide": { a: 22.9, b: 5.715, c: -3.52, d: 7.87 },
  Ammonia: { a: 27.568, b: 2.563, c: 0.99072, d: -6.6909 },
  Sulfur: { a: 27.21, b: 2.218, c: -1.628, d: 3.986 },
  "Sulfur Dioxide": { a: 25.78, b: 5.795, c: -3.812, d: 8.612 },
  "Sulfur trioxide": { a: 16.4, b: 14.58, c: -11.2, d: 32.42 },
  Acetylene: { a: 21.8, b: 9.2143, c: -6.527, d: 18.21 },
  Benzene: { a: -36.22, b: 48.475, c: -31.57, d: 77.62 },
  Methanol: { a: 19.0, b: 9.152, c: -1.22, d: -8.039 },
  Ethanol: { a: 19.9, b: 20.96, c: -10.38, d: 20.05 },
  "Hydrogen Chloride": { a: 30.33, b: -0.762, c: 1.327, d: -4.338 },
  Methane: { a: 19.89, b: 5.024, c: 1.269, d: -11.01 },
  Ethane: { a: 6.9, b: 17.27, c: -6.406, d: 7.285 },
  Propane: { a: -4.04, b: 30.48, c: -15.72, d: 31.74 },
  "n-Butane": { a: 3.96, b: 37.15, c: -18.34, d: 35.0 },
  "i-Butane": { a: -7.913, b: 41.6, c: -23.01, d: 49.91 },
  "n-Pentane": { a: 6.774, b: 45.43, c: -22.46, d: 42.29 },
  "n-Hexane": { a: 6.938, b: 55.22, c: -28.65, d: 57.69 },
  Ethylene: { a: 3.95, b: 15.64, c: -8.344, d: 17.67 },
  Propylene: { a: 3.15, b: 23.83, c: -12.18, d: 24.62 },
};

export function getCpData(gasName) {
  const gas = gasData[gasName];
  if (!gas) return { a: 0, b: 0, c: 0, d: 0 };

  return {
    a: gas.a,
    b: gas.b * 1e-2,
    c: gas.c * 1e-5,
    d: gas.d * 1e-9,
  };
}
