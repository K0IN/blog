<script setup lang="ts">
import { computed, Ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Tags from '../Components/Tags.vue';
import TimeAgo from '../Components/TimeAgo.vue';
import { PostFrontmatter } from '../post-type';

interface Props {
    frontmatter: PostFrontmatter;
}

const props = defineProps<Props>();
const tags = computed(() => props.frontmatter?.tags ?? []);
</script>

<template>
    <header class="header">
        <a href="/" class="back-button">
            <FontAwesomeIcon :icon="faArrowLeft" />
            Back to Overview
        </a>
        <h1 class="title">{{ frontmatter.title }}</h1>
        <div class="date">
            <TimeAgo :date="frontmatter.date" v-if="frontmatter.date" />
        </div>
        <p v-if="frontmatter.description" class="description">
            {{ frontmatter.description }}
        </p>
        <Tags v-if="tags.length > 0" :tags="tags" class="tags" :showRelatedPosts="true" />
    </header>
</template>

<style scoped lang="scss">
.header {
    width: min(100%, var(--blog-content-max-width));
    margin: 0 auto;
    display: grid;
    grid-template-areas: "back-button back-button back-button"
        "title title title"
        "date . ."
        "description description description"
        "tags tags tags";

    grid-template-columns: auto auto auto;
    grid-template-rows: min-content min-content auto auto auto;
    gap: var(--blog-space-regular);
}

.back-button {
    grid-area: back-button;
    display: inline-flex;
    align-items: center;
    gap: var(--blog-space-small);
    color: var(--text-muted);
    text-decoration: none;
    font-size: var(--blog-font-size-sm);
    font-weight: 500;
    transition: color var(--blog-transition-fast);
}

.back-button:hover {
    color: var(--highlight);
}

.title {
    grid-area: title;
    font-size: var(--blog-font-size-4xl);
    font-weight: 700;
    line-height: 1.2;
    color: var(--text);
}

.description {
    grid-area: description;
    font-size: var(--blog-font-size-lg);
    line-height: 1.6;
    color: var(--text-muted);
    margin: 0;
}

.date {
    grid-area: date;
    font-size: var(--blog-font-size-sm);
    color: var(--text-muted);
}

.tags {
    grid-area: tags;
    display: flex;
    justify-content: flex-start;
}

/* Remove unused .meta class */

/* Responsive design */
@media (max-width: 768px) {
    .header {
        gap: var(--blog-space-regular);
    }

    .back-button {
        font-size: var(--blog-font-size-xs);
    }

    .title {
        font-size: var(--blog-font-size-3xl);
    }

    .description {
        font-size: var(--blog-font-size-base);
    }
}
</style>