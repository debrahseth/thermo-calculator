const gasData = {
  Methane: { Tc: 190.56, Pc: 4599.2, M: 16.04, w: 0.0115, Vc: 0.09836 },
  Ethane: { Tc: 305.23, Pc: 4872, M: 30.07, w: 0.0995, Vc: 0.1455 },
  Propane: { Tc: 369.83, Pc: 4260, M: 44.1, w: 0.1523, Vc: 0.1998 },
  Pentane: { Tc: 469.7, Pc: 3370, M: 72.15, w: 0.251, Vc: 0.304 },
  CarbonDioxide: { Tc: 304.12, Pc: 7380, M: 44.01, w: 0.2239, Vc: 0.0943 },
  Ethylene: { Tc: 282.35, Pc: 5040, M: 28.052, w: 0.087, Vc: 0.1242 },
  Air: { Tc: 132.5, Pc: 3770, M: 28.97, w: 0.0335, Vc: 0.0883 },
  Ammonia: { Tc: 405.5, Pc: 1128, M: 17.03, w: 0.256, Vc: 0.0724 },
  Argon: { Tc: 151, Pc: 4860, M: 39.948, w: 0.001, Vc: 0.0749 },
  Benzene: { Tc: 562, Pc: 4920, M: 78.115, w: 0.212, Vc: 0.2603 },
  Butane: { Tc: 425.2, Pc: 3800, M: 58.124, w: 0.2, Vc: 0.2547 },
  CarbonMonoxide: { Tc: 133, Pc: 3500, M: 28.011, w: 0.0497, Vc: 0.093 },
  "Ethyl Alcohol": { Tc: 516, Pc: 6380, M: 46.07, w: 0.644, Vc: 0.1673 },
  Helium: { Tc: 5.3, Pc: 230, M: 4.003, w: -0.3835, Vc: 0.0578 },
  Hexane: { Tc: 507.9, Pc: 3030, M: 86.179, w: 0.3, Vc: 0.3677 },
  Hydrogen: { Tc: 33.3, Pc: 1300, M: 2.016, w: -0.219, Vc: 0.0649 },
  "Methyl Alcohol": { Tc: 513.2, Pc: 7950, M: 32.042, w: 0.556, Vc: 0.118 },
  Nitrogen: { Tc: 126.2, Pc: 3390, M: 28.013, w: 0.04, Vc: 0.0899 },
  Oxygen: { Tc: 154.8, Pc: 5080, M: 31.999, w: 0.022, Vc: 0.078 },
  Propylene: { Tc: 365, Pc: 4620, M: 42.081, w: 0.144, Vc: 0.181 },
  Water: { Tc: 647.1, Pc: 22060, M: 18.015, w: 0.344, Vc: 0.056 },
  Cyclohexane: { Tc: 553.64, Pc: 4070, M: 84.16, w: 0.212, Vc: 0.308 },
  Acetone: { Tc: 508.1, Pc: 4760, M: 58.08, w: 0.304, Vc: 0.209 },
};

export function getGasProperties(gasName) {
  const props = gasData[gasName];
  if (!props) {
    throw new Error(`Gas ${gasName} not found in database.`);
  }
  return props;
}

export function getAllGasData() {
  return gasData;
}
