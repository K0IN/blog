<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';

const { frontmatter, site } = useData()
const allLinks = computed(() => {
    return site.value.themeConfig.socialLinks || [];
});

function isNewTabLink(link: string): boolean {
    return link.startsWith('http://') || link.startsWith('https://');
}

</script>

<template>
    <div class="social-media-links">
        <a v-for="link in allLinks" :key="link.name" :href="link.link"
            :target="isNewTabLink(link.link) ? '_blank' : undefined" rel="noopener noreferrer" class="github-link">
            <FontAwesomeIcon :icon="link.icon" /><span>{{ link.name }}</span>
        </a>
    </div>
</template>

<style scoped>
.social-media-links {
    display: flex;
    gap: 12px;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
}
</style>
