
import React from "react"

type Height = '25%'|'50%'|'75%'|'100%'

interface PanelSection {
    id: string
    title: string
    content: string
    style: React.CSSProperties
}

interface Panel {
    height: Height
    sections: PanelSection[]
}

interface SideNavLink {
    /** The text that the user will see  */
    text: string
    /** The `PanelSection.id` that should be scrolled to when the link is clicked  */
    to: string
}

export interface Config {
    name: string
    sideNav?: {
        /** If `true`, the `links` config values will be ignored and the page will automatically
         * generate the side navigation menu inferring `SideNavLink` `text` and `to` values by
         * reading each `Config.Panel[].PanelSection` `id` and `title`. Any `PanelSection` with both
         * `id` and `title` defined will be translated into a `SideNavLink` where `id->id` and `title->text`
         */
        auto?: boolean
        /** `links` configures the links that will appear in the side navigation menu
         * on the page. 
         * @example
         * ```
         * [
         *      {
         *          text: 'Subject 1',
         *          to: 'subject-1'
         *      }
         * ]
         * ```
         */
        links?: SideNavLink[]
    }
    panels: Panel[]
}

type Img = {
    src: string
    alt: string
    width: number
    height: number
}

export type CreateImg = (src: string, alt: string, width: number, height: number) => Img

