const gasData = {
  Air: { cp: 1.005, cv: 0.718, k: 1.4 },
  Argon: { cp: 0.5203, cv: 0.3122, k: 1.667 },
  Butane: { cp: 1.7164, cv: 1.5734, k: 1.091 },
  "Carbon Dioxide": { cp: 0.846, cv: 0.657, k: 1.289 },
  "Carbon Monoxide": { cp: 1.04, cv: 0.744, k: 1.4 },
  Ethane: { cp: 1.7662, cv: 1.4897, k: 1.186 },
  Ethylene: { cp: 1.5482, cv: 1.2518, k: 1.237 },
  Helium: { cp: 5.1926, cv: 3.1156, k: 1.667 },
  Hydrogen: { cp: 14.307, cv: 10.183, k: 1.405 },
  Methane: { cp: 2.2537, cv: 1.7354, k: 1.299 },
  Neon: { cp: 1.0299, cv: 0.6179, k: 1.667 },
  Nitrogen: { cp: 1.039, cv: 0.743, k: 1.4 },
  Octane: { cp: 1.7113, cv: 1.6385, k: 1.044 },
  Oxygen: { cp: 0.918, cv: 0.658, k: 1.395 },
  Propane: { cp: 1.6794, cv: 1.4909, k: 1.126 },
  Steam: { cp: 1.8723, cv: 1.4108, k: 1.327 },
};

export function gasProperties() {
  return gasData;
}
