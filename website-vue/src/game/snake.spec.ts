import { describe, expect, it } from 'vitest';

import { type GameState, placeApple, queueDirection, restartGame, stepGame } from './snake';

const runningState = (overrides: Partial<GameState> = {}): GameState => ({
  ...restartGame(),
  status: 'running',
  ...overrides,
});

describe('Snake engine', () => {
  it('restarts with the canonical initial state', () => {
    const state = restartGame();

    expect(state.status).toBe('idle');
    expect(state.score).toBe(0);
    expect(state.snake).toHaveLength(6);
  });

  it.each([
    ['left', { x: 2, y: 1 }, { x: 1, y: 1 }],
    ['right', { x: 2, y: 1 }, { x: 3, y: 1 }],
    ['up', { x: 2, y: 1 }, { x: 2, y: 0 }],
    ['down', { x: 2, y: 1 }, { x: 2, y: 2 }],
  ] as const)('moves %s', (direction, head, expected) => {
    const state = runningState({ snake: [head], direction, nextDirection: direction });

    expect(stepGame(state, { columns: 4, rows: 3 }).snake[0]).toEqual(expected);
  });

  it.each([
    ['left', { x: 0, y: 1 }, { x: 3, y: 1 }],
    ['right', { x: 3, y: 1 }, { x: 0, y: 1 }],
    ['up', { x: 2, y: 0 }, { x: 2, y: 2 }],
    ['down', { x: 2, y: 2 }, { x: 2, y: 0 }],
  ] as const)('wraps at the %s edge', (direction, head, expected) => {
    const state = runningState({ snake: [head], direction, nextDirection: direction });

    expect(stepGame(state, { columns: 4, rows: 3 }).snake[0]).toEqual(expected);
  });

  it('rejects immediate reversal', () => {
    const state = runningState({ direction: 'right', nextDirection: 'right' });

    expect(queueDirection(state, 'left')).toBe(state);
    expect(queueDirection(state, 'up').nextDirection).toBe('up');
  });

  it('allows movement into the cell vacated by the tail', () => {
    const state = runningState({
      snake: [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 0, y: 1 },
      ],
      direction: 'left',
      nextDirection: 'left',
      apple: { x: 3, y: 2 },
    });

    const next = stepGame(state, { columns: 4, rows: 3 });
    expect(next.status).toBe('running');
    expect(next.snake[0]).toEqual({ x: 0, y: 1 });
  });

  it('ends the game on a true self-collision', () => {
    const state = runningState({
      snake: [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 0, y: 1 },
        { x: 0, y: 0 },
      ],
      direction: 'left',
      nextDirection: 'left',
      apple: { x: 3, y: 2 },
    });

    expect(stepGame(state, { columns: 4, rows: 3 }).status).toBe('game-over');
  });

  it('grows and scores after eating an apple', () => {
    const state = runningState({
      snake: [{ x: 0, y: 0 }],
      apple: { x: 1, y: 0 },
      direction: 'right',
      nextDirection: 'right',
    });

    const next = stepGame(state, { columns: 3, rows: 1, random: () => 0 });
    expect(next.score).toBe(1);
    expect(next.snake).toHaveLength(2);
    expect(next.apple).toEqual({ x: 2, y: 0 });
  });

  it('wins after filling the final board cell', () => {
    const state = runningState({
      snake: [{ x: 0, y: 0 }],
      apple: { x: 1, y: 0 },
      direction: 'right',
      nextDirection: 'right',
    });

    const next = stepGame(state, { columns: 2, rows: 1 });
    expect(next.status).toBe('won');
    expect(next.apple).toBeNull();
  });

  it('returns no apple when a board is full', () => {
    expect(placeApple([{ x: 0, y: 0 }], 1, 1)).toBeNull();
  });
});
