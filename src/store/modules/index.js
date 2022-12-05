// https://vuex.vuejs.org/en/modules.html

// https://vuex.vuejs.org/en/modules.html

const requireModule = require.context('.', true, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
    if (fileName === './index.js') return

    // Replace ./ and .js
    const path = fileName.replace(/(\.\/|\.js)/g, '')
    const [moduleName, imported] = path.split('/')

    if (!modules[moduleName]) {
        modules[moduleName] = {
            namespaced: false
        }
    }

    modules[moduleName][imported] = requireModule(fileName).default
})
modules.app.namespaced = true
export default modules
