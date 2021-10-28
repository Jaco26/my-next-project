import { blockMod } from '@/utils'

type Props = {
    children?: React.ReactNode
    style?: React.CSSProperties
    className?: string
    cols?: string|number|string[]
    offset?: string|number|string[]
    direction?: 'row'|'column'
    justify?: 'start'|'center'|'end'|'between'
    align?: 'start'|'center'|'end'
    shrink?: boolean
}

export const PanelSection = ({
    children,
    style = {},
    className = '',
    cols = [],
    offset = [],
    direction,
    justify,
    align,
    shrink = false
}: Props) => {

    const modifiers = blockMod('panel-section', [
        !!direction && direction,
        !!justify && `justify-${justify}`,
        !!align && `align-${align}`,
        shrink && 'shrink',
        ...(
            typeof cols === 'string' || typeof cols === 'number'
                ? [`col-${cols}`]
                : cols.map(breakpoint => `col-${breakpoint}`)
        ),
        ...(
            typeof offset === 'string' || typeof offset === 'number'
                ? [`offset-${offset}`]
                : offset.map(breakpoint => `offset-${breakpoint}`)
        )
    ])

    const classes = `panel-section ${modifiers} ${className}`.trim()

    return (
        <section className={classes} style={style}>
            {children}
        </section>
    )
}