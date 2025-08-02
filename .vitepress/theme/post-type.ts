export interface PostFrontmatter {
    title: string
    date: string
    author: string
    description: string
    layout?: string
    tags?: string[],
    image?: string // "thumbnail" or "cover" image for the post
}

export interface Post {
    url: string
    frontmatter: PostFrontmatter
    src: string | undefined
    html: string | undefined
    //    excerpt: string | undefined
}