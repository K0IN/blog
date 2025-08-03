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