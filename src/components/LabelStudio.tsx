// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LabelStudio from '@heartexlabs/label-studio'
import '@heartexlabs/label-studio/build/static/css/main.css'
import React, { useEffect, useRef } from 'react'

const lsContainerId = 'label-studio'

interface LabelStudioTask {
  annotations: any[]
  predictions: any[]
  id: number
  data: Record<any, string>
}

interface LabelStudioUser {
  pk: number
  firstName: string
  lastName: string
}

export interface LabelStudioReactProps {
  config: string
  task: LabelStudioTask
  interfaces: string[]
  user: LabelStudioUser
}

export const ReactLabelStudio = (options: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lsRef = useRef<LabelStudio>()

  useEffect(() => {
    if (!lsRef.current) {
      lsRef.current = new LabelStudio(lsContainerId, options)
    }
  }, [options])

  return <div id={lsContainerId} ref={containerRef} />
}
