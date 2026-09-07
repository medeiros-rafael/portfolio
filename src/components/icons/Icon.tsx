import { createElement } from 'react'
import type { SVGProps } from 'react'

import { ICONS } from './icons.data'
import type { IconName, IconNode } from './icons.data'

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: IconName
  size?: number
  strokeWidth?: number
}

export function Icon({ name, size = 20, strokeWidth = 1.75, ...props }: IconProps) {
  const node = ICONS[name] as unknown as IconNode

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {node.map(([tag, attributes], index) => createElement(tag, { key: index, ...attributes }))}
    </svg>
  )
}
