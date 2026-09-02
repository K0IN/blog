import { createContentLoader } from 'vitepress'
import { Post } from './post-type'


declare const data: Post[]
export { data }

export default createContentLoader('posts/**/*.md', {
    includeSrc: true, // include raw markdown source?
    render: true,     // include rendered full page HTML?
    // excerpt: true,    // include excerpt? (content above first `---`)
    transform(rawData) {
        // map, sort, or filter the raw data as you wish.
        // the final result is what will be shipped to the client.
        return rawData.sort((a, b) => {
            return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
        }).map((page) => {
            page.src     // raw markdown source
            page.html    // rendered full page HTML
            //page.excerpt // rendered excerpt HTML (content above first `---`)

            // Resolve relative image paths
            let resolvedImage = page.frontmatter.image;
            if (resolvedImage && resolvedImage.startsWith('./')) {
                // Convert relative path to absolute path from site root
                // Remove the leading './' and combine with the page's directory
                const pageDir = page.url.replace(/\/[^/]*$/, ''); // Get directory part of URL
                resolvedImage = `${pageDir}/${resolvedImage.substring(2)}`;
            }

            return {
                url: page.url,
                frontmatter: {
                    title: page.frontmatter.title,
                    date: page.frontmatter.date,
                    author: page.frontmatter.author,
                    description: page.frontmatter.description,
                    layout: page.frontmatter.layout,
                    tags: page.frontmatter.tags,
                    image: resolvedImage,
                    aiAssisted: page.frontmatter.aiAssisted
                },
                src: page.src,
                html: page.html,
                // excerpt: page.excerpt
            }
        })
    }
})


//https://vitepress.dev/guide/data-loading#createcontentloader