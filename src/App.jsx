import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, MapPin, Phone, Sun, Moon, Download, Briefcase, GraduationCap, Award } from 'lucide-react'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const resume = {
    name: "Shivam Singh",
    title: "Senior Data Platform Engineer",
    location: "Dubai, UAE",
    email: "shivamsinghs485@gmail.com",
    phone: "+971 545 254 120 | +91 6393 881 986",
    github: "https://github.com/paarivarik-engineer",
    linkedin: "https://www.linkedin.com/in/databoi/",
    photo: "/profile.png", // put your image as public/profile.png
    resumePdf: "https://docs.google.com/document/d/1to2sOPUrUXTaFN_Rna2FqLPIxRwVReWp/edit?usp=sharing",

    highlights: [
      "Near real-time CDC pipelines: Debezium → Kafka → Spark → Delta",
      "Webhook → Kafka → Spark ingestion for third-party and internal data",
      "Unified Airflow platform saving ~50% cost",
      "On-prem Postgres → OCI managed migration with near-zero downtime"
    ],

    skills: [
      { category: "Core", items: ["Apache Spark", "Scala", "PySpark", "Kafka", "Delta Lake", "Trino", "Airflow", "Hive", "Python", "SQL"] },
      { category: "Extras", items: ["Pinot (POC)", "Flask", "LangChain", "RAG", "Vector DBs"] },
      { category: "Tools", items: ["AWS (EMR, Glue, Redshift, MSK, ECS, ECR)", "OCI (ADW, GoldenGate, DataFlow, Containers)", "Docker", "Kubernetes", "Terraform", "Ansible"] }
    ],

    experience: [
      {
        role: "Sr. Data Platform Engineer",
        company: "Alraedah Digital Finance",
        period: "Oct 2023 – Present",
        points: [
          "Implemented real-time Jira ingestion (lag from 5 min to near real-time).",
          "Migrated ETLs to unified Airflow platform — 50% cost/resource savings.",
          "Decoupled compute from orchestrator; deployed jobs to OCI containers.",
          "Built data-lake on object storage with ADW as compute.",
          "Automated bank statement parsing using OCR & ML.",
          "Led on-prem Postgres → OCI migration with 0 downtime.",
          "Built NLP-to-SQL web app (Arabic + English) for CXOs."
        ]
      },
      {
        role: "Sr. Data Engineer",
        company: "Simpl BNPL",
        period: "Jun 2022 – Oct 2023",
        points: [
          "Setup EDH from scratch.",
          "Realtime ingestion via webhooks & Kafka.",
          "Optimized pipelines from ~8 hours to 55 minutes.",
          "Developed API service for Looker dashboard migration.",
          "POC for realtime reporting using Pinot."
        ]
      },
      {
        role: "Data Engineer",
        company: "Razorpay Private Limited",
        period: "Mar 2021 – Jun 2022",
        points: [
          "CDC pipeline for Postgres ingestion in near real-time.",
          "Automated raw query report onboarding.",
          "Built compaction pipelines for 60% faster queries.",
          "Managed event pipeline processing 600k events/minute."
        ]
      },
      {
        role: "Spark Scala Developer",
        company: "Commonwealth Bank of Australia",
        period: "Jul 2018 – Feb 2021",
        points: [
          "Pub-sub pipeline for streaming dispute logs.",
          "Core Spark pipelines for Kafka data → various sinks."
        ]
      }
    ],

    projects: [
      { name: "OCR Bank Statement Automation", tech: "Python, ML, OCR, OCI, Airflow" },
      { name: "Talk-to-Your-Data", tech: "LangChain, LLMs, DuckDB-nsql, Flask" },
      { name: "AI Tutor", tech: "RAG, Vector DB, Gemini, LangChain, Python" },
      { name: "NRT CDC & Webhook Ingestion", tech: "Debezium, Kafka, Spark, Delta Lake" }
    ],

    education: [
      { degree: "Bachelor of Computer Applications", institution: "" }
    ],

    certifications: [
      { name: "Optimizing Apache Spark on Databricks", issuer: "Databricks" },
      { name: "3rd Prize – Programming Competition", issuer: "National IT Convention" }
    ]
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b dark:border-gray-700">
        <h1 className="text-xl font-bold">{resume.name}</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto p-6 text-center">
        <motion.img
          src={resume.photo}
          alt={resume.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300 dark:border-gray-600 object-cover"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        />
        <h2 className="text-3xl font-bold">{resume.title}</h2>
        <p className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
          <MapPin size={16} /> {resume.location}
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <a href={`mailto:${resume.email}`}><Mail /></a>
          <a href={resume.github} target="_blank" rel="noreferrer"><Github /></a>
          <a href={resume.linkedin} target="_blank" rel="noreferrer"><Linkedin /></a>
        </div>
        <a href={resume.resumePdf} target="_blank" className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Download size={16} className="mr-2" /> Download Resume
        </a>
      </section>

      {/* Highlights */}
      <section className="max-w-4xl mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-4">Highlights</h3>
        <ul className="list-disc pl-6 space-y-2">
          {resume.highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      </section>

      {/* Skills */}
      <section className="max-w-4xl mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {resume.skills.map((s, i) => (
            <div key={i} className="p-4 border dark:border-gray-700 rounded">
              <h4 className="font-semibold">{s.category}</h4>
              <p>{s.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-4xl mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Briefcase /> Experience</h3>
        {resume.experience.map((exp, i) => (
          <div key={i} className="mb-6">
            <h4 className="text-lg font-bold">{exp.role} – {exp.company}</h4>
            <p className="text-sm text-gray-500">{exp.period}</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              {exp.points.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="max-w-4xl mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-4">Projects</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {resume.projects.map((proj, i) => (
            <div key={i} className="p-4 border dark:border-gray-700 rounded">
              <h4 className="font-semibold">{proj.name}</h4>
              <p className="text-sm text-gray-500">{proj.tech}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="max-w-4xl mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-4"><GraduationCap className="inline mr-2" />Education</h3>
        {resume.education.map((edu, i) => (
          <p key={i}>{edu.degree}</p>
        ))}
        <h3 className="text-2xl font-semibold mb-4 mt-6"><Award className="inline mr-2" />Certifications</h3>
        <ul className="list-disc pl-6">
          {resume.certifications.map((c, i) => <li key={i}>{c.name} – {c.issuer}</li>)}
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-center p-6 text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700">
        © {new Date().getFullYear()} {resume.name}
      </footer>
    </div>
  )
}