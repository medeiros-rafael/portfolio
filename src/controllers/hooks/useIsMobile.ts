import { useMediaQuery } from './useMediaQuery'

/** True below the `md` Tailwind breakpoint — used to tone animations down. */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)')
}
