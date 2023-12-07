import { FC, SVGProps } from 'react'

interface TriangleProps extends SVGProps<SVGSVGElement> {}

const Triangle: FC<TriangleProps> = (props) => {
  return (
    <svg
      width={props.width || 154}
      height={props.height || 62}
      viewBox='0 0 100 62'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M31.5 0L58.7798 46.5H4.2202L31.5 0Z'
        fill={props.fill || '#0042C7'}
      />
    </svg>
  )
}

export default Triangle
