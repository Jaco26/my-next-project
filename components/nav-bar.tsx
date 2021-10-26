import { blockMod } from "@/utils"
import { HTMLAttributeAnchorTarget } from "react"


type Link = {
    href: string
    text: string
    target?: HTMLAttributeAnchorTarget
    kind?: 'button'|'anchor'
}

type Props = {
    links: Link[]
}

export const NavBar = ({ links }: Props) => {

    return (
        <header className="navbar">
            <nav className="navbar__nav">
                <a href="/#">
                    <h1>SomeFlashyTitle</h1>
                </a>
                <ul className="navbar__links">
                    {
                        links.map(({ href, text, target, kind }, i) => {

                            const modifiers = blockMod('navbar__link', [
                                !!kind && kind
                            ])

                            const classes = `navbar__link ${modifiers}`.trim()

                            return (
                                <li key={i} className={classes}>
                                    {
                                        kind === 'button'
                                            ? <a href={href} target={target}>
                                                <button >{text}</button>
                                              </a>
                                            : <a href={href} target={target}>{text}</a>
                                    }
                                </li>
                                )
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}