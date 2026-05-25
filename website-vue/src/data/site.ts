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
};

export const jobs: Job[] = [
  {
    title: 'Product Engineer',
    tab: 'Anaplan',
    company: 'Anaplan',
    range: 'Current',
    url: 'https://www.anaplan.com/',
    bullets: [
      'Working at the intersection of product engineering, data, and machine learning for enterprise planning software.',
      'Bringing a product-minded engineering approach to building practical, maintainable systems in a large-scale SaaS environment.',
    ],
  },
  {
    title: 'Staff Engineer',
    tab: 'Syrup',
    company: 'Syrup Tech',
    range: 'April 2022 - 2025',
    url: 'https://www.syrup.tech/',
    bullets: [
      'Joined Syrup as a Machine Learning Engineer and grew into Full Stack Engineer and Staff Engineer responsibilities across product and engineering.',
      'Worked on AI/ML-powered inventory decision-making software for commerce, translating forecasting and planning needs into production product capabilities.',
      'Contributed across the stack, combining machine learning systems, backend services, frontend product work, and practical engineering leadership in a startup environment.',
      'Helped shape maintainable engineering practices while staying close to product requirements, customer workflows, and fast iteration cycles.',
    ],
  },
  {
    title: 'Machine Learning Engineer',
    tab: 'DareData Engineering',
    company: 'DareData Engineering',
    range: 'June 2021 - 2024',
    url: 'https://www.daredata.ai/',
    bullets: [
      'Migrated cross-selling models from R into Python, improving them with new feature engineering, model architectures, and distributed hyperparameter optimization on Spark with Hyperopt.',
      'Pushed MLOps practices to operationalize machine learning models with MLflow, Databricks, AzureML, and the Azure platform.',
      'Built and deployed an MLOps pipeline to schedule GPU-ready models on Google Cloud Platform using Kubernetes and Airflow.',
      'Developed deep learning NLP pipelines for documentation summarization and entity extraction, populating Elasticsearch-backed systems.',
      'Planned and developed a computer vision proof of concept to estimate solar potential from satellite imagery using PyTorch and OpenCV, integrating outputs with GIS-based systems.',
    ],
  },
  {
    title: 'Software/Machine Learning Engineer',
    tab: 'Jungle',
    company: 'Jungle',
    range: 'May 2018 - June 2021',
    url: 'https://www.jungle.ai/',
    bullets: [
      'Researched and implemented Jungle’s core approach to predictive modelling for time-series data, building most modules from scratch with PyTorch.',
      'Contributed to 5+ projects in the energy and heavy industry sectors, applying predictive maintenance pipelines from data gathering through client-facing analysis.',
      'Designed, developed, and deployed internal and production-ready software, including ORM definitions, high-volume data processing tools, and FastAPI backend infrastructure for production deployments.',
      'Designed and implemented a database architecture refactor with Postgres and TimescaleDB for a scalable, high-performing and cost-effective solution.',
      'Built automated data collection and cleaning workflows with AWS S3 and Prefect to process 2k+ sensors with millisecond-frequency data.',
      'Built a CRUD RESTful API in Node.js for TimescaleDB and PostgreSQL databases used by Jungle products.',
      'Implemented, deployed, and maintained scalable distributed workflows using Argo, Kubernetes, and CI/CD pipelines.',
      'Designed, built, and managed internal dashboards and data warehouse solutions with InfluxDB and Grafana for high-volume analysis.',
    ],
  },
  {
    title: 'Master thesis internship',
    tab: 'Master Thesis',
    company: 'Jungle',
    range: 'August 2017 - May 2018',
    url: 'https://www.jungle.ai/',
    bullets: [
      'Had the opportunity to do my master thesis work in a professional environment. The main research goal was to study, implement and test the performance of different deep learning models and architectures applied to time-series problems, specifically in predictive maintenance and forecasting. This allowed me to be an active member of Jungle’s daily projects to establish their technology.',
    ],
  },
];
