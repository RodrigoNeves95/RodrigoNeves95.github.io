<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';

import { jobs } from '@/data/site';

const activeIndex = ref(0);
const tabRefs = ref<HTMLButtonElement[]>([]);
const activeJob = computed(() => jobs[activeIndex.value]);

const setTabRef = (element: unknown, index: number) => {
  if (element instanceof HTMLButtonElement) {
    tabRefs.value[index] = element;
  }
};

const selectJob = async (index: number) => {
  activeIndex.value = index;
  await nextTick();
  tabRefs.value[index]?.focus();
};

const selectPrevious = () => {
  void selectJob(activeIndex.value === 0 ? jobs.length - 1 : activeIndex.value - 1);
};

const selectNext = () => {
  void selectJob(activeIndex.value === jobs.length - 1 ? 0 : activeIndex.value + 1);
};
</script>

<template>
  <section id="jobs" class="container-section max-w-[700px] scroll-mt-28">
    <h2 class="section-heading">Where I've Worked</h2>

    <div class="flex max-[600px]:block">
      <ul
        role="tablist"
        aria-label="Job tabs"
        class="job-tabs relative z-[3] m-0 w-max flex-none list-none p-0"
        @keydown.up.prevent="selectPrevious"
        @keydown.down.prevent="selectNext"
        @keydown.left.prevent="selectPrevious"
        @keydown.right.prevent="selectNext"
      >
        <li v-for="(job, index) in jobs" :key="job.company + job.range" class="job-tab-item">
          <button
            :id="`job-tab-${index}`"
            :ref="(element) => setTabRef(element, index)"
            type="button"
            role="tab"
            :aria-selected="activeIndex === index"
            :aria-controls="`job-panel-${index}`"
            :tabindex="activeIndex === index ? 0 : -1"
            class="job-tab-button flex h-[var(--tab-height)] w-full items-center whitespace-nowrap bg-transparent px-5 pb-0.5 text-left font-mono text-[13px] transition hover:bg-navy-light focus:bg-navy-light focus:outline-none max-md:px-[15px] max-[600px]:min-w-[var(--tab-width)] max-[600px]:justify-center max-[600px]:px-[15px] max-[600px]:text-center"
            :class="activeIndex === index ? 'text-mint' : 'text-slate'"
            @click="void selectJob(index)"
          >
            <span>{{ job.tab }}</span>
          </button>
        </li>

        <div
          class="job-tab-highlight absolute left-0 top-0 z-10 h-[var(--tab-height)] w-0.5 rounded bg-mint transition-transform duration-200"
          :style="{ '--active-tab': activeIndex }"
          aria-hidden="true"
        />
      </ul>

      <Transition
        mode="out-in"
        enter-active-class="transition duration-150"
        enter-from-class="opacity-0"
      >
        <article
          :id="`job-panel-${activeIndex}`"
          :key="activeJob.company + activeJob.range"
          role="tabpanel"
          :aria-labelledby="`job-tab-${activeIndex}`"
          tabindex="0"
          class="w-full min-w-0 pt-[10px] pl-5 max-[600px]:pl-0 md:pl-[30px]"
        >
          <h3 class="mb-[5px] text-[22px] font-medium text-slate-lighter">
            {{ activeJob.title }}
            <span class="text-mint">
              @
              <a
                :href="activeJob.url"
                class="accent-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ activeJob.company }}
              </a>
            </span>
          </h3>
          <p class="mb-[30px] mt-0 font-mono text-[13px] leading-normal text-slate-light">
            {{ activeJob.range }}
          </p>
          <ul class="m-0 mt-5 list-none p-0 text-[18px]">
            <li
              v-for="bullet in activeJob.bullets"
              :key="bullet"
              class="relative mb-[10px] pl-[30px]"
            >
              <span class="absolute left-0 text-mint" aria-hidden="true">▹</span>
              <span>{{ bullet }}</span>
            </li>
          </ul>
          <ul v-if="activeJob.links?.length" class="mt-6 flex flex-wrap gap-3 p-0">
            <li v-for="link in activeJob.links" :key="link.url" class="list-none">
              <a
                :href="link.url"
                class="button-link px-4 py-2 text-[12px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </article>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.job-tab-button {
  border-left: 2px solid var(--lightest-navy);
}

.job-tab-highlight {
  transform: translateY(calc(var(--active-tab) * var(--tab-height)));
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;
}

@media (max-width: 600px) {
  .job-tabs {
    display: flex;
    width: calc(100% + 100px);
    margin-left: -50px;
    margin-bottom: 30px;
    overflow-x: auto;
  }

  .job-tab-item:first-of-type {
    margin-left: 50px;
  }

  .job-tab-item:last-of-type {
    padding-right: 50px;
  }

  .job-tab-button {
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
  }

  .job-tab-highlight {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(var(--active-tab) * var(--tab-width)));
  }
}

@media (max-width: 480px) {
  .job-tabs {
    width: calc(100% + 50px);
    margin-left: -25px;
  }

  .job-tab-item:first-of-type {
    margin-left: 25px;
  }

  .job-tab-item:last-of-type {
    padding-right: 25px;
  }

  .job-tab-highlight {
    margin-left: 25px;
  }
}
</style>
