import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, ExternalLink, Download, Moon, Sun, Code2, Rocket, Briefcase, Sparkles } from "lucide-react";

function ThemeStyles() {
  const css = `
  :root { --bg:#0b0f17; --fg:#e5e7eb; --muted:#b3c0d1; --muted-strong:#d1d5db; --primary:#3b82f6; --on-primary:#0b1220; --accent:rgba(59,130,246,0.12); --card:rgba(255,255,255,0.04); --border:rgba(255,255,255,0.12); }
  .light { --bg:#f8fafc; --fg:#0f172a; --muted:#475569; --muted-strong:#1f2937; --primary:#2563eb; --on-primary:#ffffff; --accent:rgba(37,99,235,0.08); --card:rgba(15,23,42,0.03); --border:rgba(15,23,42,0.12); }
  .bg-background{background-color:var(--bg);} .text-foreground{color:var(--fg);} .text-muted{color:var(--muted);} .text-muted-strong{color:var(--muted-strong);} .bg-primary{background-color:var(--primary);} .text-primary{color:var(--primary);} .text-primary-foreground{color:var(--on-primary);} .bg-accent{background-color:var(--accent);} .bg-card{background-color:var(--card);} .border-border{border-color:var(--border);} 
  `; return <style>{css}</style>;
}

const CONTENT = { profile: { name: "Shivam Singh", title: "Senior Data Platform Engineer", subtitle: "I build real‑time data platforms and production AI features.", location: "Dubai, UAE", avatarUrl: import.meta.env.BASE_URL + 'profile.png', resumeUrl: "https://docs.google.com/document/d/1to2sOPUrUXTaFN_Rna2FqLPIxRwVReWp/edit?usp=sharing", socials: { github: "https://github.com/paarivarik-engineer", linkedin: "https://www.linkedin.com/in/databoi/", email: "mailto:shivamsinghs485@gmail.com" } }, skills:["Apache Spark","Scala","PySpark","Delta Lake","Trino","Airflow","Hive","Python","SQL","Kafka","Debezium","Docker","Kubernetes","Terraform","Ansible","AWS","GCP","OCI","Redshift","PostgreSQL","MongoDB","LangChain","RAG","Vector DBs","OpenMetadata"], projects:[{name:"OCR Bank Statement Automation",description:"Automated extraction + classification of bank statement data using OCR/ML; orchestrated on Airflow (OCI).",tech:["Python","ML","OCR","OCI","Airflow"],link:"#",repo:"#"},{name:"Talk‑to‑Your‑Data",description:"Natural language → SQL across sources with guardrails and explorable plans.",tech:["LangChain","LLMs","DuckDB‑nsql","Flask"],link:"#",repo:"#"},{name:"AI Tutor",description:"RAG tutor powered by vector search and Gemini for step‑wise answers.",tech:["RAG","Vector DB","Gemini","LangChain","Python"],link:"#",repo:"#"},{name:"NRT CDC & Webhook Ingestion",description:"Debezium + Kafka + Spark to Delta Lake for near‑real‑time ingestion.",tech:["Debezium","Kafka","Spark","Delta Lake"],link:"#",repo:"#"}], experience:[{role:"Sr. Data Platform Engineer",company:"Alraedah Digital Finance",period:"Oct 2023 – Present",bullets:["Implemented real‑time Jira ingestion (5‑min → near real‑time).","Unified Airflow platform — ~50% savings.","Decoupled compute; shipped jobs on OCI containers.","Data‑lake on object storage with ADW compute.","Automated bank statement parsing with OCR & ML.","On‑prem Postgres → OCI migration with 0 downtime.","Built NLP→SQL app (Arabic + English) for Side GIG."]},{role:"Sr. Data Engineer",company:"Simpl BNPL",period:"Jun 2022 – Oct 2023",bullets:["Setup EDH from scratch; standardized ingestion.","Realtime via webhooks & Kafka.","Optimized pipelines (~8h → 55m).","API service for Looker migration; Pinot realtime POC."]},{role:"Data Engineer",company:"Razorpay",period:"Mar 2021 – Jun 2022",bullets:["CDC for Postgres ingestion in near real‑time.","Automated raw‑query report onboarding.","Compaction pipelines → 60% faster queries.","Event pipeline processing ~600k events/min."]},{role:"Spark Scala Developer",company:"Commonwealth Bank of Australia",period:"Jul 2018 – Feb 2021",bullets:["Pub‑sub pipeline for streaming dispute logs.","Core Spark pipelines for Kafka → multiple sinks."]}] };

