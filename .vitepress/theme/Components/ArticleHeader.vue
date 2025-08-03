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
    <header :class="$style.header">
        <a href="/" :class="$style.backButton">
            <FontAwesomeIcon :icon="faArrowLeft" />
            Back to Overview
        </a>

        <div :class="$style.meta">
            <TimeAgo :date="frontmatter.date" v-if="frontmatter.date" />
            <span v-if="frontmatter.author" :class="$style.author">by {{ frontmatter.author }}</span>
        </div>

        <h1 :class="$style.title">{{ frontmatter.title }}</h1>

        <p v-if="frontmatter.description" :class="$style.description">
            {{ frontmatter.description }}
        </p>

        <Tags v-if="tags.length > 0" :tags="tags" :class="$style.tags" :showRelatedPosts="true" />
    </header>
</template>

<style module>
.header {
    width: min(var(--blog-content-max-width), 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
    gap: var(--blog-space-regular);
    text-align: left;
}

.backButton {
    display: inline-flex;
    align-items: center;
    gap: var(--blog-space-small);
    color: var(--text-muted);
    text-decoration: none;
    font-size: var(--blog-font-size-sm);
    font-weight: 500;
    transition: color var(--blog-transition-fast);
    grid-row: 1;
}

.backButton:hover {
    color: var(--primary);
}

.meta {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: start;
    align-items: center;
    gap: var(--blog-space-regular);
    font-size: var(--blog-font-size-sm);
    color: var(--text-muted);
    grid-row: 2;
}

.author {
    font-style: italic;
}

.title {
    font-size: var(--blog-font-size-4xl);
    font-weight: 700;
    line-height: 1.2;
    color: var(--text);
    grid-row: 3;
}

.description {
    font-size: var(--blog-font-size-lg);
    line-height: 1.6;
    color: var(--text-muted);
    margin: 0;
    grid-row: 4;
}

.tags {
    display: flex;
    justify-content: flex-start;
    grid-row: 5;
}

/* Responsive design */
@media (max-width: 768px) {
    .header {
        gap: var(--blog-space-regular);
    }

    .backButton {
        font-size: var(--blog-font-size-xs);
    }

    .title {
        font-size: var(--blog-font-size-3xl);
    }

    .description {
        font-size: var(--blog-font-size-base);
    }

    .meta {
        grid-template-columns: 1fr;
        gap: var(--blog-space-small);
    }
}
</style>