
import { PageWrapper, Panel, PanelSection } from '@/components/lib'
import { NavBar } from '@/components/nav-bar'
import { SideNav } from '@/components/side-nav'

//  cols={['tablet-12', 'laptop-10', 'desktop-8']}

export const HomePageContent = () => (
    <PageWrapper>
        
        <NavBar />

        <SideNav />

        <Panel height="100%" className="whacky-bg" style={{paddingLeft: 192, paddingTop: 61}}>


            <Panel height="50%" id="end-the-bad-thing" className="text-x-large font-light">
                <PanelSection
                    offset={['laptop-1']}
                    cols={['12', 'laptop-10', 'desktop-9']}
                    direction="column"
                    justify="end"
                    align="end"
                >
                    <h1 className="text-align-start text-xx-large">End The Bad Thing</h1>
                </PanelSection>
            </Panel>
            
            <Panel height="75%" className="bg-black clr-pink">
                <PanelSection
                    offset={['laptop-1']}
                    cols={['12', 'laptop-10', 'desktop-9']}
                    direction="column"
                    justify="start"
                    align="end"
                >
                    <h1 className="text-x-large font-light text-align-start">
                        Good Thing Now
                    </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </PanelSection>
            </Panel>

            <Panel height="100%" id="subject-1" >
                <PanelSection>
                    <h1 className="text-large">What is Subject 1</h1>
                </PanelSection>
            </Panel>

            <Panel height="100%" id="subject-2" className="clr-pink bg-black">
                <PanelSection>
                    <h1 className="text-x-large">Subject 2</h1>
                </PanelSection>
            </Panel>

        </Panel>

     </PageWrapper>
)

