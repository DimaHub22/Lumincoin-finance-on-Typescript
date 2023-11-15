export type ConfigChartType = {
    type: string,
    data: ConfigChartDataType,
    options: ConfigChartOptionsType
}
export type ConfigChartDataType = {

    labels: string[],
    datasets: Array<ConfigChartDatasetsType>

}
export type ConfigChartDatasetsType = {
    label: string,
    backgroundColor: string[],
    borderColor: string,
    borderWidth: number,
    data: number[],
    fill: boolean
}

export type ConfigChartOptionsType = {
    responsive: boolean,
    plugins: ConfigChartPluginsType
}
export type ConfigChartPluginsType = {
    responsive: boolean,
    legend: ConfigChartLegendType,
    title: ConfigChartTitleType,
}
export type ConfigChartLegendType = {
    position: string
}
export type ConfigChartTitleType = {
    display: boolean,
    text: string,
    font: ConfigChartFontType,
    color: string
}
export type ConfigChartFontType = {
    family: string,
    size: number,
    weight: string
}