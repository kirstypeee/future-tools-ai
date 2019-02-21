export type HTTP_METHOD = 'POST' | 'PUT' | 'GET' | 'PATCH' | 'DELETE';

let logoutCallBack: () => void;
let logoutTimer: any;

export function configure(logoutAction: () => void) {
    logoutCallBack = logoutAction;
}

export async function call(url: string, method: HTTP_METHOD = 'GET', body: any, headers: any = {}) {
    const result = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers,
        credentials: 'same-origin',
    });
    if (result.ok) {
        return result.text().then((resultBody) => resultBody ? JSON.parse(resultBody) : {});
    } else {
        return Promise.reject(result);
    }
}

export async function apiCall(path: string, method: HTTP_METHOD = 'GET', body?: any, extraHeaders: any = {}) {
    try {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(logoutCallBack, 10 * 60 * 1000);

        const headers: any = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const url = encodeURI(path);
        const apiResult = await call(url, method, body, { ...extraHeaders, ...headers });
        return Promise.resolve(apiResult);
    } catch (result) {
        // Log them out based on the HTTP code
        if (result.serviceStatus === 401 || result.serviceStatus === 403) {
            logoutCallBack();
        }
        return Promise.reject(result);
    }
}
