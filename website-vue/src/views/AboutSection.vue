<script setup lang="ts">
import avatarUrl from '@/assets/me.png';
import { skills } from '@/data/site';
</script>

<template>
  <section id="about" class="container-section max-w-[900px] scroll-mt-28">
    <h2 class="section-heading">About Me</h2>

    <div class="grid gap-[50px] md:grid-cols-[3fr_2fr]">
      <div>
        <p>
          I'm a product-minded engineer currently working at
          <a class="accent-link" href="https://www.anaplan.com/">Anaplan</a>. My background sits at
          the intersection of machine learning, software engineering, and product delivery, with a
          strong bias toward systems that are useful, maintainable, and ready for real users.
        </p>
        <p>
          Before Anaplan, I worked with
          <a class="accent-link" href="https://www.syrup.tech/">Syrup Tech</a>
          on AI/ML-powered inventory decision-making software for commerce, growing from machine
          learning engineering into full-stack and staff-level responsibilities. That role sharpened
          the part of engineering I enjoy most: staying close to product needs while building
          systems that can survive real operational use.
        </p>
        <p>
          Earlier, I worked with
          <a class="accent-link" href="https://www.daredata.ai/">DareData</a>
          as a machine learning engineer consultant, helping teams move models and AI pipelines from
          proof-of-concept into production. That work included MLOps pipelines, distributed model
          optimization, cloud deployments, computer vision, NLP systems, and integrations across
          Azure, GCP, Kubernetes, Airflow, Databricks, and MLflow.
        </p>
        <p>
          I started my professional path at
          <a class="accent-link" href="https://www.jungle.ai/">Jungle AI</a>, where a master thesis
          internship grew into a software and machine learning engineering role. Working across data
          science, backend services, databases, dashboards, CI/CD, Kubernetes workflows, and MLOps
          gave me a broad view of how modern ML products actually come together.
        </p>
        <p>
          I received a master's degree in Electrical and Computer Engineering from
          <a class="accent-link" href="https://tecnico.ulisboa.pt/en/">
            Instituto Superior Tecnico</a
          >, with a thesis focused on deep learning strategies for time-series prediction.
        </p>
        <p>Here are a few technologies I've worked with recently:</p>

        <ul
          class="mt-5 grid list-none grid-cols-2 gap-x-0 gap-y-[10px] overflow-hidden p-0 font-mono text-[13px] sm:grid-cols-3"
        >
          <li v-for="skill in skills" :key="skill" class="relative pl-5">
            <span class="absolute left-0 text-[14px] leading-3 text-mint" aria-hidden="true">
              ▹
            </span>
            {{ skill }}
          </li>
        </ul>
      </div>

      <div class="relative mx-auto mt-[50px] w-[70%] max-w-[300px] md:mx-0 md:mt-0 md:w-full">
        <div class="group relative">
          <div
            class="absolute left-5 top-5 -z-10 h-full w-full rounded border-2 border-mint transition group-hover:left-[15px] group-hover:top-[15px]"
            aria-hidden="true"
          />
          <img
            :src="avatarUrl"
            alt="Rodrigo Neves"
            width="600"
            height="600"
            loading="lazy"
            class="relative rounded bg-mint object-cover grayscale transition group-hover:grayscale-0"
          />
        </div>
      </div>
    </div>
  </section>
</template>
