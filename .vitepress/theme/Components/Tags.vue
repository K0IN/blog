<script setup lang="ts">
import Tag from './Tag.vue';

const props = defineProps<{
    tags: string[];
    showRelatedPosts?: boolean;
}>()


</script>

<template>
    <div :class="$style.tagsContainer">
        <Tag v-for="tag in props.tags" :key="tag" :tag="tag" type="tip" :showRelatedPosts="props.showRelatedPosts" />
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
</style>