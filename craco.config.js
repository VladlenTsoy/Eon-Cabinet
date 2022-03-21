const CracoLessPlugin = require("craco-less")
const {getThemeVariables} = require("antd/dist/theme")

const isEnvProduction = process.env.NODE_ENV === "production"
process.env.GENERATE_SOURCEMAP = !isEnvProduction

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            ...getThemeVariables({dark: true}),
                            "primary-color": "#8e24aa",
                            "max-width": "1400px"
                        },
                        javascriptEnabled: true
                    }
                }
            }
        }
    ]
}
