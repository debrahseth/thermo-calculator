import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [eos, setEos] = useState("");
  const [mixtureEos, setMixtureEos] = useState("");
  const [calculation, setCalculation] = useState("");
  const [numComponents, setNumComponents] = useState(2);
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const gases = [
    "Methane",
    "Ethane",
    "Propane",
    "Pentane",
    "CarbonDioxide",
    "Ethylene",
    "Air",
    "Ammonia",
    "Argon",
    "Benzene",
    "Butane",
    "CarbonMonoxide",
    "Ethyl Alcohol",
    "Helium",
    "Hexane",
    "Hydrogen",
    "Methyl Alcohol",
    "Nitrogen",
    "Oxygen",
    "Propylene",
    "Water",
    "Cyclohexane",
    "Acetone",
  ];

  const getGasProperties = (gas) => {
    const properties = {
      Methane: {
        Tc: 190.56,
        Pc: 4599.2,
        Vc: 0.09836,
        M: 16.04,
        w: 0.0115,
        R: 0.5183,
      },
      Ethane: {
        Tc: 305.23,
        Pc: 4872,
        Vc: 0.1455,
        M: 30.07,
        w: 0.0995,
        R: 0.2765,
      },
      Propane: {
        Tc: 369.83,
        Pc: 4260,
        Vc: 0.1998,
        M: 44.1,
        w: 0.1523,
        R: 0.1885,
      },
      Pentane: {
        Tc: 469.7,
        Pc: 3370,
        Vc: 0.304,
        M: 72.15,
        w: 0.251,
        R: 0.1153,
      },
      CarbonDioxide: {
        Tc: 304.12,
        Pc: 7380,
        Vc: 0.0943,
        M: 44.01,
        w: 0.2239,
        R: 0.1889,
      },
      Ethylene: {
        Tc: 282.35,
        Pc: 5040,
        Vc: 0.1242,
        M: 28.052,
        w: 0.087,
        R: 0.2964,
      },
      Air: { Tc: 132.5, Pc: 3770, Vc: 0.0883, M: 28.97, w: 0.0335, R: 0.28698 },
      Ammonia: {
        Tc: 405.5,
        Pc: 1128,
        Vc: 0.0724,
        M: 17.03,
        w: 0.256,
        R: 0.4882,
      },
      Argon: { Tc: 151, Pc: 4860, Vc: 0.0749, M: 39.948, w: 0.001, R: 0.20812 },
      Benzene: {
        Tc: 562,
        Pc: 4920,
        Vc: 0.2603,
        M: 78.115,
        w: 0.212,
        R: 0.10643,
      },
      Butane: {
        Tc: 452.5,
        Pc: 3796,
        Vc: 0.2547,
        M: 58.124,
        w: 0.2,
        R: 0.14304,
      },
      CarbonMonoxide: {
        Tc: 133,
        Pc: 3500,
        Vc: 0.093,
        M: 28.011,
        w: 0.0497,
        R: 0.29681,
      },
      "Ethyl Alcohol": {
        Tc: 516,
        Pc: 6380,
        Vc: 0.1673,
        M: 46.07,
        w: 0.644,
        R: 0.18046,
      },
      Helium: { Tc: 5.3, Pc: 230, Vc: 0.0578, M: 4.003, w: -0.3835, R: 2.0769 },
      Hexane: {
        Tc: 507.9,
        Pc: 3030,
        Vc: 0.3677,
        M: 86.179,
        w: 0.3,
        R: 0.09647,
      },
      Hydrogen: {
        Tc: 33.3,
        Pc: 1300,
        Vc: 0.0649,
        M: 2.016,
        w: -0.219,
        R: 4.124,
      },
      "Methyl Alcohol": {
        Tc: 513.2,
        Pc: 7950,
        Vc: 0.118,
        M: 32.042,
        w: 0.556,
        R: 0.25947,
      },
      Nitrogen: {
        Tc: 126.2,
        Pc: 3390,
        Vc: 0.0899,
        M: 28.013,
        w: 0.04,
        R: 0.29679,
      },
      Oxygen: {
        Tc: 154.8,
        Pc: 5080,
        Vc: 0.078,
        M: 31.999,
        w: 0.022,
        R: 0.25982,
      },
      Propylene: {
        Tc: 365,
        Pc: 4620,
        Vc: 0.181,
        M: 42.081,
        w: 0.144,
        R: 0.19757,
      },
      Water: {
        Tc: 647.1,
        Pc: 22060,
        Vc: 0.056,
        M: 18.015,
        w: 0.344,
        R: 0.4615,
      },
      Cyclohexane: {
        Tc: 553.64,
        Pc: 4070,
        Vc: 0.308,
        M: 84.16,
        w: 0.212,
        R: 0.09879,
      },
      Acetone: {
        Tc: 508.1,
        Pc: 4760,
        Vc: 0.209,
        M: 58.08,
        w: 0.304,
        R: 0.14315,
      },
    };
    return properties[gas] || { Tc: 0, Pc: 0, Vc: 0, M: 0, w: 0 };
  };

  const solveCubic = (a, b, c, d) => {
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q =
      (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    const delta = (q * q) / 4 + (p * p * p) / 27;
    let roots = [];

    if (delta > 0) {
      const u = Math.cbrt(-q / 2 + Math.sqrt(delta));
      const v = Math.cbrt(-q / 2 - Math.sqrt(delta));
      roots = [u + v - b / (3 * a)];
    } else if (delta === 0) {
      const u = Math.cbrt(-q / 2);
      roots = [2 * u - b / (3 * a), -u - b / (3 * a)];
    } else {
      const phi = Math.acos(-q / (2 * Math.sqrt(-(p * p * p) / 27)));
      const r = 2 * Math.sqrt(-p / 3);
      roots = [
        r * Math.cos(phi / 3) - b / (3 * a),
        r * Math.cos((phi + 2 * Math.PI) / 3) - b / (3 * a),
        r * Math.cos((phi + 4 * Math.PI) / 3) - b / (3 * a),
      ];
    }
    return roots.filter((z) => z > 0 && !isNaN(z));
  };

  const integrate = (func, a, b, n = 1000) => {
    const h = (b - a) / n;
    let sum = (func(a) + func(b)) / 2;
    for (let i = 1; i < n; i++) {
      sum += func(a + i * h);
    }
    return sum * h;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleGasSelect = (index, gasName) => {
    const props = getGasProperties(gasName);
    setInputs({
      ...inputs,
      [`comp${index + 1}`]: gasName,
      [`Tc${index + 1}`]: props.Tc.toString(),
      [`Pc${index + 1}`]: props.Pc.toString(),
      [`Vc${index + 1}`]: props.Vc.toString(),
      [`M${index + 1}`]: props.M.toString(),
      [`w${index + 1}`]: props.w.toString(),
    });
  };

  const handleCalculate = () => {
    setError("");
    setResults(null);
    try {
      const Ru = 8.314;
      let result = {};

      if (eos === "A") {
        if (calculation === "1") {
          const { gas, M, P, T, Tc, Pc } = inputs;
          const M_num = parseFloat(M);
          const P_num = parseFloat(P);
          const T_num = parseFloat(T);
          const Tc_num = parseFloat(Tc);
          const Pc_num = parseFloat(Pc);
          if (
            isNaN(M_num) ||
            isNaN(P_num) ||
            isNaN(T_num) ||
            isNaN(Tc_num) ||
            isNaN(Pc_num)
          ) {
            throw new Error(
              "Invalid inputs. Ensure all fields are filled with valid numbers."
            );
          }
          if (T_num <= 0 || Tc_num <= 0 || Pc_num <= 0 || M_num <= 0) {
            throw new Error("Inputs must be positive.");
          }
          const R = Ru;
          const a = (27 * R ** 2 * Tc_num ** 2) / (64 * Pc_num);
          const b = (R * Tc_num) / (8 * Pc_num);
          const A = (a * P_num) / (R ** 2 * T_num ** 2);
          const B = (b * P_num) / (R * T_num);
          const Z = solveCubic(1, -1 - B, A, -A * B);
          const Zg = Math.max(...Z);
          const Zl = Math.min(...Z);
          const Vg = (Zg * Ru * T_num) / P_num;
          const Vl = (Zl * Ru * T_num) / P_num;

          result = {
            gas,
            a: a.toFixed(8),
            b: b.toFixed(8),
            A: A.toFixed(8),
            B: B.toFixed(8),
            Z: Z.map((z) => z.toFixed(8)).join(", "),
            Zg: Zg.toFixed(8),
            Zl: Zl.toFixed(8),
            Vg: Vg.toFixed(8),
            Vl: Vl.toFixed(8),
          };
        } else if (calculation === "2") {
          const {
            name,
            P1,
            T1,
            P2,
            T2,
            a,
            b,
            c,
            d,
            Tc,
            Pc,
            z1,
            z2,
            zs1,
            zs2,
            Mm,
          } = inputs;
          const P1_num = parseFloat(P1);
          const T1_num = parseFloat(T1);
          const P2_num = parseFloat(P2);
          const T2_num = parseFloat(T2);
          const a_num = parseFloat(a);
          const b_num = parseFloat(b);
          const c_num = parseFloat(c);
          const d_num = parseFloat(d);
          const Tc_num = parseFloat(Tc);
          const Pc_num = parseFloat(Pc);
          const z1_num = parseFloat(z1);
          const z2_num = parseFloat(z2);
          const zs1_num = parseFloat(zs1);
          const zs2_num = parseFloat(zs2);
          const Mm_num = parseFloat(Mm) || 0;
          if (
            isNaN(P1_num) ||
            isNaN(T1_num) ||
            isNaN(P2_num) ||
            isNaN(T2_num) ||
            isNaN(a_num) ||
            isNaN(b_num) ||
            isNaN(c_num) ||
            isNaN(d_num) ||
            isNaN(Tc_num) ||
            isNaN(Pc_num) ||
            isNaN(z1_num) ||
            isNaN(z2_num) ||
            isNaN(zs1_num) ||
            isNaN(zs2_num)
          ) {
            throw new Error(
              "Invalid inputs. Ensure all fields are filled with valid numbers."
            );
          }
          if (T1_num <= 0 || T2_num <= 0 || Tc_num <= 0 || Pc_num <= 0) {
            throw new Error("Inputs must be positive.");
          }
          const Cp = (T) => a_num + b_num * T + c_num * T ** 2 + d_num * T ** 3;
          const Cp_entropy = (T) =>
            a_num / T + b_num + c_num * T + d_num * T ** 2;
          const dh_ideal = integrate(Cp, T1_num, T2_num);
          const ds_ideal = integrate(Cp_entropy, T1_num, T2_num);
          const dh = dh_ideal - Ru * Tc_num * (z2_num - z1_num);
          const ds = ds_ideal - Ru * Tc_num * (zs2_num - zs1_num);
          const dh_kg = Mm_num > 0 ? dh / Mm_num : null;

          result = {
            name,
            dh_ideal: dh_ideal.toFixed(8),
            dh: dh.toFixed(8),
            ds_ideal: ds_ideal.toFixed(8),
            ds: ds.toFixed(8),
            dh_kg: dh_kg ? dh_kg.toFixed(8) : null,
          };
        } else if (calculation === "3") {
          const { gas, P, T, Tc, Pc } = inputs;
          const P_num = parseFloat(P);
          const T_num = parseFloat(T);
          const Tc_num = parseFloat(Tc);
          const Pc_num = parseFloat(Pc);
          if (isNaN(P_num) || isNaN(T_num) || isNaN(Tc_num) || isNaN(Pc_num)) {
            throw new Error(
              "Invalid inputs. Ensure all fields are filled with valid numbers."
            );
          }
          if (T_num <= 0 || Tc_num <= 0 || Pc_num <= 0) {
            throw new Error("Inputs must be positive.");
          }
          const a = (27 * Ru ** 2 * Tc_num ** 2) / (64 * Pc_num);
          const b = (Ru * Tc_num) / (8 * Pc_num);
          const A = (a * P_num) / (Ru ** 2 * T_num ** 2);
          const B = (b * P_num) / (Ru * T_num);
          const Z = solveCubic(1, -1 - B, A, -A * B);
          const Zg = Math.max(...Z);
          const H_dep = Ru * T_num * (Zg - 1 - A / Zg);
          const S_dep = Ru * Math.log(Zg - B);

          result = {
            gas,
            a: a.toFixed(8),
            b: b.toFixed(8),
            A: A.toFixed(8),
            B: B.toFixed(8),
            Z: Z.map((z) => z.toFixed(8)).join(", "),
            Zg: Zg.toFixed(8),
            H_dep: H_dep.toFixed(8),
            S_dep: S_dep.toFixed(8),
          };
        } else if (calculation === "4") {
          const { gas, P, T, Tc, Pc } = inputs;
          const P_num = parseFloat(P);
          const T_num = parseFloat(T);
          const Tc_num = parseFloat(Tc);
          const Pc_num = parseFloat(Pc);
          if (isNaN(P_num) || isNaN(T_num) || isNaN(Tc_num) || isNaN(Pc_num)) {
            throw new Error(
              "Invalid inputs. Ensure all fields are filled with valid numbers."
            );
          }
          if (T_num <= 0 || Tc_num <= 0 || Pc_num <= 0) {
            throw new Error("Inputs must be positive.");
          }
          const a = (27 * Ru ** 2 * Tc_num ** 2) / (64 * Pc_num);
          const b = (Ru * Tc_num) / (8 * Pc_num);
          const A = (a * P_num) / (Ru ** 2 * T_num ** 2);
          const B = (b * P_num) / (Ru * T_num);
          const Z = solveCubic(1, -1 - B, A, -A * B);
          const Zg = Math.max(...Z);
          const v = (Zg * Ru * T_num) / P_num;
          const ln_phi = Zg - 1 - Math.log(Zg - B) - a / (Ru * T_num * v);
          const phi = Math.exp(ln_phi);
          const fug = phi * P_num;

          result = {
            gas,
            a: a.toFixed(8),
            b: b.toFixed(8),
            A: A.toFixed(8),
            B: B.toFixed(8),
            Z: Z.map((z) => z.toFixed(8)).join(", "),
            Zg: Zg.toFixed(8),
            ln_phi: ln_phi.toFixed(8),
            phi: phi.toFixed(8),
            fug: fug.toFixed(8),
          };
        }
      } else if (eos === "B") {
        if (calculation === "1") {
          const { gas, Pc, Tc, w, T, P } = inputs;
          const Pc_num = parseFloat(Pc);
          const Tc_num = parseFloat(Tc);
          const w_num = parseFloat(w);
          const T_num = parseFloat(T);
          const P_num = parseFloat(P);
          if (
            isNaN(Pc_num) ||
            isNaN(Tc_num) ||
            isNaN(w_num) ||
            isNaN(T_num) ||
            isNaN(P_num)
          ) {
            throw new Error(
              "Invalid inputs. Ensure all fields are filled with valid numbers."
            );
          }
          if (T_num <= 0 || Tc_num <= 0 || Pc_num <= 0) {
            throw new Error("Inputs must be positive.");
          }
          const Tr = T_num / Tc_num;
          const m = 0.37464 + 1.54226 * w_num - 0.26992 * w_num ** 2;
          const alpha = (1 + m * (1 - Math.sqrt(Tr))) ** 2;
          const a = (0.45724 * alpha * Ru ** 2 * Tc_num ** 2) / Pc_num;
          const b = (0.0778 * Ru * Tc_num) / Pc_num;
          const A = (a * P_num) / (Ru ** 2 * T_num ** 2);
          const B = (b * P_num) / (Ru * T_num);
          const Z = solveCubic(
            1,
            -1 + B,
            A - 2 * B - 3 * B ** 2,
            -A * B + B ** 2 + B ** 3
          );
          const Zg = Math.max(...Z);
          const Zl = Math.min(...Z);
          const Vg = (Zg * Ru * T_num) / P_num;
          const Vl = (Zl * Ru * T_num) / P_num;
          const top = Zg + (1 + Math.sqrt(2)) * B;
          const down = Zg + (1 - Math.sqrt(2)) * B;
          const term = (1 + m) / Math.sqrt(alpha);
          const spe = A / (Math.sqrt(8) * B);
          const H_dep =
            Ru * T_num * (Zg - 1 - term * spe * Math.log(top / down));
          const S_dep =
            Ru * (Math.log(Zg - B) - term * spe * Math.log(top / down));
          const U_dep = H_dep - Ru * T_num * (Zg - 1);

          result = {
            gas,
            a: a.toFixed(8),
            b: b.toFixed(8),
            A: A.toFixed(8),
            B: B.toFixed(8),
            Z: Z.map((z) => z.toFixed(8)).join(", "),
            Zg: Zg.toFixed(8),
            Zl: Zl.toFixed(8),
            Vg: Vg.toFixed(8),
            Vl: Vl.toFixed(8),
            H_dep: H_dep.toFixed(8),
            S_dep: S_dep.toFixed(8),
            U_dep: U_dep.toFixed(8),
          };
        } else if (calculation === "2") {
          const { gas, Pc, Tc, w, T, P } = inputs;
          const Pc_num = parseFloat(Pc);
          const Tc_num = parseFloat(Tc);
          const w_num = parseFloat(w);
          const T_num = parseFloat(T);
          const P_num = parseFloat(P);
          if (
            isNaN(Pc_num) ||
            isNaN(Tc_num) ||
            isNaN(w_num) ||
            isNaN(T_num) ||
            isNaN(P_num)
          ) {
            throw new Error(
              "Invalid inputs. Ensure all fields are filled with valid numbers."
            );
          }
          if (T_num <= 0 || Tc_num <= 0 || Pc_num <= 0) {
            throw new Error("Inputs must be positive.");
          }
          const Tr = T_num / Tc_num;
          const m = 0.37464 + 1.54226 * w_num - 0.26992 * w_num ** 2;
          const alpha = (1 + m * (1 - Math.sqrt(Tr))) ** 2;
          const a = (0.45724 * alpha * Ru ** 2 * Tc_num ** 2) / Pc_num;
          const b = (0.0778 * Ru * Tc_num) / Pc_num;
          const A = (a * P_num) / (Ru ** 2 * T_num ** 2);
          const B = (b * P_num) / (Ru * T_num);
          const Z = solveCubic(
            1,
            -1 + B,
            A - 2 * B - 3 * B ** 2,
            -A * B + B ** 2 + B ** 3
          );
          const Zg = Math.max(...Z);
          const top = Zg + (1 + Math.sqrt(2)) * B;
          const down = Zg + (1 - Math.sqrt(2)) * B;
          const spe = A / (Math.sqrt(8) * B);
          const ln_phi = Zg - 1 - Math.log(Zg - B) - spe * Math.log(top / down);
          const phi = Math.exp(ln_phi);
          const fug = phi * P_num;

          result = {
            gas,
            a: a.toFixed(8),
            b: b.toFixed(8),
            A: A.toFixed(8),
            B: B.toFixed(8),
            Z: Z.map((z) => z.toFixed(8)).join(", "),
            Zg: Zg.toFixed(8),
            ln_phi: ln_phi.toFixed(8),
            phi: phi.toFixed(8),
            fug: fug.toFixed(8),
          };
        }
      } else if (eos === "M") {
        const { P, T, frac, frac_type } = inputs;
        const P_num = parseFloat(P);
        const T_num = parseFloat(T);
        const n = parseInt(numComponents);
        if (n < 2 || n > 4)
          throw new Error("Number of components must be 2 to 4.");
        if (T_num <= 0) throw new Error("Temperature must be positive.");
        if (isNaN(P_num) || isNaN(T_num)) {
          throw new Error("Invalid system pressure or temperature.");
        }

        const comp = Array(n)
          .fill()
          .map((_, i) => inputs[`comp${i + 1}`] || `Component ${i + 1}`);
        let y = Array(n).fill(0);
        const M = Array(n).fill(0);
        const Tc = Array(n).fill(0);
        const Pc = Array(n).fill(0);
        const Vc = Array(n).fill(0);
        const w = Array(n).fill(0);
        const a = Array(n).fill(0);
        const b = Array(n).fill(0);
        const A = Array(n).fill(0);
        const B = Array(n).fill(0);
        const m = Array(n).fill(0);
        const alpha = Array(n).fill(0);
        const Tr = Array(n).fill(0);

        for (let i = 0; i < n; i++) {
          Tc[i] = parseFloat(inputs[`Tc${i + 1}`]);
          Pc[i] = parseFloat(inputs[`Pc${i + 1}`]);
          Vc[i] = parseFloat(inputs[`Vc${i + 1}`]);
          M[i] = parseFloat(inputs[`M${i + 1}`]);
          w[i] = parseFloat(inputs[`w${i + 1}`]);
          if (
            isNaN(Tc[i]) ||
            isNaN(Pc[i]) ||
            isNaN(Vc[i]) ||
            isNaN(M[i]) ||
            isNaN(w[i])
          ) {
            throw new Error(
              `Invalid properties for component ${
                i + 1
              }. Ensure all fields are filled with valid numbers.`
            );
          }
          if (Tc[i] <= 0 || Pc[i] <= 0 || Vc[i] <= 0 || M[i] <= 0) {
            throw new Error(
              `Properties (Tc, Pc, Vc, M) for component ${
                i + 1
              } must be positive.`
            );
          }
        }

        if (frac === "n") {
          if (frac_type === "y") {
            y = Array(n)
              .fill(0)
              .map((_, i) => parseFloat(inputs[`y${i + 1}`]));
            if (y.some(isNaN)) throw new Error("Invalid mole fractions.");
            if (Math.abs(y.reduce((sum, val) => sum + val, 0) - 1) > 1e-6) {
              throw new Error("Sum of mole fractions must equal 1.");
            }
          } else {
            const n_moles = Array(n)
              .fill(0)
              .map((_, i) => parseFloat(inputs[`n_moles${i + 1}`]));
            if (n_moles.some(isNaN)) throw new Error("Invalid mole inputs.");
            const total = n_moles.reduce((sum, val) => sum + val, 0);
            if (total <= 0) throw new Error("Total moles must be positive.");
            y = n_moles.map((val) => val / total);
          }
        } else {
          if (frac_type === "w") {
            const w_mass = Array(n)
              .fill(0)
              .map((_, i) => parseFloat(inputs[`w_mass${i + 1}`]));
            if (w_mass.some(isNaN)) throw new Error("Invalid mass fractions.");
            if (
              Math.abs(w_mass.reduce((sum, val) => sum + val, 0) - 1) > 1e-6
            ) {
              throw new Error("Sum of mass fractions must equal 1.");
            }
            y = w_mass.map((w, i) => w / M[i]);
            y = y.map((val) => val / y.reduce((sum, v) => sum + v, 0));
          } else {
            const m = Array(n)
              .fill(0)
              .map((_, i) => parseFloat(inputs[`m${i + 1}`]));
            if (m.some(isNaN)) throw new Error("Invalid mass inputs.");
            const n_moles = m.map((m_val, i) => m_val / M[i]);
            const total = n_moles.reduce((sum, v) => sum + v, 0);
            if (total <= 0) throw new Error("Total moles must be positive.");
            y = n_moles.map((val) => val / total);
          }
        }

        for (let i = 0; i < n; i++) {
          if (mixtureEos === "V") {
            b[i] = (Ru * Tc[i]) / (8 * Pc[i]);
            a[i] = (27 * Ru ** 2 * Tc[i] ** 2) / (64 * Pc[i]);
          } else if (mixtureEos === "SRK") {
            m[i] = 0.48 + 1.574 * w[i] - 0.176 * w[i] ** 2;
            Tr[i] = T_num / Tc[i];
            alpha[i] = (1 + m[i] * (1 - Math.sqrt(Tr[i]))) ** 2;
            b[i] = (0.08664 * Ru * Tc[i]) / Pc[i];
            a[i] = (0.42748 * alpha[i] * Ru ** 2 * Tc[i] ** 2) / Pc[i];
          } else if (mixtureEos === "PR") {
            m[i] = 0.37464 + 1.54226 * w[i] - 0.26992 * w[i] ** 2;
            Tr[i] = T_num / Tc[i];
            alpha[i] = (1 + m[i] * (1 - Math.sqrt(Tr[i]))) ** 2;
            b[i] = (0.0778 * Ru * Tc[i]) / Pc[i];
            a[i] = (0.45724 * Ru ** 2 * Tc[i] ** 2 * alpha[i]) / Pc[i];
          } else if (mixtureEos === "RK") {
            b[i] = (0.08664 * Ru * Tc[i]) / Pc[i];
            a[i] = (0.42748 * Ru ** 2 * Tc[i] ** 2.5) / Pc[i];
          }
          A[i] = (a[i] * P_num) / (Ru ** 2 * T_num ** 2);
          B[i] = (b[i] * P_num) / (Ru * T_num);
        }

        let a_mix = 0;
        const Zc = Tc.map((tc, i) => (Pc[i] * Vc[i]) / (Ru * tc));
        const Zc_ij = Zc.reduce((sum, val) => sum + val, 0) / n;
        let k_ij = 0;
        const a_ij = Array(n)
          .fill()
          .map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if (mixtureEos === "V") {
              a_ij[i][j] = Math.sqrt(a[i] * a[j]);
            } else {
              if (mixtureEos === "PR") {
                k_ij +=
                  1 -
                  ((2 * Math.sqrt(Tc[i] * Tc[j])) / (Tc[i] + Tc[j])) ** Zc_ij;
              } else {
                k_ij = 0;
              }
              const k_ij_n = k_ij / n;
              a_ij[i][j] = (1 - k_ij_n) * Math.sqrt(a[i] * a[j]);
            }
            a_mix += y[i] * y[j] * a_ij[i][j];
          }
        }

        const b_mix = y.reduce((sum, yi, i) => sum + yi * b[i], 0);
        const Amix = (a_mix * P_num) / (Ru ** 2 * T_num ** 2);
        const Bmix = (b_mix * P_num) / (Ru * T_num);

        let p, q, r;
        if (mixtureEos === "V") {
          p = -1 - Bmix;
          q = Amix;
          r = -Amix * Bmix;
        } else if (mixtureEos === "SRK" || mixtureEos === "RK") {
          p = -1;
          q = Amix - Bmix - Bmix ** 2;
          r = -Amix * Bmix;
        } else if (mixtureEos === "PR") {
          p = -1 + Bmix;
          q = Amix - 2 * Bmix - 3 * Bmix ** 2;
          r = -Amix * Bmix + Bmix ** 2 + Bmix ** 3;
        }
        const Z = solveCubic(1, p, q, r);
        if (Z.length === 0)
          throw new Error("No real roots found for compressibility factor.");
        const z_liquid = Math.min(...Z);
        const z_mix = Math.max(...Z);
        const v_mix = (z_mix * Ru * T_num) / P_num;

        const tau_i = Array(n).fill(0);
        for (let i = 0; i < n; i++) {
          tau_i[i] = (1 + m[i]) / Math.sqrt(a[i]) - 1;
        }
        const A_ij = Array(n)
          .fill()
          .map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            A_ij[i][j] = (a_ij[i][j] * P_num) / (Ru ** 2 * T_num ** 2);
          }
        }
        let theta_mix = 0;
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            theta_mix += 0.5 * y[i] * y[j] * A_ij[i][j] * (tau_i[i] + tau_i[j]);
          }
        }

        let H_dep, S_dep;
        if (mixtureEos === "V") {
          H_dep = Ru * T_num * (z_mix - 1 - Amix / z_mix);
          S_dep = Ru * Math.log(z_mix - Bmix);
        } else if (mixtureEos === "RK") {
          H_dep =
            Ru *
            T_num *
            (z_mix -
              1 -
              ((3 * Amix) / (2 * Bmix)) * Math.log(1 + Bmix / z_mix));
          S_dep =
            Ru *
            (Math.log(z_mix - Bmix) -
              (Amix / (2 * Bmix)) * Math.log(1 + Bmix / z_mix));
        } else if (mixtureEos === "SRK") {
          H_dep =
            Ru *
            T_num *
            (z_mix -
              1 -
              ((Amix + theta_mix) / Bmix) * Math.log(1 + Bmix / z_mix));
          S_dep =
            Ru *
            (Math.log(z_mix - Bmix) -
              (theta_mix / Bmix) * Math.log(1 + Bmix / z_mix));
        } else if (mixtureEos === "PR") {
          H_dep =
            Ru *
            T_num *
            (z_mix -
              1 -
              ((Amix + theta_mix) / (Math.sqrt(8) * Bmix)) *
                Math.log(
                  (z_mix + (1 + Math.sqrt(2)) * Bmix) /
                    (z_mix + (1 - Math.sqrt(2)) * Bmix)
                ));
          S_dep =
            Ru *
            (Math.log(z_mix - Bmix) -
              (theta_mix / (Math.sqrt(8) * Bmix)) *
                Math.log(
                  (z_mix + (1 + Math.sqrt(2)) * Bmix) /
                    (z_mix + (1 - Math.sqrt(2)) * Bmix)
                ));
        }

        const phai = Array(n).fill(0);
        const Ln_phai = Array(n).fill(0);
        const fug = Array(n).fill(0);
        for (let i = 0; i < n; i++) {
          let sum_term = 0;
          for (let j = 0; j < n; j++) {
            sum_term += y[j] * A_ij[i][j];
          }
          if (mixtureEos === "V") {
            Ln_phai[i] =
              B[i] / (z_mix - Bmix) -
              Math.log(z_mix - Bmix) -
              (2 / z_mix) * sum_term;
          } else if (mixtureEos === "RK" || mixtureEos === "SRK") {
            const sp = Amix / Bmix;
            const fr = B[i] / Bmix;
            Ln_phai[i] =
              fr * (z_mix - 1) -
              Math.log(z_mix - Bmix) -
              sp * ((2 / Amix) * sum_term - fr) * Math.log(1 + B[i] / z_mix);
          } else if (mixtureEos === "PR") {
            const sp = Amix / (Bmix * Math.sqrt(8));
            const top = z_mix + (1 + Math.sqrt(2)) * Bmix;
            const down = z_mix + (1 - Math.sqrt(2)) * Bmix;
            const fr = B[i] / Bmix;
            Ln_phai[i] =
              fr * (z_mix - 1) -
              Math.log(z_mix - Bmix) -
              sp * ((2 / Amix) * sum_term - fr) * Math.log(top / down);
          }
          phai[i] = Math.exp(Ln_phai[i]);
          fug[i] = y[i] * P_num * phai[i];
        }

        result = {
          comp: comp.join(", "),
          a: a.map((val) => val.toFixed(8)),
          b: b.map((val) => val.toFixed(8)),
          A: A.map((val) => val.toFixed(8)),
          B: B.map((val) => val.toFixed(8)),
          tau_i: tau_i.map((val) => val.toFixed(8)),
          Z: Z.map((z) => z.toFixed(8)).join(", "),
          z_mix: z_mix.toFixed(8),
          z_liquid: z_liquid.toFixed(8),
          a_mix: a_mix.toFixed(8),
          b_mix: b_mix.toFixed(8),
          Amix: Amix.toFixed(8),
          Bmix: Bmix.toFixed(8),
          v_mix: v_mix.toFixed(8),
          H_dep: H_dep.toFixed(8),
          S_dep: S_dep.toFixed(8),
          Zc_ij: Zc_ij.toFixed(8),
          theta_mix: theta_mix.toFixed(8),
          Ln_phai: Ln_phai.map((val) => val.toFixed(8)),
          phai: phai.map((val) => val.toFixed(8)),
          fug: fug.map((val) => val.toFixed(8)),
        };
      }

      setResults(result);
    } catch (err) {
      setError(
        err.message || "Error in calculations. Please check your inputs."
      );
    }
  };

  const renderInputs = () => {
    if (!eos || (!calculation && eos !== "M")) return null;

    if (eos === "A") {
      if (calculation === "1") {
        return (
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="gas"
                placeholder="Gas name"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Gas name
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="M"
                placeholder="Molar mass [kg/kmol]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Molar mass [kg/kmol]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="P"
                placeholder="Pressure [kPa]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Pressure [kPa]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="T"
                placeholder="Temperature [K]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Temperature [K]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="Tc"
                placeholder="Critical temperature [K]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Critical temperature [K]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="Pc"
                placeholder="Critical pressure [kPa]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Critical pressure [kPa]
              </label>
            </div>
          </div>
        );
      } else if (calculation === "2") {
        return (
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Gas name"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Gas name
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="P1"
                placeholder="P1 [kPa]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                P1 [kPa]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="T1"
                placeholder="T1 [K]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                T1 [K]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="P2"
                placeholder="P2 [kPa]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                P2 [kPa]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="T2"
                placeholder="T2 [K]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                T2 [K]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="a"
                placeholder="Heat capacity constant a"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Heat capacity constant a
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="b"
                placeholder="Heat capacity constant b"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Heat capacity constant b
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="c"
                placeholder="Heat capacity constant c"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Heat capacity constant c
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="d"
                placeholder="Heat capacity constant d"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Heat capacity constant d
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="Tc"
                placeholder="Critical temperature [K]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Critical temperature [K]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="Pc"
                placeholder="Critical pressure [kPa]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Critical pressure [kPa]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="z1"
                placeholder="z1 from enthalpy chart"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                z1 from enthalpy chart
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="z2"
                placeholder="z2 from enthalpy chart"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                z2 from enthalpy chart
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="zs1"
                placeholder="z1 from entropy chart"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                z1 from entropy chart
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="zs2"
                placeholder="z2 from entropy chart"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                z2 from entropy chart
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="Mm"
                placeholder="Molar mass [kg/kmol] (0 if not needed)"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Molar mass [kg/kmol] (0 if not needed)
              </label>
            </div>
          </div>
        );
      } else if (calculation === "3" || calculation === "4") {
        return (
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="gas"
                placeholder="Gas name"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Gas name
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="P"
                placeholder="Pressure [kPa]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Pressure [kPa]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="T"
                placeholder="Temperature [K]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Temperature [K]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="Tc"
                placeholder="Critical temperature [K]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Critical temperature [K]
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="Pc"
                placeholder="Critical pressure [kPa]"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Critical pressure [kPa]
              </label>
            </div>
          </div>
        );
      }
    } else if (eos === "B") {
      return (
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="gas"
              placeholder="Gas name"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
            />
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Gas name
            </label>
          </div>
          <div className="relative">
            <input
              type="number"
              name="Pc"
              placeholder="Critical pressure [kPa]"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
            />
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Critical pressure [kPa]
            </label>
          </div>
          <div className="relative">
            <input
              type="number"
              name="Tc"
              placeholder="Critical temperature [K]"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
            />
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Critical temperature [K]
            </label>
          </div>
          <div className="relative">
            <input
              type="number"
              name="w"
              placeholder="Acentric factor"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
            />
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Acentric factor
            </label>
          </div>
          <div className="relative">
            <input
              type="number"
              name="T"
              placeholder="Temperature [K]"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
            />
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Temperature [K]
            </label>
          </div>
          <div className="relative">
            <input
              type="number"
              name="P"
              placeholder="Pressure [kPa]"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
            />
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Pressure [kPa]
            </label>
          </div>
        </div>
      );
    } else if (eos === "M") {
      return (
        <div className="space-y-6">
          <div className="relative">
            <select
              onChange={(e) => setMixtureEos(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
            >
              <option value="">Select Mixture EOS</option>
              <option value="V">Van der Waals EOS</option>
              <option value="RK">Redlich-Kwong EOS</option>
              <option value="SRK">Soave-Redlich-Kwong EOS</option>
              <option value="PR">Peng-Robinson EOS</option>
            </select>
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600">
              Mixture EOS Type
            </label>
          </div>
          {mixtureEos && (
            <>
              <div className="relative">
                <input
                  type="number"
                  min="2"
                  max="4"
                  value={numComponents}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= 2 && value <= 4) setNumComponents(value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                  Number of Components (2-4)
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="P"
                  placeholder="Pressure [kPa]"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                  System Pressure [kPa]
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="T"
                  placeholder="Temperature [K]"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                  System Temperature [K]
                </label>
              </div>
              <div className="relative">
                <select
                  name="frac"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                >
                  <option value="">Select Basis</option>
                  <option value="n">Mole Basis</option>
                  <option value="m">Mass Basis</option>
                </select>
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600">
                  Composition Basis
                </label>
              </div>
              {inputs.frac && (
                <div className="relative">
                  <select
                    name="frac_type"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                  >
                    <option value="">Select Fraction Type</option>
                    {inputs.frac === "n" ? (
                      <>
                        <option value="y">Mole Fractions</option>
                        <option value="n">Moles (kmol)</option>
                      </>
                    ) : (
                      <>
                        <option value="w">Mass Fractions</option>
                        <option value="m">Masses (kg)</option>
                      </>
                    )}
                  </select>
                  <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600">
                    Fraction Type
                  </label>
                </div>
              )}
              {inputs.frac_type && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: numComponents }).map((_, i) => (
                    <div
                      key={i}
                      className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-sm"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">
                        Component {i + 1}
                      </h4>
                      <div className="flex space-x-4">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            name={`comp${i + 1}`}
                            placeholder={`Name of component ${i + 1}`}
                            value={inputs[`comp${i + 1}`] || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
                          />
                          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                            Name of component {i + 1}
                          </label>
                        </div>
                        <div className="relative flex-1">
                          <select
                            onChange={(e) => handleGasSelect(i, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                          >
                            <option value="">Select to Autofill</option>
                            {gases.map((gas, idx) => (
                              <option key={idx} value={gas}>
                                {gas}
                              </option>
                            ))}
                          </select>
                          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600">
                            Autofill Gas
                          </label>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          name={`Tc${i + 1}`}
                          placeholder="Critical temperature [K]"
                          value={inputs[`Tc${i + 1}`] || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
                        />
                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                          Critical temperature [K]
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          name={`Pc${i + 1}`}
                          placeholder="Critical pressure [kPa]"
                          value={inputs[`Pc${i + 1}`] || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
                        />
                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                          Critical pressure [kPa]
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          name={`Vc${i + 1}`}
                          placeholder="Critical volume [m³/kmol]"
                          value={inputs[`Vc${i + 1}`] || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
                        />
                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                          Critical volume [m³/kmol]
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          name={`M${i + 1}`}
                          placeholder="Molar mass [kg/kmol]"
                          value={inputs[`M${i + 1}`] || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
                        />
                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                          Molar mass [kg/kmol]
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          name={`w${i + 1}`}
                          placeholder="Acentric factor"
                          value={inputs[`w${i + 1}`] || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
                        />
                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                          Acentric factor
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          name={
                            inputs.frac === "n"
                              ? inputs.frac_type === "y"
                                ? `y${i + 1}`
                                : `n_moles${i + 1}`
                              : inputs.frac_type === "w"
                              ? `w_mass${i + 1}`
                              : `m${i + 1}`
                          }
                          placeholder={
                            inputs.frac === "n"
                              ? inputs.frac_type === "y"
                                ? `Mole fraction of component ${i + 1}`
                                : `Moles (kmol) of component ${i + 1}`
                              : inputs.frac_type === "w"
                              ? `Mass fraction of component ${i + 1}`
                              : `Mass (kg) of component ${i + 1}`
                          }
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all peer"
                        />
                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                          {inputs.frac === "n"
                            ? inputs.frac_type === "y"
                              ? `Mole fraction of component ${i + 1}`
                              : `Moles (kmol) of component ${i + 1}`
                            : inputs.frac_type === "w"
                            ? `Mass fraction of component ${i + 1}`
                            : `Mass (kg) of component ${i + 1}`}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      );
    }
    return null;
  };

  const renderResults = () => {
    if (!results) return null;

    if (eos === "A") {
      if (calculation === "1") {
        return (
          <div className="mt-10 p-8 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-tight">
              Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "a", value: `${results.a} m⁶·kPa/kmol²` },
                { label: "b", value: `${results.b} m³/kmol` },
                { label: "A", value: results.A },
                { label: "B", value: results.B },
                { label: "Z", value: results.Z },
                { label: "Zg", value: results.Zg },
                { label: "Zl", value: results.Zl },
                { label: "Vg", value: `${results.Vg} m³/kmol` },
                { label: "Vl", value: `${results.Vl} m³/kmol` },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100"
                >
                  <p className="text-gray-800">
                    <span className="font-semibold text-indigo-600">
                      {item.label}
                    </span>{" "}
                    <span className="ml-2">{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (calculation === "2") {
        return (
          <div className="mt-10 p-8 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-tight">
              Thermodynamic Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "Δh_ideal", value: `${results.dh_ideal} kJ/kmol` },
                { label: "Δh", value: `${results.dh} kJ/kmol` },
                { label: "Δs_ideal", value: `${results.ds_ideal} kJ/kmol·K` },
                { label: "Δs", value: `${results.ds} kJ/kmol·K` },
                results.dh_kg && {
                  label: "Δh_kg",
                  value: `${results.dh_kg} kJ/kg`,
                },
              ]
                .filter(Boolean)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100"
                  >
                    <p className="text-gray-800">
                      <span className="font-semibold text-indigo-600">
                        {item.label}
                      </span>{" "}
                      <span className="ml-2">{item.value}</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        );
      } else if (calculation === "3") {
        return (
          <div className="mt-10 p-8 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-tight">
              Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "a", value: `${results.a} m⁶·kPa/kmol²` },
                { label: "b", value: `${results.b} m³/kmol` },
                { label: "A", value: results.A },
                { label: "B", value: results.B },
                { label: "Z", value: results.Z },
                { label: "Zg", value: results.Zg },
                { label: "H_dep", value: `${results.H_dep} kJ/kmol` },
                { label: "S_dep", value: `${results.S_dep} kJ/kmol·K` },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100"
                >
                  <p className="text-gray-800">
                    <span className="font-semibold text-indigo-600">
                      {item.label}
                    </span>{" "}
                    <span className="ml-2">{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (calculation === "4") {
        return (
          <div className="mt-10 p-8 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-tight">
              Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "a", value: `${results.a} m⁶·kPa/kmol²` },
                { label: "b", value: `${results.b} m³/kmol` },
                { label: "A", value: results.A },
                { label: "B", value: results.B },
                { label: "Z", value: results.Z },
                { label: "Zg", value: results.Zg },
                { label: "ln φ", value: results.ln_phi },
                { label: "φ", value: results.phi },
                { label: "Fugacity", value: `${results.fug} kPa` },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100"
                >
                  <p className="text-gray-800">
                    <span className="font-semibold text-indigo-600">
                      {item.label}
                    </span>{" "}
                    <span className="ml-2">{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }
    } else if (eos === "B") {
      if (calculation === "1") {
        return (
          <div className="mt-10 p-8 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-tight">
              Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "a", value: `${results.a} m⁶·kPa/kmol²` },
                { label: "b", value: `${results.b} m³/kmol` },
                { label: "A", value: results.A },
                { label: "B", value: results.B },
                { label: "Z", value: results.Z },
                { label: "Zg", value: results.Zg },
                { label: "Zl", value: results.Zl },
                { label: "Vg", value: `${results.Vg} m³/kmol` },
                { label: "Vl", value: `${results.Vl} m³/kmol` },
                { label: "H_dep", value: `${results.H_dep} kJ/kmol` },
                { label: "S_dep", value: `${results.S_dep} kJ/kmol·K` },
                { label: "U_dep", value: `${results.U_dep} kJ/kmol` },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100"
                >
                  <p className="text-gray-800">
                    <span className="font-semibold text-indigo-600">
                      {item.label}
                    </span>{" "}
                    <span className="ml-2">{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (calculation === "2") {
        return (
          <div className="mt-10 p-8 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-tight">
              Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "a", value: `${results.a} m⁶·kPa/kmol²` },
                { label: "b", value: `${results.b} m³/kmol` },
                { label: "A", value: results.A },
                { label: "B", value: results.B },
                { label: "Z", value: results.Z },
                { label: "Zg", value: results.Zg },
                { label: "ln φ", value: results.ln_phi },
                { label: "φ", value: results.phi },
                { label: "Fugacity", value: `${results.fug} kPa` },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-100"
                >
                  <p className="text-gray-800">
                    <span className="font-semibold text-indigo-600">
                      {item.label}
                    </span>{" "}
                    <span className="ml-2">{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }
    } else if (eos === "M") {
      return (
        <div className="mt-10 p-8 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100">
          <h3 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center tracking-tight">
            Mixture Results
          </h3>

          <div className="space-y-8">
            {/* Components */}
            <div>
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">
                Components
              </h4>
              <div className="p-5 bg-white rounded-xl shadow-md border border-indigo-100">
                <p className="text-gray-800">{results.comp}</p>
              </div>
            </div>

            {/* EOS Parameters (Table for multiple values) */}
            <div>
              <h4 className="text-lg font-semibold text-indigo-600 mb-3">
                EOS Parameters
              </h4>
              <div className="overflow-x-auto rounded-xl shadow-md border border-indigo-100">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-indigo-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-indigo-700">
                        Parameter
                      </th>
                      {(Array.isArray(results.comp)
                        ? results.comp
                        : results.comp.split(",")
                      ).map((c, i) => (
                        <th
                          key={i}
                          className="px-4 py-2 text-center font-semibold text-indigo-700"
                        >
                          {c.trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-700">
                        a (m⁶·kPa/kmol²)
                      </td>
                      {results.a.map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 text-center text-gray-800"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-700">
                        b (m³/kmol)
                      </td>
                      {results.b.map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 text-center text-gray-800"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-700">A</td>
                      {results.A.map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 text-center text-gray-800"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-700">B</td>
                      {results.B.map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 text-center text-gray-800"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-700">
                        τᵢ
                      </td>
                      {results.tau_i.map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 text-center text-gray-800"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mixture Properties (Single values in cards) */}
            <div>
              <h4 className="text-lg font-semibold text-indigo-600 mb-3">
                Mixture Properties
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: "Z", value: results.Z },
                  { label: "z_mix", value: results.z_mix },
                  { label: "z_liquid", value: results.z_liquid },
                  { label: "a_mix", value: `${results.a_mix} m⁶·kPa/kmol²` },
                  { label: "b_mix", value: `${results.b_mix} m³/kmol` },
                  { label: "Amix", value: results.Amix },
                  { label: "Bmix", value: results.Bmix },
                  { label: "v_mix", value: `${results.v_mix} m³/kmol` },
                  { label: "H_dep", value: `${results.H_dep} kJ/kmol` },
                  { label: "S_dep", value: `${results.S_dep} kJ/kmol·K` },
                  { label: "Zc_ij", value: results.Zc_ij },
                  { label: "θ_mix", value: results.theta_mix },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-100"
                  >
                    <p className="text-gray-800">
                      <span className="font-semibold text-indigo-600">
                        {item.label}:
                      </span>{" "}
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fugacity Section (Table) */}
            <div>
              <h4 className="text-lg font-semibold text-indigo-600 mb-3">
                Fugacity
              </h4>
              <div className="overflow-x-auto rounded-xl shadow-md border border-indigo-100">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-indigo-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-indigo-700">
                        Parameter
                      </th>
                      {(Array.isArray(results.comp)
                        ? results.comp
                        : results.comp.split(",")
                      ).map((c, i) => (
                        <th
                          key={i}
                          className="px-4 py-2 text-center font-semibold text-indigo-700"
                        >
                          {c.trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-700">
                        ln φᵢ
                      </td>
                      {results.Ln_phai.map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 text-center text-gray-800"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-700">
                        φᵢ
                      </td>
                      {results.phai.map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 text-center text-gray-800"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-700">
                        Fugacity (kPa)
                      </td>
                      {results.fug.map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 text-center text-gray-800"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 text-gray-900">
      <Head>
        <title>Equation of State Calculator</title>
        <meta
          name="description"
          content="Calculate thermodynamic properties using various equations of state."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-900 backdrop-blur-lg text-white shadow-lg z-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center">
          <h1 className="text-center text-4xl md:text-5xl font-bold uppercase tracking-wide hover:text-indigo-200 transition-colors">
            Equation of State Calculator
          </h1>
        </div>
      </header>

      <main className="max-w-9xl mx-auto px-4 md:px-8 py-10">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-10 border border-indigo-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
          <h2 className="text-3xl font-extrabold text-indigo-800 mb-8">
            Input Parameters
          </h2>

          {/* EOS & Calculation Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="relative">
              <select
                onChange={(e) => {
                  setEos(e.target.value);
                  setCalculation("");
                  setResults(null);
                  setError("");
                }}
                className="w-full px-4 py-3 border border-gray-400 rounded-xl bg-white focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all font-semibold text-gray-900"
              >
                <option value="">Select EOS</option>
                <option value="A">Van der Waals EOS</option>
                <option value="B">Peng-Robinson EOS</option>
                <option value="M">Mixture Calculations</option>
              </select>
              <label className="absolute left-3 -top-3 px-2 bg-white text-sm font-semibold text-gray-800">
                Equation of State
              </label>
            </div>

            {eos === "A" && (
              <div className="relative">
                <select
                  onChange={(e) => {
                    setCalculation(e.target.value);
                    setResults(null);
                    setError("");
                  }}
                  className="w-full px-4 py-3 border border-gray-400 rounded-xl bg-white focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all font-semibold text-gray-900"
                >
                  <option value="">Select Calculation</option>
                  <option value="1">Z, Vg, Vl</option>
                  <option value="2">Δh, Δs</option>
                  <option value="3">H_dep, S_dep</option>
                  <option value="4">Fugacity</option>
                </select>
                <label className="absolute left-3 -top-3 px-2 bg-white text-sm font-semibold text-gray-800">
                  Calculation Type
                </label>
              </div>
            )}

            {eos === "B" && (
              <div className="relative">
                <select
                  onChange={(e) => {
                    setCalculation(e.target.value);
                    setResults(null);
                    setError("");
                  }}
                  className="w-full px-4 py-3 border border-gray-400 rounded-xl bg-white focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all font-semibold text-gray-900"
                >
                  <option value="">Select Calculation</option>
                  <option value="1">Z, Vg, Vl, H_dep, S_dep, U_dep</option>
                  <option value="2">Fugacity</option>
                </select>
                <label className="absolute left-3 -top-3 px-2 bg-white text-sm font-semibold text-gray-800">
                  Calculation Type
                </label>
              </div>
            )}
          </div>

          {/* Dynamic Inputs */}
          {renderInputs()}

          {/* Calculate Button */}
          {eos && (eos === "M" || calculation) && (
            <button
              onClick={handleCalculate}
              className="mt-6 w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-[20px] font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.01] active:scale-95 transition-transform duration-300 animate-pulse-slow"
            >
              🚀 Calculate
            </button>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-10 p-5 bg-red-100 border border-red-300 text-red-800 rounded-xl shadow-sm animate-shake">
            <p className="font-bold">⚠️ Error: {error}</p>
          </div>
        )}

        {/* Results Section */}
        {renderResults()}

        {/* Gas Properties Table */}
        <div className="mt-12 bg-white rounded-2xl shadow-2xl p-8 border border-indigo-200 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-3xl font-extrabold text-indigo-700 tracking-tight mb-8 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-indigo-600 animate-bounce-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3"
              />
            </svg>
            Gas Properties
          </h3>

          <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-inner">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-200 to-indigo-300">
                  <th className="p-4 font-bold text-indigo-900 text-sm tracking-wide">
                    Gas
                  </th>
                  <th className="p-4 font-bold text-indigo-900 text-sm tracking-wide">
                    Tc [K]
                  </th>
                  <th className="p-4 font-bold text-indigo-900 text-sm tracking-wide">
                    Pc [kPa]
                  </th>
                  <th className="p-4 font-bold text-indigo-900 text-sm tracking-wide">
                    Vc [m³/kmol]
                  </th>
                  <th className="p-4 font-bold text-indigo-900 text-sm tracking-wide">
                    M [kg/kmol]
                  </th>
                  <th className="p-4 font-bold text-indigo-900 text-sm tracking-wide">
                    ω
                  </th>
                  <th className="p-4 font-bold text-indigo-900 text-sm tracking-wide">
                    R [kJ/kg.K]
                  </th>
                </tr>
              </thead>
              <tbody>
                {gases.map((gas, index) => {
                  const props = getGasProperties(gas);
                  return (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 transition-all duration-300 hover:scale-[1.01] hover:shadow-md hover:bg-indigo-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }`}
                    >
                      <td className="p-4 font-semibold text-gray-900">{gas}</td>
                      <td className="p-4 text-gray-800">{props.Tc}</td>
                      <td className="p-4 text-gray-800">{props.Pc}</td>
                      <td className="p-4 text-gray-800">{props.Vc}</td>
                      <td className="p-4 text-gray-800">{props.M}</td>
                      <td className="p-4 text-gray-800">{props.w}</td>
                      <td className="p-4 text-gray-800">{props.R}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        @keyframes shake {
          10%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          80% {
            transform: translateX(4px);
          }
          30%,
          50%,
          70% {
            transform: translateX(-8px);
          }
          40%,
          60% {
            transform: translateX(8px);
          }
        }
        .animate-shake {
          animation: shake 0.6s;
        }
      `}</style>
    </div>
  );
}
