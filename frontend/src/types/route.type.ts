export type RouteType = {
    route: string,
    title: string,
    template: string,
    styles: string,
    load(): void,

}

export type RouterMain = {
    routesMain: Array<RouterMainItem>

}

export type RouterMainItem ={
    route: string,
    title: string,
    template: string,
    styles: string,
    load(): void,
}

export type RouterItem ={
    route: string,
    title: string,
    template: string,
    styles: string,
    load(): void,
}

