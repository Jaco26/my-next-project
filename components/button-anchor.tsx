import { HTMLAttributeAnchorTarget } from "react"

type Props = {
    href: string
    children: string
    target?: HTMLAttributeAnchorTarget
    buttonClassName?: string
}

export const ButtonAnchor = ({ href, children, target, buttonClassName }: Props) => (
    <a href={href} target={target || '_blank'}>
        <button
            className={`${buttonClassName} text-large font-light`}
            style={{
                padding: 8,
            }}
        >
            {children}
        </button>
    </a>
)