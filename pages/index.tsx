import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { PageWrapper, Panel, PanelSection } from '@/components/lib'
import { NavBar } from '@/components/nav-bar'

const NAVBAR_HEIGHT = 60

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

const goTo = (id: string) => {
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

const Home: NextPage = () => (
  <PageWrapper>

    <NavBar links={[
      {
        text: 'Support The Thing',
        href: '#',
        target: '_blank',
        kind: 'button'
      },
    ]}/>

    <div className="bg-light clr-pink" style={{
      position: 'fixed',
      top: 61,
      height: '100%',
      width: 192,
      zIndex: 100,
      borderRight: '1px solid #555'
    }}>
      <ul style={{
        listStyle: 'none',
        padding: '8px 16px',
        margin: 0,
        mixBlendMode: 'difference',
      }}>
        <li style={{margin: '12px 0'}}>
          <a onClick={() => goTo('subject-1')}>Subject 1</a>
        </li>
        <li style={{margin: '12px 0'}}>
          <a onClick={() => goTo('subject-2')}>Subject 2</a>
        </li>
        <li style={{margin: '12px 0'}}>When</li>
      </ul>

      <ul style={{
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        zIndex: 100,
        listStyle: 'none',
        padding: '0 16px',
      }}>
        <li style={{marginRight: 12}}>
          <a href="https://twitter.com">
            <Image src="/../public/twitter-blue.svg" height={30} width={30} />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com">
            <Image src="/../public/fb-blue.png" height={30} width={30} />
          </a>
        </li>
      </ul>
    </div>

    <div style={{ height: '100%', paddingLeft: 192, paddingTop: 61}}>
      <Panel id="v1" height="50%" className="text-x-large font-light">
        <PanelSection direction="column" justify="end" align="start">
          <h1 style={{textAlign: 'end'}}>End The Bad Thing</h1>
        </PanelSection>
      </Panel>
      <Panel height="50%" className="bg-black clr-pink text-x-large font-light">
        <PanelSection justify="start">
          <h1 style={{textAlign: 'end'}}>Good Thing Now</h1>
        </PanelSection>
      </Panel>

      <Panel id="subject-1" height="100%">
        <PanelSection>
          <h1 className="text-x-large">What is Subject 1</h1>
        </PanelSection>
      </Panel>

      <Panel id="subject-2" height="100%">
        <PanelSection>
          <h1 className="text-x-large">Subject 2</h1>
        </PanelSection>
      </Panel>
    </div>
  </PageWrapper>
)


export default Home
