export const _theme: any = {
    'default-theme-eon': {
        color_primary: "#8e24aa",
        shadow_primary: "0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(156, 39, 176, .4)",
        gradient_primary: "linear-gradient(60deg, #ab47bc, #8e24aa)",

        color_success: "#5cb860",
        shadow_success: "0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)",
        gradient_success: "linear-gradient(60deg, #66bb6a, #43a047)",

        color_danger: '#f55a4e',
        shadow_danger: ' 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)',
        gradient_danger: 'linear-gradient(60deg, #ef5350, #e53935)',

        color_warning: '#ff9800',
        shadow_warning: '0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(255, 152, 0, .4)',
        gradient_warning: 'linear-gradient(60deg, #ffa726, #fb8c00)',

        color_info: '#26c6da',
        shadow_info: '0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2)',
        gradient_info: 'linear-gradient(60deg, #26c6da, #00acc1)',
    },
};

export const blackTheme = {
    color_black: "rgba(255,255,255, 1)",
    color_main: "rgba(255,255,255, 0.85)",
    color_second: "rgba(255,255,255, 0.65)",
    color_minimal: "rgba(255,255,255, 0.45)",
    color_border: "#000000",
    light_color_border: "rgba(255,255,255,0.1)",
    color_hover_item: "rgba(255,255,255,0.05)",

    bg_color_arrow: '#000000',
    legend_color: '#141414',

    // Background color for `<body>`
    '@body-background': '#141414',
    // Base background color for most components
    '@component-background': '#141414',
    // Layout
    '@layout-body-background': '#000000',

    '@background-color-base': '#000000',

    '@text-color': "rgba(255,255,255, 0.85)",
    '@text-color-secondary': "rgba(255,255,255, 0.65)",
    '@heading-color': "rgba(255,255,255, 1)",
    '@disabled-color': "fade(#ffffff, 35%)",

    '@border-color-base': "#000000",
    '@border-color-split': "#000000",

    '@modal-mask-bg': 'fade(@black, 45%)',

    '@primary-1': '#000000',
    '@background-color-light': '#141414',
};

export const whiteTheme = {
    color_black: "rgba(0, 0, 0, 0.85)",
    color_main: "rgba(0, 0, 0, 0.65)",
    color_second: "rgba(0, 0, 0, 0.45)",
    color_minimal: "rgba(0, 0, 0, 0.25)",
    // color_border: "#f1f1f1",
    color_border: "#d9d9d9",
    light_color_border: "rgba(0, 0, 0, 0.1)",
    color_hover_item: "rgba(0, 0, 0, 0.05)",

    bg_color_arrow: '#ffffff',
    legend_color: 'rgba(0, 0, 0, 0.45)',

    // Background color for `<body>`
    '@body-background': '#ffffff',
    // Base background color for most components
    '@component-background': '#ffffff',
    // Layout
    '@layout-body-background': '#f0f2f5',

    '@background-color-base': '#f0f2f5',

    '@text-color': "rgba(0, 0, 0, 0.65)",
    '@text-color-secondary': "rgba(0, 0, 0, 0.45)",
    '@heading-color': "rgba(0, 0, 0, 0.85)",
    '@disabled-color': "fade(#000000, 35%)",

    '@border-color-base': 'hsv(0, 0, 85%)',
    '@border-color-split': 'hsv(0, 0, 91%)',

    '@modal-mask-bg': 'fade(@black, 45%)',

    '@primary-1': 'color(~`colorPalette(\'@{primary-color}\', 1) `)',
    '@background-color-light': '#ffffff',
};