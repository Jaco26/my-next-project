
import { PageWrapper, Panel, PanelSection } from '@/components/lib'
import { NavBar } from '@/components/nav-bar'
import { SideNav } from '@/components/side-nav'

export const HomePageContent = () => (
    <PageWrapper>

        <NavBar />

        <SideNav />

        <div style={{ height: '100%', paddingLeft: 192, paddingTop: 61}}>
            <Panel id="end-the-bad-thing" height="50%" className="text-x-large font-light">
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