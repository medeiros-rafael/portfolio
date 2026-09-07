import type { pt } from './dictionaries/pt'

/**
 * The Brazilian Portuguese dictionary is the source of truth for the shape:
 * every other language must implement exactly the same keys.
 */
export type Dictionary = typeof pt