const container = { hidden: { opacity: 0 }, show: (d = 0) => ({ opacity: 1, transition: { delay: d, staggerChildren: 0.08, when: "beforeChildren" } }) };
const item = { hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } } };

export default function App(){
  const [theme,setTheme]=useState('dark');
  useEffect(()=>{const r=document.documentElement; r.classList.remove('dark','light'); r.classList.add(theme);},[theme]);
  const {scrollYProgress}=useScroll();
  const scaleX=useSpring(scrollYProgress,{stiffness:120,damping:20,mass:0.2});
  return(
    <div className="min-h-screen bg-background text-foreground">
      <ThemeStyles/>
      <motion.div style={{scaleX}} className="fixed left-0 right-0 top-0 h-1 origin-left bg-primary z-50"/>
      <Nav theme={theme} setTheme={setTheme}/>
      <Hero profile={CONTENT.profile}/>
      <About/>
      <Skills skills={CONTENT.skills}/>
      <Projects projects={CONTENT.projects}/>
      <Experience items={CONTENT.experience}/>
      <Contact profile={CONTENT.profile}/>
      <Footer/>
      <BackToTop/>
      <BackgroundTechMesh/>
    </div>
  );
}

function Nav({theme,setTheme}){
  const [open,setOpen]=useState(false);
  const links=[{id:"home",label:"Home"},{id:"about",label:"About"},{id:"skills",label:"Skills"},{id:"projects",label:"Projects"},{id:"experience",label:"Experience"},{id:"contact",label:"Contact"}];
  const linkCls="text-sm font-mono transition-colors text-muted-strong hover:text-foreground";
  return(
    <header className="sticky top-0 z-40 border-b border-border backdrop-blur" style={{background:"color-mix(in oklab, var(--bg), transparent 30%)"}}>
      <div className="mx-auto max-w-6xl px-4 md:px-8 h-14 flex items-center justify-between gap-4">
        <a href="#home" className="font-semibold tracking-tight flex items-center gap-2 text-foreground" onClick={(e)=>{e.preventDefault();document.getElementById('home')?.scrollIntoView({behavior:'smooth'});}}>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary"><Rocket size={14}/></span>
          <span className="font-mono">Shivam.dev</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l=> (
            <a key={l.id} href={`#${l.id}`} onClick={(e)=>{e.preventDefault();document.getElementById(l.id)?.scrollIntoView({behavior:'smooth',block:'start'});}} className={linkCls}>{l.label}</a>
          ))}
          <a href={CONTENT.profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-accent font-mono text-muted-strong">
            <Download size={16}/> Resume
          </a>
          <button aria-label="Toggle theme" onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} className="rounded-full border border-border p-2 hover:bg-accent text-foreground" title={theme==='dark'?"Switch to light":"Switch to dark"}>
            {theme==='dark'? <Sun size={16}/> : <Moon size={16}/>}
          </button>
        </nav>
        <button className="md:hidden rounded-lg border border-border p-2 text-foreground" onClick={()=>setOpen(o=>!o)}>
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border">
          <div className="mx-auto max-w-6xl px-4 md:px-8 py-3 flex flex-col gap-2">
            {links.map(l=> (
              <a key={l.id} href={`#${l.id}`} onClick={(e)=>{e.preventDefault();document.getElementById(l.id)?.scrollIntoView({behavior:'smooth'}); setOpen(false);}} className="py-1 font-mono text-muted-strong">{l.label}</a>
            ))}
            <button onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 w-fit font-mono text-foreground">
              {theme==='dark' ? <Sun size={16}/> : <Moon size={16}/>}
              <span>Toggle theme</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Section({ id, eyebrow, title, children }){
  return(
    <section id={id} className="scroll-mt-20 py-20 md:py-28">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once:true, amount:0.2 }} className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.p variants={item} className="text-xs md:text-sm uppercase tracking-[0.25em] text-primary mb-2 font-mono">{eyebrow}</motion.p>
        <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-8 font-mono text-muted-strong">{title}</motion.h2>
        <motion.div variants={item}>{children}</motion.div>
      </motion.div>
    </section>
  );
}

