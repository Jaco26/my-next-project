import fs from 'fs'
import path from 'path'

import { GetStaticProps } from 'next'

import { ScrollProvider } from '@/providers/scroll-provider'
import { HomePageContent } from '@/components/home-page-content'
import { Config, validateConfig } from '@/config'


export const getStaticProps: GetStaticProps = async ctx => {
    // const configPath = path.resolve(process.env.PAGE_CONFIG_FILE as string || './config/my-config-file.js')
    // const configPath = process.env.PAGE_CONFIG_FILE || 'my-config-file'
    // console.log('configPath:', configPath)

    return {
        props: {
            config: JSON.parse(JSON.stringify(require('../config/config.json')))
        }
    }

    // // const config = JSON.parse(JSON.stringify(require('my-config-file')))
    // // const config = await (await import('my-config-file')).default
    // const config = await (async () => await (await import(configPath)).default)()
    // // const config = await (await import(process.env.PAGE_CONFIG_FILE as string)).default
    // // const config = await (await import('/Users/jacobalbright/repos/strike-the-ban/my-config-file.js')).default

    // console.log('------------------- config ------------:', config)

    // if (validateConfig(config)) {
    //     return { props: { config } }
    // }
    // // }
    // return {
    //     props: {
    //         config: null
    //     }
    // }
}



const Home = () => (
    <ScrollProvider
        sectionIDs={['end-the-bad-thing', 'subject-1', 'subject-2']}
        initialActiveSection={''}
    >
        <HomePageContent />
    </ScrollProvider>
)


export default Home
