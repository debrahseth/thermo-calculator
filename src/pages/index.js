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
      Methane: { Tc: 190.56, Pc: 4599.2, Vc: 0.09836, M: 16.04, w: 0.0115 },
      Ethane: { Tc: 305.23, Pc: 4872, Vc: 0.1455, M: 30.07, w: 0.0995 },
      Propane: { Tc: 369.83, Pc: 4260, Vc: 0.1998, M: 44.1, w: 0.1523 },
      Pentane: { Tc: 469.7, Pc: 3370, Vc: 0.304, M: 72.15, w: 0.251 },
      CarbonDioxide: { Tc: 304.12, Pc: 7380, Vc: 0.0943, M: 44.01, w: 0.2239 },
      Ethylene: { Tc: 282.35, Pc: 5040, Vc: 0.1242, M: 28.052, w: 0.087 },
      Air: { Tc: 132.5, Pc: 3770, Vc: 0.0883, M: 28.97, w: 0.0335 },
      Ammonia: { Tc: 405.5, Pc: 1128, Vc: 0.0724, M: 17.03, w: 0.256 },
      Argon: { Tc: 151, Pc: 4860, Vc: 0.0749, M: 39.948, w: 0.001 },
      Benzene: { Tc: 562, Pc: 4920, Vc: 0.2603, M: 78.115, w: 0.212 },
      Butane: { Tc: 452.5, Pc: 3796, Vc: 0.2547, M: 58.124, w: 0.2 },
      CarbonMonoxide: { Tc: 133, Pc: 3500, Vc: 0.093, M: 28.011, w: 0.0497 },
      "Ethyl Alcohol": { Tc: 516, Pc: 6380, Vc: 0.1673, M: 46.07, w: 0.644 },
      Helium: { Tc: 5.3, Pc: 230, Vc: 0.0578, M: 4.003, w: -0.3835 },
      Hexane: { Tc: 507.9, Pc: 3030, Vc: 0.3677, M: 86.179, w: 0.3 },
      Hydrogen: { Tc: 33.3, Pc: 1300, Vc: 0.0649, M: 2.016, w: -0.219 },
      "Methyl Alcohol": { Tc: 513.2, Pc: 7950, Vc: 0.118, M: 32.042, w: 0.556 },
      Nitrogen: { Tc: 126.2, Pc: 3390, Vc: 0.0899, M: 28.013, w: 0.04 },
      Oxygen: { Tc: 154.8, Pc: 5080, Vc: 0.078, M: 31.999, w: 0.022 },
      Propylene: { Tc: 365, Pc: 4620, Vc: 0.181, M: 42.081, w: 0.144 },
      Water: { Tc: 647.1, Pc: 22060, Vc: 0.056, M: 18.015, w: 0.344 },
      Cyclohexane: { Tc: 553.64, Pc: 4070, Vc: 0.308, M: 84.16, w: 0.212 },
      Acetone: { Tc: 508.1, Pc: 4760, Vc: 0.209, M: 58.08, w: 0.304 },
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
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">a</span> = {results.a}{" "}
                  m⁶·kPa/kmol²
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">b</span> = {results.b} m³/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">A</span> = {results.A}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">B</span> = {results.B}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Z</span> = {results.Z}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Zg</span> = {results.Zg}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Zl</span> = {results.Zl}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Vg</span> = {results.Vg}{" "}
                  m³/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Vl</span> = {results.Vl}{" "}
                  m³/kmol
                </p>
              </div>
            </div>
          </div>
        );
      } else if (calculation === "2") {
        return (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Δh_ideal</span> ={" "}
                  {results.dh_ideal} kJ/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Δh</span> = {results.dh}{" "}
                  kJ/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Δs_ideal</span> ={" "}
                  {results.ds_ideal} kJ/kmol·K
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Δs</span> = {results.ds}{" "}
                  kJ/kmol·K
                </p>
              </div>
              {results.dh_kg && (
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <p className="text-gray-700">
                    <span className="font-semibold">Δh_kg</span> ={" "}
                    {results.dh_kg} kJ/kg
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      } else if (calculation === "3") {
        return (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">a</span> = {results.a}{" "}
                  m⁶·kPa/kmol²
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">b</span> = {results.b} m³/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">A</span> = {results.A}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">B</span> = {results.B}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Z</span> = {results.Z}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Zg</span> = {results.Zg}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">H_dep</span> = {results.H_dep}{" "}
                  kJ/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">S_dep</span> = {results.S_dep}{" "}
                  kJ/kmol·K
                </p>
              </div>
            </div>
          </div>
        );
      } else if (calculation === "4") {
        return (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">a</span> = {results.a}{" "}
                  m⁶·kPa/kmol²
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">b</span> = {results.b} m³/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">A</span> = {results.A}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">B</span> = {results.B}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Z</span> = {results.Z}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Zg</span> = {results.Zg}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">ln φ</span> = {results.ln_phi}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">φ</span> = {results.phi}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Fugacity</span> ={" "}
                  {results.fug} kPa
                </p>
              </div>
            </div>
          </div>
        );
      }
    } else if (eos === "B") {
      if (calculation === "1") {
        return (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">a</span> = {results.a}{" "}
                  m⁶·kPa/kmol²
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">b</span> = {results.b} m³/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">A</span> = {results.A}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">B</span> = {results.B}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Z</span> = {results.Z}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Zg</span> = {results.Zg}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Zl</span> = {results.Zl}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Vg</span> = {results.Vg}{" "}
                  m³/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Vl</span> = {results.Vl}{" "}
                  m³/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">H_dep</span> = {results.H_dep}{" "}
                  kJ/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">S_dep</span> = {results.S_dep}{" "}
                  kJ/kmol·K
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">U_dep</span> = {results.U_dep}{" "}
                  kJ/kmol
                </p>
              </div>
            </div>
          </div>
        );
      } else if (calculation === "2") {
        return (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">a</span> = {results.a}{" "}
                  m⁶·kPa/kmol²
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">b</span> = {results.b} m³/kmol
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">A</span> = {results.A}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">B</span> = {results.B}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Z</span> = {results.Z}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Zg</span> = {results.Zg}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">ln φ</span> = {results.ln_phi}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">φ</span> = {results.phi}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Fugacity</span> ={" "}
                  {results.fug} kPa
                </p>
              </div>
            </div>
          </div>
        );
      }
    } else if (eos === "M") {
      return (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            Mixture Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Components</span> ={" "}
                {results.comp}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">a</span> ={" "}
                {results.a.join(", ")} m⁶·kPa/kmol²
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">b</span> ={" "}
                {results.b.join(", ")} m³/kmol
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">A</span> ={" "}
                {results.A.join(", ")}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">B</span> ={" "}
                {results.B.join(", ")}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">τ_i</span> ={" "}
                {results.tau_i.join(", ")}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Z</span> = {results.Z}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">z_mix</span> = {results.z_mix}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">z_liquid</span> ={" "}
                {results.z_liquid}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">a_mix</span> = {results.a_mix}{" "}
                m⁶·kPa/kmol²
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">b_mix</span> = {results.b_mix}{" "}
                m³/kmol
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Amix</span> = {results.Amix}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Bmix</span> = {results.Bmix}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">v_mix</span> = {results.v_mix}{" "}
                m³/kmol
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">H_dep</span> = {results.H_dep}{" "}
                kJ/kmol
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">S_dep</span> = {results.S_dep}{" "}
                kJ/kmol·K
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Zc_ij</span> = {results.Zc_ij}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">θ_mix</span> ={" "}
                {results.theta_mix}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">ln φ_i</span> ={" "}
                {results.Ln_phai.join(", ")}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">φ_i</span> ={" "}
                {results.phai.join(", ")}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Fugacity</span> ={" "}
                {results.fug.join(", ")} kPa
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Head>
        <title>Equation of State Calculator</title>
        <meta
          name="description"
          content="Calculate thermodynamic properties using various equations of state."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0 bg-indigo-600 text-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Equation of State Calculator</h1>
          <p className="text-sm">Powered by xAI</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Input Parameters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <select
                onChange={(e) => {
                  setEos(e.target.value);
                  setCalculation("");
                  setResults(null);
                  setError("");
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
              >
                <option value="">Select EOS</option>
                <option value="A">Van der Waals EOS</option>
                <option value="B">Peng-Robinson EOS</option>
                <option value="M">Mixture Calculations</option>
              </select>
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                >
                  <option value="">Select Calculation</option>
                  <option value="1">Z, Vg, Vl</option>
                  <option value="2">Δh, Δs</option>
                  <option value="3">H_dep, S_dep</option>
                  <option value="4">Fugacity</option>
                </select>
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                >
                  <option value="">Select Calculation</option>
                  <option value="1">Z, Vg, Vl, H_dep, S_dep, U_dep</option>
                  <option value="2">Fugacity</option>
                </select>
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm text-gray-600">
                  Calculation Type
                </label>
              </div>
            )}
          </div>
          {renderInputs()}
          {eos && (eos === "M" || calculation) && (
            <button
              onClick={handleCalculate}
              className="mt-6 w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Calculate
            </button>
          )}
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-lg">
            <p className="font-semibold">Error: {error}</p>
          </div>
        )}

        {renderResults()}

        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Gas Properties
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="p-3 font-semibold text-gray-700">Gas</th>
                  <th className="p-3 font-semibold text-gray-700">Tc [K]</th>
                  <th className="p-3 font-semibold text-gray-700">Pc [kPa]</th>
                  <th className="p-3 font-semibold text-gray-700">
                    Vc [m³/kmol]
                  </th>
                  <th className="p-3 font-semibold text-gray-700">
                    M [kg/kmol]
                  </th>
                  <th className="p-3 font-semibold text-gray-700">ω</th>
                </tr>
              </thead>
              <tbody>
                {gases.map((gas, index) => {
                  const props = getGasProperties(gas);
                  return (
                    <tr
                      key={index}
                      className={`border-b hover:bg-indigo-50 transition-colors ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="p-3">{gas}</td>
                      <td className="p-3">{props.Tc}</td>
                      <td className="p-3">{props.Pc}</td>
                      <td className="p-3">{props.Vc}</td>
                      <td className="p-3">{props.M}</td>
                      <td className="p-3">{props.w}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
