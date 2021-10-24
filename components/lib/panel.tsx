import { CSSProperties } from "react"

import { blockMod } from '@/utils'

type Props = {
    children?: React.ReactNode
    fullHeight?: boolean
    halfHeight?: boolean
    noPadding?: boolean
    noWrap?: boolean
    style?: CSSProperties
    className?: string
}

export const Panel = ({
    children,
    style = {},
    className = '',
    noWrap = false,
    noPadding = false,
    fullHeight = false,
    halfHeight = false,
}: Props) => {

    const modifiers = blockMod('panel', [
        noWrap && 'no-wrap',
        noPadding && 'no-padding',
        fullHeight && 'full-height',
        halfHeight && 'half-height',
    ])

    const classes = `panel ${modifiers} ${className}`.trim()

    return (
        <div className={classes} style={style}>
            {children}
        </div>
    )
}




