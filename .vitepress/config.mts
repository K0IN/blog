import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { defineConfigWithTheme } from 'vitepress'

export function withBase(url: string): string {
    // is a external url 
    if (!url.startsWith('/')) {
        return url
    }
    // is a relative url
    if (url.startsWith('./') || url.startsWith('../')) {
        return url
    }

    return `/blog${url}`
}

export default defineConfigWithTheme<{ socialLinks: { icon: IconDefinition, link: string, name: string }[] }>({
    lang: 'en-US',
    title: "K0IN-Blog",
    description: "A personal Blog",
    base: '/blog/',
    cleanUrls: true,
    themeConfig: {
        socialLinks: [
            { icon: faGithub, link: 'https://github.com/k0in', name: 'github/k0in' },
            { icon: faEnvelope, link: 'mailto:thisk0in@gmail.com', name: 'thisk0in@gmail.com' },
            { icon: faDiscord, link: 'https://discord.com/users/.k0in', name: 'discord/K0IN' }
        ]
    },
    transformHead: (ctx) => {
        return [
            ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
            ['link', { rel: 'icon', href: withBase('/favicon.ico') }],
            ['meta', { name: 'theme-color', content: '#ffffff' }],
            ['meta', { name: 'description', content: ctx.pageData.description || ctx.siteData.description || '' }],
            ['link', { rel: 'preload', href: withBase('/assets/roboto.woff2'), as: 'font', type: 'font/woff2', crossorigin: '' }]
        ]
    },
    buildEnd: () => console.log('Build completed!'),
    // todo build llm.txt, blog.json, rss feed, etc.
    // https://github.com/okineadev/vitepress-plugin-llms
    // https://github.com/vuejs/vitepress/blob/main/docs/.vitepress/config.ts
    // https://github.com/boyum/markdown-it-image-size/tree/main/demo/vitepress
});
