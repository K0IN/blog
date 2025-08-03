
export function withBase(url: string, base: string): string {

    if (!base || base === '/') {
        return url;
    }

    // is a external url 
    if (!url.startsWith('/') && !url.startsWith('./') && !url.startsWith('../')) {
        return url
    }

    return new URL(url, base).toString();
}