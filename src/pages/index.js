import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <img
          src="../.././thermo-banner.png"
          alt="Thermodynamics Banner"
          className={styles.heroImage}
        />
        <h1 className={styles.title}>Welcome to Thermodynamics Learning Hub</h1>
        <p className={styles.typewriter}>
          Your companion for mastering Thermodynamics concepts.
        </p>

        <p className={styles.subtitleExtra}>
          Learn faster with interactive tools, step-by-step guidance, and clear
          visual explanations. Whether you're exploring the first law of
          thermodynamics or delving into entropy calculations, we've got you
          covered!
        </p>
      </header>

      <section className={styles.cards}>
        <div
          className={`${styles.card} cursor-not-allowed opacity-60`}
          onClick={() => setShowMessage(true)}
          title="This part is still under construction"
        >
          <img
            src="../.././thermo1.png"
            alt="Thermo One"
            className={styles.cardImage}
          />
          <h2>Thermodynamics 1</h2>
          <p>
            Start with the basics: energy, work, and heat transfer problems.
          </p>
        </div>

        <Link href="/thermo-two" className={styles.card}>
          <img
            src="../.././thermo2.png"
            alt="Thermo Two"
            className={styles.cardImage}
          />
          <h2>Thermodynamics 2</h2>
          <p>
            Dive deeper into advanced topics: entropy, Gibbs free energy, and
            cycles.
          </p>
        </Link>

        <Link href="/properties" className={styles.card}>
          <img
            src="../.././properties.png"
            alt="Thermodynamic Properties"
            className={styles.cardImage}
          />
          <h2>Properties Table</h2>
          <p>
            Key thermodynamic data: specific heats, enthalpy, entropy, and more.
          </p>
        </Link>

        {showMessage && (
          <div className="fixed top-4 right-4 bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-2 rounded shadow-lg">
            Thermodynamics 1 is still under construction! 🚧
            <button
              className="ml-4 text-sm font-bold"
              onClick={() => setShowMessage(false)}
            >
              Close
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
