import { useState } from "react";
import { getAllGasData } from "@/utils/gasData";
import { gasProperties } from "@/utils/gas";
import { cpData } from "@/utils/cpData";

export default function Properties() {
  const criticalData = getAllGasData();
  const thermoData = gasProperties();
  const cpRelation = cpData();
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("critical");

  const dataset =
    view === "critical"
      ? criticalData
      : view === "cp300"
      ? thermoData
      : cpRelation;

  const filteredGases = Object.keys(dataset || {}).filter((gas) =>
    gas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 md:p-12 font-sans flex flex-col">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
        Thermodynamic Properties Table
      </h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search for a gas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-gray-800 border border-gray-200 rounded-xl px-5 py-3 w-full max-w-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
        />
      </div>

      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        <button
          onClick={() => setView("critical")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
            view === "critical"
              ? "bg-indigo-600 text-white shadow-indigo-500/20"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300"
          }`}
        >
          Critical Properties
        </button>
        <button
          onClick={() => setView("cp300")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
            view === "cp300"
              ? "bg-indigo-600 text-white shadow-indigo-500/20"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300"
          }`}
        >
          Properties at 300K
        </button>
        <button
          onClick={() => setView("cpT")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
            view === "cpT"
              ? "bg-indigo-600 text-white shadow-indigo-500/20"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300"
          }`}
        >
          As a Function of Temperature
        </button>
      </div>

      {view === "critical" && (
        <div className="mb-6 text-left text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          Molar mass, gas constant, acentric factor, and critical-point
          properties
        </div>
      )}
      {view === "cp300" && (
        <div className="mb-6 text-left text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          Ideal-gas specific heats of various common gases at 300K.
        </div>
      )}
      {view === "cpT" && (
        <div className="mb-6 text-center text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          C<sub>p</sub> = a + bT + cT<sup>2</sup> + dT<sup>3</sup>
          <br />
          (T in K, C<sub>p</sub> in kJ/kmol.K)
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <div className="max-h-[60vh] overflow-y-auto rounded-2xl shadow-2xl bg-white/90 backdrop-blur-sm">
          <table className="min-w-full rounded-2xl overflow-hidden">
            <thead className="bg-indigo-600 text-white sticky top-0 z-10">
              {view === "critical" && (
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    Gas
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    M (kg/kmol)
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    R (kJ/kg.K)
                  </th>
                  <th className="py-4 px-10 text-left font-semibold text-sm md:text-base">
                    ω
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    Tc (K)
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    Pc (MPa)
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    Vc (m<sup>3</sup>/kmol)
                  </th>
                </tr>
              )}
              {view === "cp300" && (
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    Gas
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    C<sub>p</sub> (kJ/kg.K)
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    C<sub>v</sub> (kJ/kg.K)
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    k
                  </th>
                </tr>
              )}
              {view === "cpT" && (
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    Gas
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    a
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    b x 10<sup>2</sup>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    c x 10<sup>5</sup>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    d x 10<sup>9</sup>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                    Temperature range, K
                  </th>
                </tr>
              )}
            </thead>
            <tbody className="text-gray-700">
              {filteredGases.length > 0 ? (
                filteredGases.map((gas) => (
                  <tr
                    key={gas}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-indigo-50/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {gas}
                    </td>
                    {view === "critical" && (
                      <>
                        <td className="py-4 px-6">{criticalData[gas]?.M}</td>
                        <td className="py-4 px-6">{criticalData[gas]?.R}</td>
                        <td className="py-4 px-6">{criticalData[gas]?.w}</td>
                        <td className="py-4 px-6">{criticalData[gas]?.Tc}</td>
                        <td className="py-4 px-6">
                          {criticalData[gas]?.Pc / 1000}
                        </td>
                        <td className="py-4 px-6">{criticalData[gas]?.Vc}</td>
                      </>
                    )}
                    {view === "cp300" && (
                      <>
                        <td className="py-4 px-6">{thermoData[gas]?.cp}</td>
                        <td className="py-4 px-6">{thermoData[gas]?.cv}</td>
                        <td className="py-4 px-6">{thermoData[gas]?.k}</td>
                      </>
                    )}
                    {view === "cpT" && (
                      <>
                        <td className="py-4 px-6">{cpRelation[gas]?.a}</td>
                        <td className="py-4 px-6">{cpRelation[gas]?.b}</td>
                        <td className="py-4 px-6">{cpRelation[gas]?.c}</td>
                        <td className="py-4 px-6">{cpRelation[gas]?.d}</td>
                        <td className="py-4 px-6">{cpRelation[gas]?.t}</td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 px-6 text-center text-gray-500 text-base"
                  >
                    No gases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {view === "critical" && (
        <div className="mt-10 text-center text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          The unit kJ/kg.K is equivalent to kPa.m<sup>3</sup>/kg.K. The gas
          constant is calculated from R = Ru/M, where Ru = 8.31447 kJ/kmol.K and
          M is the molar mass.
        </div>
      )}
      {view === "cp300" && (
        <div className="mt-10 text-center text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          The unit kJ/kg.K is equivalent to kJ/kg.<sup>o</sup>C
        </div>
      )}

      <div className="mt-10 text-center text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
        Use the search above to quickly find a specific gas.
      </div>
    </div>
  );
}
