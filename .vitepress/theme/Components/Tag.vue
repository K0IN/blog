<script setup lang="ts">
import { VPBadge } from 'vitepress/theme'
import { data as posts } from '../posts.data.ts'
import { computed } from 'vue';
import { useData, useRoute } from 'vitepress';
import { withBase } from '../../build-context.ts';

const route = useRoute();

const base = useData().site.value.base;
const props = defineProps<{
    tag: string;
    type?: 'tip' | 'info' | 'warning' | 'error';
    showRelatedPosts?: boolean;
}>()

const postWithSameTag = computed(() => {
    return posts.filter(post => post.frontmatter.tags && post.frontmatter.tags.includes(props.tag) && withBase(post.url, base) !== route.path);
});

</script>

<template>
    <div :class="$style.tagsContainer">
        <VPBadge :key="props.tag" :text="props.tag" type="tip" />
        <div :class="$style.hover" v-if="props.showRelatedPosts && postWithSameTag.length > 0">
            <span>Posts with this tag:</span>
            <a v-for="post in postWithSameTag" :key="post.url" :href="withBase(post.url, base)">
                {{ post.frontmatter.title }}
            </a>
        </div>
    </div>
</template>

<style module>
.tagsContainer {
    display: flex;
    flex-wrap: wrap;
    gap: var(--blog-space-small);
    margin: 0;
    align-items: center;
    position: relative;
    user-select: none;
}

.tagsContainer :deep(.VPBadge) {
    border: 1px solid var(--blog-color-border);
}

.tagsContainer :deep(.VPBadge) {
    font-size: var(--blog-font-size-xs);
    padding: var(--blog-space-small) var(--blog-space-regular);
    border-radius: var(--blog-radius-regular);
    font-weight: 500;
    opacity: 0.9;
    transition: opacity var(--blog-transition-fast);
    display: inline-flex;
    align-items: center;
}

.tagsContainer :deep(.VPBadge:hover) {
    opacity: 1;
}

.hover {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--bg);
    padding: var(--blog-space-small);
    border-radius: var(--blog-radius-regular);
    display: none;
    z-index: 10;
    width: 250px;
    border: 1px solid var(--blog-color-border);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.hover a {
    display: block;
    padding: var(--blog-space-small);
    text-decoration: underline;
    border-radius: var(--blog-radius-small);
    transition: background-color var(--blog-transition-fast);
}

.hover a:hover {
    background-color: var(--vp-c-default-soft);
}

.tagsContainer:hover .hover,
.hover:hover {
    display: block;
}

a {
    color: var(--text);
    text-decoration: underline;
}
</style>