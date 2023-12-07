import React from 'react'
import ReactLoadingSkeleton, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface SkeletonPropsWithCustom extends SkeletonProps {
  customColor?: string
}

const Skeleton: React.FC<SkeletonPropsWithCustom> = ({
  customColor,
  ...props
}) => {
  return (
    <ReactLoadingSkeleton {...props} style={{ backgroundColor: customColor }} />
  )
}

export default Skeleton
