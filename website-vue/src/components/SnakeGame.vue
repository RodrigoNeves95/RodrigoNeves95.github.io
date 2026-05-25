<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

type Direction = 'up' | 'down' | 'left' | 'right';
type Point = { x: number; y: number };

const columns = 30;
const rows = 20;
const initialSnake = (): Point[] => [
  { x: 15, y: 10 },
  { x: 14, y: 10 },
  { x: 13, y: 10 },
  { x: 12, y: 10 },
  { x: 11, y: 10 },
  { x: 10, y: 10 },
];

const snake = ref<Point[]>(initialSnake());
const apple = ref<Point>({ x: 22, y: 10 });
const direction = ref<Direction>('right');
const nextDirection = ref<Direction>('right');
const score = ref(0);
const highScore = ref(0);
const gameOver = ref(false);
const speed = ref(70);
let intervalId: number | undefined;

const boardStyle = computed(() => ({
  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  width: '40%',
  minWidth: '30px',
  maxWidth: 'calc(100vw - 48px)',
  aspectRatio: `${columns} / ${rows}`,
}));

const cells = computed(() => {
  const snakeMap = new Map(snake.value.map((part, index) => [`${part.x},${part.y}`, index]));
  return Array.from({ length: columns * rows }, (_, index) => {
    const x = index % columns;
    const y = Math.floor(index / columns);
    const snakeIndex = snakeMap.get(`${x},${y}`);

    return {
      key: `${x}-${y}`,
      isSnake: snakeIndex !== undefined,
      isHead: snakeIndex === 0,
      isApple: apple.value.x === x && apple.value.y === y,
    };
  });
});

const randomApple = () => {
  const occupied = new Set(snake.value.map((part) => `${part.x},${part.y}`));
  let point: Point;

  do {
    point = {
      x: Math.floor(Math.random() * columns),
      y: Math.floor(Math.random() * rows),
    };
  } while (occupied.has(`${point.x},${point.y}`));

  apple.value = point;
};

const setDirection = (newDirection: Direction) => {
  const opposites: Record<Direction, Direction> = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left',
  };

  if (opposites[direction.value] !== newDirection) {
    nextDirection.value = newDirection;
  }
};

const tick = () => {
  if (gameOver.value) return;

  direction.value = nextDirection.value;
  const head = snake.value[0];
  const nextHead = { ...head };

  if (direction.value === 'left') nextHead.x = head.x === 0 ? columns - 1 : head.x - 1;
  if (direction.value === 'right') nextHead.x = head.x === columns - 1 ? 0 : head.x + 1;
  if (direction.value === 'up') nextHead.y = head.y === 0 ? rows - 1 : head.y - 1;
  if (direction.value === 'down') nextHead.y = head.y === rows - 1 ? 0 : head.y + 1;

  if (snake.value.some((part) => part.x === nextHead.x && part.y === nextHead.y)) {
    gameOver.value = true;
    highScore.value = Math.max(highScore.value, score.value);
    localStorage.setItem('snakeHighScore', String(highScore.value));
    return;
  }

  snake.value = [nextHead, ...snake.value];

  if (nextHead.x === apple.value.x && nextHead.y === apple.value.y) {
    score.value += 1;
    highScore.value = Math.max(highScore.value, score.value);
    localStorage.setItem('snakeHighScore', String(highScore.value));
    randomApple();
  } else {
    snake.value.pop();
  }
};

const restart = () => {
  snake.value = initialSnake();
  apple.value = { x: 22, y: 10 };
  direction.value = 'right';
  nextDirection.value = 'right';
  score.value = 0;
  gameOver.value = false;
};

const updateSpeed = (delta: number) => {
  speed.value = Math.min(130, Math.max(35, speed.value + delta));
  window.clearInterval(intervalId);
  intervalId = window.setInterval(tick, speed.value);
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

  if (event.code === 'Space' && gameOver.value) {
    restart();
    return;
  }

  if (event.key === '+') updateSpeed(-10);
  if (event.key === '-') updateSpeed(10);

  const mappedDirection = keyMap[event.key];
  if (mappedDirection) {
    event.preventDefault();
    setDirection(mappedDirection);
  }
};

onMounted(() => {
  highScore.value = Number(localStorage.getItem('snakeHighScore')) || 0;
  intervalId = window.setInterval(tick, speed.value);
  window.addEventListener('keydown', onKeyDown);
});

onBeforeUnmount(() => {
  window.clearInterval(intervalId);
  window.removeEventListener('keydown', onKeyDown);
});
</script>

<template>
  <section class="container-section flex min-h-screen flex-col items-center justify-center py-0">
    <div
      class="relative m-5 grid overflow-hidden border-[8px] border-solid text-slate-light"
      :style="boardStyle"
      role="img"
      aria-label="Snake game board"
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

    <div class="mt-4 text-center font-mono font-bold text-slate-light">
      <div class="text-[clamp(12px,2vw,20px)]">
        HIGH-SCORE: {{ highScore }}&ensp;&ensp;&ensp;&ensp;SCORE: {{ score }}
      </div>
    </div>

    <Transition enter-active-class="transition duration-150" enter-from-class="opacity-0">
      <div v-if="gameOver" class="mt-8 text-center">
        <p class="text-3xl font-semibold text-red-400">Game Over</p>
        <button type="button" class="button-link mt-4" @click="restart">Play Again</button>
      </div>
    </Transition>

    <div class="mt-6 text-center font-mono text-[clamp(12px,2vw,20px)] font-bold text-slate-light">
      <p>
        <span>A - LEFT - Move Left</span><br />
        <span>W - UP - Move Up</span><br />
        <span>S - DOWN - Move Down</span><br />
        <span>D - RIGHT - More Right</span><br />
        <span>+ -> Increase Snake Speed</span><br />
        <span>- -> Decrease Snake Speed</span>
      </p>
    </div>
  </section>
</template>
