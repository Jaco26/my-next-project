import React, { createContext, useContext } from 'react'

const NAVBAR_HEIGHT = 60

const ScrollProviderContext = createContext({})

interface ScrollProviderValue {
    goTo(id: string): void
}

export const useScrollProvider = () => useContext(ScrollProviderContext) as ScrollProviderValue

type Props = {
    children: React.ReactNode
}

export const ScrollProvider = ({ children }: Props) => {

    if (typeof window !== 'undefined') {
        window.onload = function() {
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
            
            window.scrollTo({ top: newTop, behavior: 'smooth' })
            
            const scrollIsComplete = () => Math.abs(window.scrollY - newTop) <= 2 // account for some variation in box sizing between browsers
            
            function onScroll() {
                if (scrollIsComplete()) {
                window.location.hash = id
                window.scrollTo(0, newTop)
                window.removeEventListener('scroll', onScroll)
                }
            }
            
            window.addEventListener('scroll', onScroll)
        }
    }

    return (
        <ScrollProviderContext.Provider value={scrollProviderValue}>
            {children}
        </ScrollProviderContext.Provider>
    )
}