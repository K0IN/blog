<script setup lang="ts">
import { computed, Ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
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
            <span v-if="frontmatter.aiAssisted" class="authorship-note" tabindex="0"
                aria-describedby="ai-assistance-tooltip">
                <FontAwesomeIcon :icon="faCircleInfo" aria-hidden="true" />
                AI was used in this post
                <span id="ai-assistance-tooltip" class="authorship-tooltip" role="tooltip">
                    Full disclosure: AI was used to format, write, and edit the content on this page.
                </span>
            </span>
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
    display: inline-flex;
    align-items: center;
    min-height: 1.8rem;
    gap: 0.5rem;
    font-size: var(--blog-font-size-sm);
    color: var(--text-muted);
    line-height: 1;
}

.authorship-note {
    position: relative;
    display: inline-flex;
    align-items: center;
    margin: 0;
    padding: 0.38rem 0.65rem;
    border: 1px solid color-mix(in srgb, var(--highlight) 55%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--highlight) 12%, transparent);
    color: var(--highlight);
    font-size: var(--blog-font-size-xs);
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1.1;
    cursor: help;
    outline: none;
    gap: 0.35rem;
}

.authorship-note:focus-visible {
    outline: 2px solid var(--highlight);
    outline-offset: 2px;
}

.authorship-tooltip {
    position: absolute;
    z-index: 1;
    bottom: calc(100% + 0.6rem);
    left: 0;
    width: max-content;
    max-width: min(18rem, calc(100vw - 2rem));
    padding: 0.55rem 0.7rem;
    border-radius: 0.35rem;
    background: var(--text);
    color: var(--bg-light);
    font-size: var(--blog-font-size-xs);
    font-weight: 500;
    letter-spacing: normal;
    line-height: 1.4;
    opacity: 0;
    pointer-events: none;
    transform: translateY(0.25rem);
    transition: opacity var(--blog-transition-fast), transform var(--blog-transition-fast);
}

.authorship-note:hover .authorship-tooltip,
.authorship-note:focus .authorship-tooltip {
    opacity: 1;
    transform: translateY(0);
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