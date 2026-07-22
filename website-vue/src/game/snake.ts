export type Direction = 'up' | 'down' | 'left' | 'right';
export type Point = { x: number; y: number };
export type GameStatus = 'idle' | 'running' | 'game-over' | 'won';

export type GameState = {
  snake: Point[];
  apple: Point | null;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  status: GameStatus;
};

export type GameOptions = {
  columns?: number;
  rows?: number;
  random?: () => number;
};

export const columns = 30;
export const rows = 20;

const initialSnake = (): Point[] => [
  { x: 15, y: 10 },
  { x: 14, y: 10 },
  { x: 13, y: 10 },
  { x: 12, y: 10 },
  { x: 11, y: 10 },
  { x: 10, y: 10 },
];

const pointKey = ({ x, y }: Point) => `${x},${y}`;

export const placeApple = (
  snake: Point[],
  boardColumns = columns,
  boardRows = rows,
  random: () => number = Math.random,
): Point | null => {
  const occupied = new Set(snake.map(pointKey));
  const available: Point[] = [];

  for (let y = 0; y < boardRows; y += 1) {
    for (let x = 0; x < boardColumns; x += 1) {
      if (!occupied.has(`${x},${y}`)) available.push({ x, y });
    }
  }

  if (available.length === 0) return null;
  const index = Math.min(available.length - 1, Math.floor(random() * available.length));
  return available[index];
};

export const restartGame = (): GameState => ({
  snake: initialSnake(),
  apple: { x: 22, y: 10 },
  direction: 'right',
  nextDirection: 'right',
  score: 0,
  status: 'idle',
});

export const queueDirection = (state: GameState, nextDirection: Direction): GameState => {
  const opposites: Record<Direction, Direction> = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left',
  };

  return opposites[state.direction] === nextDirection ? state : { ...state, nextDirection };
};

export const stepGame = (state: GameState, options: GameOptions = {}): GameState => {
  if (state.status !== 'running') return state;

  const boardColumns = options.columns ?? columns;
  const boardRows = options.rows ?? rows;
  const direction = state.nextDirection;
  const head = state.snake[0];
  const nextHead = { ...head };

  if (direction === 'left') nextHead.x = head.x === 0 ? boardColumns - 1 : head.x - 1;
  if (direction === 'right') nextHead.x = head.x === boardColumns - 1 ? 0 : head.x + 1;
  if (direction === 'up') nextHead.y = head.y === 0 ? boardRows - 1 : head.y - 1;
  if (direction === 'down') nextHead.y = head.y === boardRows - 1 ? 0 : head.y + 1;

  const isEating = state.apple?.x === nextHead.x && state.apple?.y === nextHead.y;
  const collisionBody = isEating ? state.snake : state.snake.slice(0, -1);
  const collided = collisionBody.some((part) => part.x === nextHead.x && part.y === nextHead.y);

  if (collided) return { ...state, direction, status: 'game-over' };

  const snake = [nextHead, ...state.snake];
  if (!isEating) snake.pop();
  if (!isEating) return { ...state, snake, direction };

  const apple = placeApple(snake, boardColumns, boardRows, options.random);
  return {
    ...state,
    snake,
    apple,
    direction,
    score: state.score + 1,
    status: apple ? 'running' : 'won',
  };
};
