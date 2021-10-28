import { useRef, useEffect } from 'react'

export const blockMod = (blockName: string, modifiers: (string|boolean)[]) => modifiers
    .filter(modifier => 
        typeof modifier === 'string' ? !!modifier.length : false
    )
    .map(modifier => 
        `${blockName}--${(modifier as string).trim()}`
    )
    .join(' ')


export function usePrevious<T>(value: T) {
    const ref = useRef<T>()
    useEffect(() => {
        ref.current = value
    })
    return ref.current as T
}