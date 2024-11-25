import request from "./request";

type CustomOptions = Omit<RequestInit, "method"> & {
    baseUrl?: string | undefined;
};

const http = {
    get<Response>(
        url: string,
        options?: Omit<CustomOptions, "body"> | undefined
    ) {
        return request<Response>("GET", url, options);
    },
    post<Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body"> | undefined
    ) {
        return request<Response>("POST", url, { ...options, body });
    },
    put<Response>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body"> | undefined
    ) {
        return request<Response>("PUT", url, { ...options, body });
    },
    delete<Response>(
        url: string,
        options?: Omit<CustomOptions, "body"> | undefined
    ) {
        return request<Response>("DELETE", url, { ...options });
    },
};

export default http;
