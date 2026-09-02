export interface PostFrontmatter {
    title: string
    date: string
    description: string
    layout: 'post'
    tags?: string[],
    image?: string // "thumbnail" or "cover" image for the post
    aiAssisted?: boolean
}

export interface Post {
    url: string
    frontmatter: PostFrontmatter
    src: string | undefined
    html: string | undefined
}