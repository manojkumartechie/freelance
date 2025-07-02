"use client";
import { motion } from "framer-motion";
import { MdArticle } from "react-icons/md";

// Placeholder articles
const articles = [
  { title: "How to Build Robust Data Pipelines", comingSoon: true },
  { title: "Modern ETL with Python & Spark", comingSoon: true },
  { title: "Cloud Data Engineering: AWS vs GCP", comingSoon: true },
];

// Articles section with animated placeholder cards
export default function ArticlesSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Articles & Insights</h2>
      <p className="text-lg opacity-80 mb-6 text-center max-w-2xl">
        I&apos;ll soon be sharing articles on data engineering, tech trends, and tutorials. Stay tuned for insights and practical guides!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {articles.map((a, idx) => (
          <motion.div
            key={a.title}
            className="glass soft-light p-6 rounded-2xl flex flex-col items-center gap-3 shadow-lg animate-pulse"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            viewport={{ once: true }}
          >
            <MdArticle className="text-4xl text-primary mb-2" />
            <span className="font-semibold text-base text-center">{a.title}</span>
            <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full mt-2">Coming Soon</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
 