function Feature({ icon, title, desc }){
  return (
    <motion.div whileHover={{ y: -3 }} className="rounded-2xl border border-border p-5 bg-card shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_40px_-12px_rgba(0,0,0,0.35)]">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary mb-3">{icon}</div>
      <h3 className="font-semibold mb-1 font-mono text-muted-strong">{title}</h3>
      <p className="text-sm text-muted">{desc}</p>
    </motion.div>
  );
}

function Hero({profile}){
  const ref=useRef(null);
  const {scrollYProgress}=useScroll({target:ref,offset:["start end","start start"]});
  const y=useTransform(scrollYProgress,[0,1],[0,-60]);

  const [isMd,setIsMd]=useState(false);
  useEffect(()=>{
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = () => setIsMd(mq.matches);
    handler();
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  },[]);
  
  return(
    <section id="home" ref={ref} className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-8 pt-16 md:pt-24 pb-16">
        <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-center">
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{type:'spring',stiffness:120,damping:16}}>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-primary mb-3 font-mono">HELLO, WORLD_</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="text-foreground">{profile.name}</span>
              <span className="block text-muted-strong text-2xl md:text-3xl mt-2 font-mono">{profile.title}</span>
            </h1>
            <p className="mt-5 text-muted text-lg md:text-xl max-w-2xl">{profile.subtitle}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#projects" onClick={(e)=>{e.preventDefault();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'});}} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm">View Projects <ArrowUpRight size={16}/></a>
              <a href={profile.resumeUrl}  target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"> <Download size={16}/> Download Resume</a>
            </div>
            <div className="mt-6 flex items-center gap-4 order-2 md:order-1">
              <IconLink href={profile.socials.github}  target="_blank" rel="noopener noreferrer" icon={<Github size={18}/>} label="GitHub"/>
              <IconLink href={profile.socials.linkedin}  target="_blank" rel="noopener noreferrer" icon={<Linkedin size={18}/>} label="LinkedIn"/>
              <IconLink href={profile.socials.email}  target="_blank" rel="noopener noreferrer" icon={<Mail size={18}/>} label="Email"/>
            </div>
          </motion.div>
          <motion.div style={{ y: isMd ? y : 0 }} className="relative mt-8 md:mt-0">
            <div className="relative mx-auto w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-border">
              <img src={profile.avatarUrl} alt={`${profile.name} avatar`} className="w-full h-full object-cover"/>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function About(){
  return(
    <Section id="about" eyebrow="About" title="What I do">
      <div className="grid md:grid-cols-3 gap-6">
        <Feature icon={<Code2 size={18}/>} title="Data & AI Engineering" desc="Streaming + batch ETL, dimensional models, and production LLM features with strict SLAs."/>
        <Feature icon={<Rocket size={18}/>} title="Performance & Scale" desc="Profiling, caching, partitioning, and indexing to squeeze real value out of infra."/>
        <Feature icon={<Briefcase size={18}/>} title="Product Mindset" desc="I ship—clean UI, fast feedback, and DX that teams actually enjoy using."/>
      </div>
    </Section>
  );
}

function Skills({skills}){
  return(
    <Section id="skills" eyebrow="Skills" title="Technologies I enjoy">
      <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{once:true,amount:0.2}} className="flex flex-wrap gap-2">
        {skills.map(s=> (
          <motion.li key={s} variants={item}><span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm bg-accent font-mono text-muted-strong"><Sparkles size={14}/> {s}</span></motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

function Projects({projects}){
  return(
    <Section id="projects" eyebrow="Work" title="Selected Projects">
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map(p=> <ProjectCard key={p.name} {...p}/>) }
      </div>
    </Section>
  );
}

function ProjectCard({name,description,tech,link,repo}){
  return(
    <motion.article whileHover={{y:-6}} className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="p-5">
        <h3 className="font-semibold text-lg flex items-center gap-2 font-mono text-muted-strong">{name}<ArrowUpRight className="opacity-70" size={16}/></h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map(t=> <span key={t} className="text-xs rounded-full border border-border px-2 py-0.5 bg-accent font-mono text-muted-strong">{t}</span>) }
        </div>
      </div>
      <div className="px-5 pb-5 flex items-center gap-3">
        <a href={link}  target="_blank" rel="noopener noreferrer" className="text-sm inline-flex items-center gap-1 underline-offset-2 text-muted-strong">Live <ExternalLink size={14}/></a>
        <span className="text-muted">•</span>
        <a href={repo}  target="_blank" rel="noopener noreferrer" className="text-sm inline-flex items-center gap-1 underline-offset-2 text-muted-strong">Code <Github size={14}/></a>
      </div>
    </motion.article>
  );
}

function Experience({items}){
  return(
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-border"/>
        <ul className="space-y-6">
          {items.map((e,idx)=> (
            <motion.li key={idx} initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{type:'spring',stiffness:120,damping:16}} className="relative pl-10">
              <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-primary"/>
              <div className="rounded-xl border border-border p-4 bg-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold font-mono text-muted-strong">{e.role} — {e.company}</h3>
                  <span className="text-xs text-muted-strong font-mono">{e.period}</span>
                </div>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted space-y-1">{e.bullets.map((b,i)=> <li key={i}>{b}</li>)}</ul>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Contact({profile}){
  return(
    <Section id="contact" eyebrow="Contact" title="Let's build something">
      <div className="rounded-2xl border border-border p-6 bg-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-lg font-medium text-muted-strong">Open to roles, consulting, and interesting side quests.</p>
          <p className="text-sm text-muted">Based in {profile.location}. Happy to chat!</p>
        </div>
        <div className="flex gap-3">
          <a href={profile.socials.email} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm"><Mail size={16}/> Email me</a>
          <a href={profile.socials.linkedin} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-strong"> <Linkedin size={16}/> Connect</a>
        </div>
      </div>
    </Section>
  );
}

function Footer(){
  const y=new Date().getFullYear();
  return(
    <footer className="py-10 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 md:px-8 text-sm text-muted flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {y} Shivam Singh. Built with React, Tailwind, and framer-motion.</p>
        <div className="flex items-center gap-4">
          <a href="#home" onClick={(e)=>{e.preventDefault();document.getElementById('home')?.scrollIntoView({behavior:'smooth'});}} className="hover:underline text-muted-strong">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

function IconLink({ href, icon, label, ...props }) {
  return (
    <a
      href={href}
      {...props}
      className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-border font-mono text-muted-strong"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function BackToTop(){ const {scrollYProgress}=useScroll(); const show=useTransform(scrollYProgress,[0.2,0.25],[0,1]); return(<motion.button style={{opacity:show}} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="fixed bottom-5 right-5 z-40 rounded-full border border-border bg-background px-3 py-2 text-sm text-muted-strong">↑ Top</motion.button>); }

function BackgroundTechMesh(){ return(<div className="pointer-events-none fixed inset-0 -z-10"/>); }
