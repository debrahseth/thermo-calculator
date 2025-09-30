import { useState } from "react";
import { getAllGasData } from "../utils/gasData";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Properties() {
  const allGases = getAllGasData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGases = Object.keys(allGases).filter((gas) =>
    gas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6 md:p-10 font-sans flex flex-col">
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2 text-lg" />
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 tracking-tight">
        Thermodynamic Properties Table
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for a gas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-gray-900 border border-gray-200 rounded-lg px-4 py-3 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white placeholder-gray-400"
        />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="max-h-[60vh] overflow-y-auto rounded-lg shadow-xl">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-blue-600 text-white sticky top-0 z-10">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                  Gas
                </th>
                <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                  Tc (K)
                </th>
                <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                  Pc (kPa)
                </th>
                <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                  M (g/mol)
                </th>
                <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                  ω (Acentric factor)
                </th>
                <th className="py-4 px-6 text-left font-semibold text-sm md:text-base">
                  Vc (L/mol)
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredGases.length > 0 ? (
                filteredGases.map((gas) => (
                  <tr
                    key={gas}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {gas}
                    </td>
                    <td className="py-4 px-6">{allGases[gas].Tc}</td>
                    <td className="py-4 px-6">{allGases[gas].Pc}</td>
                    <td className="py-4 px-6">{allGases[gas].M}</td>
                    <td className="py-4 px-6">{allGases[gas].w}</td>
                    <td className="py-4 px-6">{allGases[gas].Vc}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 px-6 text-center text-gray-500"
                  >
                    No gases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm md:text-base">
        Use the search above to quickly find a specific gas.
      </div>
    </div>
  );
}
