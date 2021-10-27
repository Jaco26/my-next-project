import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'

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

export const ScrollProvider = ({ children, sectionIDs, initialActiveSection }: Props) => {

    const [scrollY, setScrollY] = useState(0)

    // const setScrollY = (value: number) => _setScrollY([scrollY, value])

    const [clickedAndScrolling, setClickedAndScrolling] = useState(false)

    let domNodes: [string, HTMLElement][] = []

    // if (typeof window !== 'undefined') {
    if (process.browser) {
        // set scrollY state to window scrollY on page load and scroll
        useEffect(() => {
            window.addEventListener('load', () => setScrollY(window.scrollY))
            window.addEventListener('scroll', () => setScrollY(window.scrollY))

        })
        domNodes = sectionIDs.map(sectionID => [
            sectionID,
            window.document.getElementById(sectionID) as HTMLElement
        ])
    }


    const activeSection = process.browser
        ? useMemo(
            () => domNodes.reduce(
                (acc: string, [sectionID, elem]) => (
                    elem.getBoundingClientRect().top + 150 < window.innerHeight
                        ? sectionID
                        : acc
                ),
                ''
            ),
            [scrollY]
        )
        : initialActiveSection


    // when computed `activeSection` value changes, update the document.cookie.hash so that server render
    // has access to activeSection state and avoids invariant
    useEffect(
        () => {
            setHashCookie(activeSection)
        },
        [activeSection]
    )


    // // when clickedAndScrolling state changes to `true`, monitor scrollY state changes over time to determine if
    // // the user has intervened in the `goTo`-invoked auto scroll process. If the user has intervened, setClickedAndScrolling(false)
    // useEffect(
    //     () => {
    //         if (clickedAndScrolling) {
    //             console.log('check scroll')

    //         }
    //     },
    //     [clickedAndScrolling]
    // )


    // Watch for changes in `activeSection` state and set location hash accordingly
    useEffect(
        () => {
            if (!clickedAndScrolling) {
                const prevScrollY = window.scrollY
                location.hash = activeSection
                window.scrollTo(0, prevScrollY)
            }

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
            
            const initScrollY = window.scrollY
            const scrollDirection = initScrollY > newTop ? 'up' : 'down'
            console.log('scroll direction:', scrollDirection)

            setClickedAndScrolling(true)

            window.scrollTo({ top: newTop, behavior: 'smooth' })

            const arrivedAtScrollDestination = () => Math.abs(window.scrollY - newTop) <= 2 // account for some variation in box sizing between browsers

            const scrollCanceled = () => scrollDirection === 'up'
                ? false
                : false

            function onScroll() {
                if (scrollCanceled()) {
                    
                } else if (arrivedAtScrollDestination()) {
                    window.location.hash = id
                    window.scrollTo(0, newTop)
                    window.removeEventListener('scroll', onScroll)
                    setClickedAndScrolling(false)
                }
            }

            window.addEventListener('scroll', onScroll)
        },
        activeSection,
    }

    return (
        <ScrollProviderContext.Provider value={scrollProviderValue}>
            {children}
        </ScrollProviderContext.Provider>
    )
}