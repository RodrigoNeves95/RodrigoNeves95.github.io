import type { Component } from 'vue';
import { Github, Linkedin, Twitter } from 'lucide-vue-next';

export const email = 'rodrigo.f.l.neves@gmail.com';

export const navLinks = [
  { name: 'About', url: '/#about' },
  { name: 'Experience', url: '/#jobs' },
  { name: 'Contact', url: '/#contact' },
  { name: 'Feeling Bored?', url: '/snake' },
] as const;

export type SocialLink = {
  name: string;
  url: string;
  icon: Component;
};

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/RodrigoNeves95',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rodrigoflneves',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/RNeves27',
    icon: Twitter,
  },
];

export const skills = [
  'Python',
  'TypeScript',
  'AWS',
  'GCP',
  'Kubernetes',
  'AI Agents',
  'Vector Search',
  'MCP',
  'PyTorch',
  'Spark',
  'Airflow',
  'Prefect',
  'Docker',
  'Argo',
  'MLflow',
  'FastAPI',
  'Databricks',
  'PostgreSQL',
  'Snowflake',
  'dbt',
  'InfluxDB',
  'Grafana',
  'Elasticsearch',
  'Redis',
];

export type Job = {
  title: string;
  tab: string;
  company: string;
  range: string;
  url: string;
  bullets: string[];
  links?: { label: string; url: string }[];
};

export const jobs: Job[] = [
  {
    title: 'Staff Engineer',
    tab: 'Anaplan',
    company: 'Anaplan - AI Engineering Division',
    range: 'Sep 2025 - Present',
    url: 'https://www.anaplan.com/',
    bullets: [
      'Joined Anaplan through Syrup’s successful acquisition, leading technical integration work to bridge Syrup’s startup architecture, data flows, and product workflows into Anaplan’s enterprise environment.',
      'Laid foundations for the next product phase by translating deep Syrup product knowledge into scalable technical strategy, integration plans, and production-ready architecture.',
      'Currently focused on innovation-track work for Anaplan-native agentic and conversational platform capabilities, including agents, chat experiences, MCP-style tool integrations, retrieval/vector search, and production-grade AI application architecture.',
    ],
    links: [
      {
        label: 'Anaplan acquisition of Syrup Tech',
        url: 'https://www.anaplan.com/news/anaplan-announces-acquisition-of-syrup-tech/',
      },
    ],
  },
  {
    title: 'Founding Engineer / Staff Engineer',
    tab: 'Syrup',
    company: 'Syrup Tech',
    range: 'Apr 2022 - Sep 2025',
    url: 'https://www.syrup.tech/',
    bullets: [
      'Joined as Founding Engineer #2 at pre-seed and grew into Staff Engineer responsibilities, helping scale Syrup from 0-to-1 product-market fit into an enterprise-ready platform and successful acquisition by Anaplan.',
      'Led core optimization and intelligence systems for retail inventory decisions, reducing critical recommendation runtimes from 8+ hours to under 1 hour while automating previously manual workflows.',
      'Owned end-to-end product delivery across ML/data pipelines, backend services, frontend UX, and cloud infrastructure, partnering directly with founders and customers on high-stakes deployments.',
      'Led platform maturation work including multi-tenant architecture, migration planning, tenant onboarding, reliability, performance, and cost improvements across Snowflake/dbt, Postgres, and application services.',
      'Co-led a greenfield Buying product POC from discovery to production in 3 months, running 20+ customer/expert interviews, shipping 2 beta pilots, and integrating forecasting outputs into an interactive recommendation workflow.',
    ],
    links: [
      {
        label: 'Successful acquisition by Anaplan',
        url: 'https://www.anaplan.com/news/anaplan-announces-acquisition-of-syrup-tech/',
      },
    ],
  },
  {
    title: 'Machine Learning Engineer',
    tab: 'DareData',
    company: 'DareData Engineering',
    range: 'Jun 2021 - Apr 2022',
    url: 'https://www.daredata.ai/',
    bullets: [
      'Engineered ML and MLOps systems for enterprise clients, including cross-selling models migrated from R to Python with improved feature engineering, distributed hyperparameter optimization, MLflow, Databricks, and AzureML.',
      'Built GPU-ready NLP deployment pipelines on GCP with Kubernetes and Airflow for summarization and entity extraction into Elasticsearch-backed systems.',
      'Developed a computer vision proof of concept for solar potential estimation from satellite imagery using PyTorch, OpenCV, and GIS integrations.',
    ],
  },
  {
    title: 'Machine Learning/Software Engineer',
    tab: 'Jungle',
    company: 'Jungle',
    range: 'Jun 2018 - Jun 2021',
    url: 'https://www.jungle.ai/',
    bullets: [
      'Spearheaded core predictive modeling work for time-series use cases, contributing to 5+ energy and heavy-industry projects from data ingestion through client-facing analysis.',
      'Built production software across FastAPI services, Node.js APIs, Postgres/TimescaleDB schemas, AWS S3 data pipelines, Prefect workflows, and high-volume sensor processing.',
      'Implemented scalable workflows with Argo, Kubernetes, and CI/CD, plus internal analytics and warehousing systems with InfluxDB and Grafana.',
    ],
  },
  {
    title: 'Graduate Student',
    tab: 'Master Thesis',
    company: 'Jungle',
    range: 'Aug 2017 - May 2018',
    url: 'https://www.jungle.ai/',
    bullets: [
      'Completed master’s thesis work in a professional startup setting, studying deep learning architectures for time-series prediction and contributing to early predictive maintenance product work.',
    ],
    links: [
      {
        label: 'Read master’s thesis',
        url: 'https://fenix.tecnico.ulisboa.pt/downloadFile/563345090416188/Thesis.pdf',
      },
    ],
  },
];
