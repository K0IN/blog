import type { Theme } from 'vitepress'
import { VPBadge } from 'vitepress/theme'
import './styles/style.css'
import './styles/vp-components.css'
import Layout from './Layout.vue'

// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faArrowLeft)

export default {
    Layout: Layout,
    enhanceApp({ app }) {
        // Register VitePress components globally
        app.component('Badge', VPBadge)
        app.component('VPBadge', VPBadge)

        // Register FontAwesome
        app.component('FontAwesomeIcon', FontAwesomeIcon)
    }
} satisfies Theme;
