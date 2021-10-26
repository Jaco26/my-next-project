import Image from 'next/image'

import { useScrollProvider } from '@/providers/scroll-provider'

export const SideNav = () => {

    const { goTo } = useScrollProvider()

    const sections = [
        {
            text: 'Subject 1',
            to: 'subject-1'
        },
        {
            text: 'Subject 2',
            to: 'subject-2'
        }
    ]

    const social = [
        {
            imgSrc: '/../public/twitter-blue.svg',
            href: 'https://twitter.com',
        },
        {
            imgSrc: '/../public/fb-blue.png',
            href: 'https://www.facebook.com'
        },
    ]

    return (
        <section className="side-nav">
            <ul className="side-nav__sections">
                {
                    sections.map(({ text, to }, i) =>
                        <li key={i} className="side-nav__sections-item">
                            <a onClick={() => goTo(to)}>{text}</a>
                        </li>
                    )
                }
            </ul>
            <ul className="side-nav__social">
                {
                    social.map(({ imgSrc, href }, i) =>
                        <li key={i} className="side-nav__social-item">
                            <a href={href}>
                                <Image src={imgSrc} height={30} width={30} />
                            </a>
                        </li>
                    )
                }
            </ul>
        </section>
    )
}