<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import { columns, type Direction, queueDirection, restartGame, rows, stepGame } from '@/game/snake';

const game = ref(restartGame());
const highScore = ref(0);
const speed = ref(70);
let intervalId: number | undefined;

const boardStyle = {
  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  width: 'min(100%, 600px)',
  aspectRatio: `${columns} / ${rows}`,
};

const cells = computed(() => {
  const snakeMap = new Map(game.value.snake.map((part, index) => [`${part.x},${part.y}`, index]));
  return Array.from({ length: columns * rows }, (_, index) => {
    const x = index % columns;
    const y = Math.floor(index / columns);
    const snakeIndex = snakeMap.get(`${x},${y}`);

    return {
      key: `${x}-${y}`,
      isSnake: snakeIndex !== undefined,
      isHead: snakeIndex === 0,
      isApple: game.value.apple?.x === x && game.value.apple?.y === y,
    };
  });
});

const liveMessage = computed(() => {
  if (game.value.status === 'won') return `You won with a score of ${game.value.score}.`;
  if (game.value.status === 'game-over') return `Game over. Score ${game.value.score}.`;
  return `Score ${game.value.score}.`;
});

const readHighScore = () => {
  try {
    const stored = Number(window.localStorage.getItem('snakeHighScore'));
    highScore.value = Number.isFinite(stored) && stored >= 0 ? stored : 0;
  } catch {
    highScore.value = 0;
  }
};

const saveHighScore = () => {
  highScore.value = Math.max(highScore.value, game.value.score);
  try {
    window.localStorage.setItem('snakeHighScore', String(highScore.value));
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
};

const stopTimer = () => {
  window.clearInterval(intervalId);
  intervalId = undefined;
};

const tick = () => {
  game.value = stepGame(game.value);
  if (game.value.status === 'game-over' || game.value.status === 'won') {
    saveHighScore();
    stopTimer();
  } else if (game.value.score > highScore.value) {
    saveHighScore();
  }
};

const startTimer = () => {
  stopTimer();
  if (game.value.status === 'running' && !document.hidden) {
    intervalId = window.setInterval(tick, speed.value);
  }
};

const start = () => {
  if (game.value.status === 'game-over' || game.value.status === 'won') {
    game.value = restartGame();
  }
  game.value = { ...game.value, status: 'running' };
  startTimer();
};

const setDirection = (direction: Direction) => {
  if (game.value.status !== 'running') return;
  game.value = queueDirection(game.value, direction);
};

const updateSpeed = (delta: number) => {
  speed.value = Math.min(130, Math.max(35, speed.value + delta));
  startTimer();
};

const onKeyDown = (event: KeyboardEvent) => {
  const keyMap: Record<string, Direction> = {
    ArrowLeft: 'left',
    a: 'left',
    A: 'left',
    ArrowUp: 'up',
    w: 'up',
    W: 'up',
    ArrowRight: 'right',
    d: 'right',
    D: 'right',
    ArrowDown: 'down',
    s: 'down',
    S: 'down',
  };

  if (event.code === 'Space') {
    if (game.value.status !== 'running') {
      event.preventDefault();
      start();
    }
    return;
  }

  if (event.key === '+') updateSpeed(-10);
  if (event.key === '-') updateSpeed(10);

  const direction = keyMap[event.key];
  if (direction) {
    event.preventDefault();
    setDirection(direction);
  }
};

const onVisibilityChange = () => {
  if (document.hidden) stopTimer();
  else startTimer();
};

onMounted(() => {
  readHighScore();
  window.addEventListener('keydown', onKeyDown);
  document.addEventListener('visibilitychange', onVisibilityChange);
});

onBeforeUnmount(() => {
  stopTimer();
  window.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('visibilitychange', onVisibilityChange);
});
</script>

<template>
  <section class="container-section flex min-h-screen flex-col items-center justify-center py-24">
    <h1 class="mb-6 text-4xl font-semibold text-slate-lighter">Snake</h1>

    <div
      class="relative grid overflow-hidden border-[8px] border-solid text-slate-light"
      :style="boardStyle"
      role="img"
      :aria-label="`Snake game board. Score ${game.score}.`"
    >
      <div
        v-for="cell in cells"
        :key="cell.key"
        class="aspect-square"
        :class="{
          'bg-mint': cell.isSnake,
          'bg-slate-lighter': cell.isHead,
          'bg-red-400': cell.isApple,
        }"
      />
    </div>

    <p class="sr-only" aria-live="polite">{{ liveMessage }}</p>
    <p class="mt-4 text-center font-mono text-[clamp(12px,2vw,20px)] font-bold text-slate-light">
      HIGH-SCORE: {{ highScore }}&ensp;&ensp; SCORE: {{ game.score }}
    </p>

    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        v-if="game.status !== 'running'"
        type="button"
        class="button-link px-6 py-4"
        @click="start"
      >
        {{ game.status === 'idle' ? 'Start Game' : 'Play Again' }}
      </button>
      <template v-else>
        <button type="button" class="small-button-link min-h-11" @click="updateSpeed(-10)">
          Increase speed
        </button>
        <button type="button" class="small-button-link min-h-11" @click="updateSpeed(10)">
          Decrease speed
        </button>
      </template>
    </div>

    <p
      v-if="game.status === 'game-over' || game.status === 'won'"
      class="mt-6 text-3xl font-semibold"
      :class="game.status === 'won' ? 'text-mint' : 'text-red-400'"
    >
      {{ game.status === 'won' ? 'You Won!' : 'Game Over' }}
    </p>

    <div class="mt-6 grid grid-cols-3 gap-2" aria-label="Touch direction controls">
      <span aria-hidden="true" />
      <button
        type="button"
        class="small-button-link min-h-11 min-w-11 p-3"
        :disabled="game.status !== 'running'"
        aria-label="Move up"
        @click="setDirection('up')"
      >
        ↑
      </button>
      <span aria-hidden="true" />
      <button
        type="button"
        class="small-button-link min-h-11 min-w-11 p-3"
        :disabled="game.status !== 'running'"
        aria-label="Move left"
        @click="setDirection('left')"
      >
        ←
      </button>
      <button
        type="button"
        class="small-button-link min-h-11 min-w-11 p-3"
        :disabled="game.status !== 'running'"
        aria-label="Move down"
        @click="setDirection('down')"
      >
        ↓
      </button>
      <button
        type="button"
        class="small-button-link min-h-11 min-w-11 p-3"
        :disabled="game.status !== 'running'"
        aria-label="Move right"
        @click="setDirection('right')"
      >
        →
      </button>
    </div>

    <p class="mt-6 text-center font-mono text-sm font-semibold text-slate-light">
      Use arrow keys or W/A/S/D to move. Press + or − to change speed. Press Space to start.
    </p>
  </section>
</template>
