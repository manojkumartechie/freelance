"use client";
import { motion } from "framer-motion";
import { MdWorkOutline } from "react-icons/md";

// Placeholder case studies
const caseStudies = [
  {
    title: "Real-time Analytics Pipeline",
    goals: "Enable real-time insights for e-commerce transactions.",
    approach: "Built a Spark streaming pipeline on AWS, integrated with Redshift and Tableau.",
    tools: ["Spark", "AWS", "Redshift", "Tableau"],
    challenges: "Handling high-velocity data and ensuring low-latency dashboards.",
    results: "Reduced reporting lag from 24h to 5min, improved business decisions.",
  },
  {
    title: "Automated ETL for Healthcare Data",
    goals: "Automate ingestion and cleaning of hospital records.",
    approach: "Designed Airflow DAGs for scheduled ETL, used Python for data cleaning.",
    tools: ["Airflow", "Python", "SQL"],
    challenges: "Complex data formats and strict compliance requirements.",
    results: "Cut manual effort by 80%, improved data quality and compliance.",
  },
];

// Case Studies section with animated cards
export default function CaseStudiesSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {caseStudies.map((cs, idx) => (
          <motion.div
            key={cs.title}
            className="glass soft-light p-8 rounded-2xl flex flex-col gap-3 shadow-lg hover:shadow-2xl transition animated"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MdWorkOutline className="text-2xl text-primary" />
              <span className="font-bold text-lg">{cs.title}</span>
            </div>
            <div className="text-sm opacity-80 mb-1"><b>Goals:</b> {cs.goals}</div>
            <div className="text-sm opacity-80 mb-1"><b>Approach:</b> {cs.approach}</div>
            <div className="flex flex-wrap gap-2 mb-1">
              {cs.tools.map((t) => (
                <span key={t} className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">{t}</span>
              ))}
            </div>
            <div className="text-sm opacity-80 mb-1"><b>Challenges:</b> {cs.challenges}</div>
            <div className="text-sm opacity-80"><b>Results:</b> {cs.results}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 