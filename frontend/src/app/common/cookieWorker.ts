export function getValueFromCookie(cookie: string, key: string): string {
    let params = cookie.split('; ');
    for (let param of params) {
        let pair = param.split('=');
        if (pair[0] === key) {
            if (pair[1] !== '') {
                return pair[1];
            }
        }
    }
    return '';
}

export function deleteCookie(key: string ) {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
