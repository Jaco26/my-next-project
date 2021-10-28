import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { usePrevious } from '@/utils'

const NAVBAR_HEIGHT = 60

const ScrollProviderContext = createContext({})

interface ScrollProviderValue {
    goTo(id: string): void
    activeSection: string
}

const setHashCookie = (value: string) => {
    if (process.browser) {
        document.cookie = `hash=${value} ;SameSite=strict`
    }
}

export const useScrollProvider = () => useContext(ScrollProviderContext) as ScrollProviderValue

type Props = {
    children: React.ReactNode
    sectionIDs: string[]
    initialActiveSection: string
}

type ScrollStateMode = 'normal'|'autoScroll'
type ScrollStateData = { [key: string]: any }

type ScrollState = {
    mode: ScrollStateMode
    data: ScrollStateData
}


export const ScrollProvider = ({ children, sectionIDs, initialActiveSection }: Props) => {

    const [activeSection, setActiveSection] = useState(initialActiveSection)

    const [scrollY, setScrollY] = useState(0)
    const prevScrollY = usePrevious(scrollY)

    const [scrollState, setScrollState] = useState<ScrollState>({
        mode: 'normal',
        data: {}
    })

    let domNodes: [string, HTMLElement][] = []

    const getActiveSection = () => process.browser
        ? domNodes.reduce(
            (acc: string, [sectionID, elem]) => (
                elem.getBoundingClientRect().top + 150 < window.innerHeight
                    ? sectionID
                    : acc
            ),
            ''
        )
        : initialActiveSection

    const scrollHandlers = {
        normal() {
            const newActiveSection = getActiveSection()
            if (newActiveSection !== activeSection) {
                const prevScrollY = window.scrollY
                location.hash = newActiveSection
                window.scrollTo(0, prevScrollY)
            }
            setActiveSection(newActiveSection)
        },
        autoScroll() {
            const { newTop, scrollDirection } = scrollState.data
            const newActiveSection = getActiveSection()
            const arrivedAtScrollDestination = () => Math.abs(window.scrollY - newTop) <= 1
            const scrollCanceled = () => scrollDirection === 'up'
                ? scrollY > prevScrollY
                : scrollY < prevScrollY
            if (arrivedAtScrollDestination() || scrollCanceled()) {
                setScrollState({
                    mode: 'normal',
                    data: {}
                })
                const prevScrollY = window.scrollY
                location.hash = newActiveSection
                window.scrollTo(0, prevScrollY)
            }
            setActiveSection(newActiveSection)
        },
    }


    const onWindowLoad = () => {
        setScrollY(window.scrollY)
    }

    const onWindowScroll = () => {
        setScrollY(window.scrollY)
        scrollHandlers[scrollState.mode]()
    }

    if (process.browser) {
        // set scrollY state to window scrollY on page load and scroll
        useEffect(() => {
            window.addEventListener('load', onWindowLoad)
            window.addEventListener('scroll', onWindowScroll)
            
            return () => {
                window.removeEventListener('laod', onWindowLoad)
                window.removeEventListener('scroll', onWindowScroll)
            }
        })

        domNodes = sectionIDs.map(sectionID => [
            sectionID,
            window.document.getElementById(sectionID) as HTMLElement
        ])
    }

    useEffect(
        () => {
            setHashCookie(activeSection)
        },
        [activeSection]
    )

    // correct scroll position to account for navbar height
    // TODO: there has *got* to be a better way...
    if (typeof window !== 'undefined') {
        window.onload = function () {
            if (location.hash) {
                const target = window.document.querySelector(location.hash)
                if (target) {
                    const { top: parentTop } = (target.parentElement as HTMLElement).getBoundingClientRect()
                    const { top: targetTop } = target.getBoundingClientRect()
                    const newTop = targetTop - parentTop - NAVBAR_HEIGHT
                    setTimeout(() => {
                        window.scrollTo(0, newTop)
                    })
                }
            }
        }
    }

    const scrollProviderValue: ScrollProviderValue = {
        goTo(id: string) {
            const target = document.getElementById(id) as HTMLElement
            const parentElem = target.parentElement as HTMLElement
            const newTop = target.getBoundingClientRect().top - parentElem.getBoundingClientRect().top - NAVBAR_HEIGHT
            const scrollDirection =  window.scrollY > newTop ? 'up' : 'down'
            setScrollState({
                mode: 'autoScroll',
                data: {
                    newTop,
                    scrollDirection
                }
            })
            window.scrollTo({
                top: newTop,
                behavior: 'smooth'
            })
        },
        activeSection,
    }

    return (
        <ScrollProviderContext.Provider value={scrollProviderValue}>
            {children}
        </ScrollProviderContext.Provider>
    )
}