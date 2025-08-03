<script setup lang="ts">
import { useData } from 'vitepress';
import { withBase } from '../../build-context';
import { Post } from '../post-type';
import Tags from './Tags.vue';
import TimeAgo from './TimeAgo.vue';

const base = useData().site.value.base;
const { post } = defineProps<{
    post: Post
}>()
</script>

<template>
    <a :href="withBase(post.url, base)" class="post-card-link">
        <article :class="['blog-card', { 'has-image': post.frontmatter.image }]">
            <div class="post-image" v-if="post.frontmatter.image">
                <img :src="post.frontmatter.image" :alt="post.frontmatter.title" />
            </div>

            <div class="blog-card-content">
                <time class="post-date">
                    <TimeAgo :date="post.frontmatter.date" />
                </time>

                <h2 class="post-title">
                    <span>{{ post.frontmatter.title }}</span>
                </h2>

                <p class="blog-description">{{ post.frontmatter.description }}</p>

                <div class="blog-card-footer">
                    <Tags v-if="post.frontmatter.tags && post.frontmatter.tags.length > 0" :tags="post.frontmatter.tags"
                        class="post-tags" />

                    <span class="read-more">Read more →</span>
                </div>
            </div>
        </article>
    </a>
</template>

<style scoped>
.post-card-link {
    text-decoration: none;
    color: inherit;
    display: block;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post-card-link:hover {
    transform: translateY(-2px);
}

.blog-card {
    background: var(--bg);
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: box-shadow 0.2s ease;
    border: 1px solid var(--border-color);
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
}

.post-card-link:hover .blog-card {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.blog-card.has-image {
    grid-template-rows: 200px 1fr;
}

.post-image {
    overflow: hidden;
    background: var(--border-color);
}

.post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.post-card-link:hover .post-image img {
    transform: scale(1.05);
}

.blog-card-content {
    padding: var(--blog-space-large);
    display: grid;
    grid-template-rows: auto auto auto 1fr auto auto;
    gap: var(--blog-space-small);
    min-height: 0;
}

.post-date {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-weight: 500;
    margin-bottom: var(--blog-space-small);
}

.post-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--text);
    margin-bottom: var(--blog-space-small);
}

.post-title span {
    transition: color 0.2s ease;
}

.post-card-link:hover .post-title span {
    color: var(--highlight);
}

.blog-description {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
    margin-bottom: var(--blog-space-small);
}

.post-excerpt {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
    flex-grow: 1;
    margin-bottom: var(--blog-space-regular);
}

.post-excerpt p {
    margin: 0;
}

.post-author {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-style: italic;
    margin-bottom: var(--blog-space-regular);
}

.blog-card-footer {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: var(--blog-space-regular);
    margin-top: auto;
}

.post-tags {
    align-self: start;
}

.read-more {
    font-size: 0.875rem;
    color: var(--text);
    font-weight: 600;
    white-space: nowrap;
    transition: color 0.2s ease;
    justify-self: end;
}

.post-card-link:hover .read-more {
    color: var(--highlight);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .blog-card-content {
        padding: var(--blog-space-regular);
    }

    .post-title {
        font-size: 1.125rem;
    }

    .blog-card-footer {
        grid-template-columns: 1fr;
        gap: var(--blog-space-small);
    }

    .read-more {
        justify-self: start;
    }
}
</style>
