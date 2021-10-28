import { blockMod } from "@/utils"
import { HTMLAttributeAnchorTarget } from "react"
import NextLink from 'next/link'

import { Panel, PanelSection } from '@/components/lib'

type Link = {
    href: string
    text: string
    target?: HTMLAttributeAnchorTarget
    kind?: 'button'|'anchor'
}


export const NavBar = () => {

    const links: Link[] = [
        {
            text: 'Support The Thing',
            href: '#',
            target: '_blank',
            kind: 'button'
        },
    ]

    return (
        <header className="navbar">
            <nav className="navbar__nav">
       

                        <div style={{cursor: 'pointer'}}>
                            <NextLink href="/">
                                <h1>SomeFlashyTitle</h1>
                            </NextLink>
                        </div>
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