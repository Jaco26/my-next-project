import { GetServerSideProps } from 'next'

import { ScrollProvider } from '@/providers/scroll-provider'
import { HomePageContent } from '@/components/home-page-content'


export const getServerSideProps: GetServerSideProps = async (ctx) => ({
    props: {
        initialActiveSection: ctx.req.cookies.hash || ''
    }
})


type Props = {
    initialActiveSection: string
}


const Home = ({ initialActiveSection }: Props) => (
    <ScrollProvider
        sectionIDs={['end-the-bad-thing', 'subject-1', 'subject-2']}
        initialActiveSection={initialActiveSection}
    >
        <HomePageContent />
    </ScrollProvider>
)


export default Home
