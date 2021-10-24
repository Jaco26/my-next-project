import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { PageWrapper, Panel, PanelSection } from '@/components/lib'

const Home: NextPage = () => (
  <PageWrapper>
    <Panel halfHeight>
      <PanelSection className="bg-blue">
        Panel 1: PanelSection 1
      </PanelSection>
      <PanelSection>
        Panel 1: PanelSection 2
      </PanelSection>
      <PanelSection>
        Panel 1: PanelSection 3
        <div>
        Panel 1 &gt; Panel 2 &gt; PanelSection 1
        </div>
      </PanelSection>
      <PanelSection>
          </PanelSection>
    </Panel>
    <Panel className="bg-dark clr-light">
      <PanelSection cols="7">
        Panel 2: PanelSection 1
      </PanelSection>
      <PanelSection cols="5">
        Panel 2: PanelSection 2
      </PanelSection>
      <PanelSection>
        Panel 2: PanelSection 3
      </PanelSection>
    </Panel>
  </PageWrapper>
)


export default Home
