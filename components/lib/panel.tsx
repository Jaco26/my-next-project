import { CSSProperties } from "react"

import { blockMod } from '@/utils'

type Height = '100%'|'%75'|'50%'|'25%'

type Props = {
    children?: React.ReactNode
    noWrap?: boolean
    height?: Height
    className?: string
    style?: CSSProperties
    id?: string
}

export const Panel = ({
    children,
    className = '',
    noWrap = false,
    height,
    style,
    ...props
}: Props) => {

    const modifiers = blockMod('panel', [
        noWrap && 'no-wrap',
    ])

    const classes = `panel ${modifiers} ${className}`.trim()

    const _style = style || height ? { height, ...style } : undefined

    return (
        <div className={classes}  style={_style} {...props} >
            {children}
        </div>
    )
}




