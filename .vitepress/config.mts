import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { defineConfigWithTheme, TransformContext } from 'vitepress'
import { withBase } from './build-context';


export default defineConfigWithTheme<{ socialLinks: { icon: IconDefinition, link: string, name: string }[] }>({
    lang: 'en-US',
    title: "K0IN-Blog",
    description: "A personal Blog",
    cleanUrls: true,
    themeConfig: {
        socialLinks: [
            { icon: faGithub, link: 'https://github.com/k0in', name: 'github/k0in' },
            { icon: faEnvelope, link: 'mailto:thisk0in@gmail.com', name: 'thisk0in@gmail.com' },
            { icon: faDiscord, link: 'https://discord.com/users/191111299348955136', name: 'discord/K0IN' }
        ]
    },
    transformHead: (ctx: TransformContext) => {
        const head = [
            ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
            ['link', { rel: 'icon', href: withBase('/favicon.ico', ctx.siteData.base) }],
            ['meta', { name: 'theme-color', content: '#ffffff' }],
            ['meta', { name: 'description', content: ctx.pageData.description || ctx.siteData.description || '' }],
            ['link', { rel: 'preload', href: withBase('/assets/roboto.woff2', ctx.siteData.base), as: 'font', type: 'font/woff2', crossorigin: '' }]
        ];

        if (ctx.pageData.frontmatter.aiAssisted) {
            head.push(['meta', { name: 'ai-assisted', content: 'true' }]);
        }

        return head;
    },
    markdown: {
        image: { lazyLoading: true },
    },
    buildEnd: () => console.log('Build completed!'),

    // todo build llm.txt, blog.json, rss feed, etc.
    // https://github.com/okineadev/vitepress-plugin-llms
    // https://github.com/vuejs/vitepress/blob/main/docs/.vitepress/config.ts
    // https://github.com/boyum/markdown-it-image-size/tree/main/demo/vitepress
});
