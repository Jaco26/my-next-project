import { blockMod } from '@/utils'

type Props = {
    children?: React.ReactNode
    style?: React.CSSProperties
    className?: string
    noMargin?: boolean
    cols?: string|number|string[]
    direction?: 'row'|'column'
    justify?: 'start'|'center'|'end'
    align?: 'start'|'center'|'end'
}

export const PanelSection = ({
    children,
    noMargin = false,
    style = {},
    className = '',
    cols = [],
    direction,
    justify,
    align
}: Props) => {

    const modifiers = blockMod('panel-section', [
        noMargin && 'no-margin',
        !!direction && direction,
        !!justify && `justify-${justify}`,
        !!align && `align-${align}`,
        ...(
            typeof cols === 'string' || typeof cols === 'number'
                ? [`col-${cols}`]
                : cols.map(breakpoint => `col-${breakpoint}`)
        )
    ])

    const classes = `panel-section ${modifiers} ${className}`.trim()

    return (
        <section className={classes} style={style}>
            {children}
        </section>
    )
}