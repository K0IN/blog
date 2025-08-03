import urlJoin from 'proper-url-join';

export function withBase(url: string, base: string): string {

    if (!base || base === '/') {
        return url;
    }

    // is a external url 
    if (!url.startsWith('/') && !url.startsWith('./') && !url.startsWith('../')) {
        return url
    }

    return urlJoin(base, url);
}