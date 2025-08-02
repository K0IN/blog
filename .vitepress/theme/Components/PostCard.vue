<script setup lang="ts">
import { Post } from '../post-type';
import Tags from './Tags.vue';
import TimeAgo from './TimeAgo.vue';

const { post } = defineProps<{
    post: Post
}>()
</script>

<template>
    <a :href="post.url" :class="$style.postCardLink">
        <article :class="[$style.blogCard, { [$style.hasImage]: post.frontmatter.image }]">
            <div :class="$style.postImage" v-if="post.frontmatter.image">
                <img :src="post.frontmatter.image" :alt="post.frontmatter.title" />
            </div>

            <div :class="$style.blogCardContent">
                <time :class="$style.postDate">
                    <TimeAgo :date="post.frontmatter.date" />
                </time>

                <h2 :class="$style.postTitle">
                    <span>{{ post.frontmatter.title }}</span>
                </h2>

                <p :class="$style.blogDescription">{{ post.frontmatter.description }}</p>
                <!--
                <div :class="$style.postExcerpt" v-if="post.excerpt" v-html="post.excerpt"></div>
                -->
                <span :class="$style.postAuthor">by {{ post.frontmatter.author }}</span>

                <div :class="$style.blogCardFooter">
                    <Tags v-if="post.frontmatter.tags && post.frontmatter.tags.length > 0" :tags="post.frontmatter.tags"
                        :class="$style.postTags" />

                    <span :class="$style.readMore">Read more →</span>
                </div>
            </div>
        </article>
    </a>
</template>

<style module>
:root {
    --card-border-radius: 12px;
    --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.postCardLink {
    text-decoration: none;
    color: inherit;
    display: block;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.postCardLink:hover {
    transform: translateY(-2px);
}

.blogCard {
    background: var(--bg);
    border-radius: var(--card-border-radius);
    box-shadow: var(--card-shadow);
    overflow: hidden;
    transition: box-shadow 0.2s ease;
    border: 1px solid var(--border-color);
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
}

.postCardLink:hover .blogCard {
    box-shadow: var(--card-shadow-hover);
}

.blogCard.hasImage {
    grid-template-rows: 200px 1fr;
}

.postImage {
    overflow: hidden;
    background: var(--border-color);
}

.postImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.postCardLink:hover .postImage img {
    transform: scale(1.05);
}

.blogCardContent {
    padding: var(--blog-space-large);
    display: grid;
    grid-template-rows: auto auto auto 1fr auto auto;
    gap: var(--blog-space-small);
    min-height: 0;
}

.postDate {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-weight: 500;
    margin-bottom: var(--blog-space-small);
}

.postTitle {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--text);
    margin-bottom: var(--blog-space-small);
}

.postTitle span {
    transition: color 0.2s ease;
}

.postCardLink:hover .postTitle span {
    color: var(--highlight);
}

.blogDescription {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
    margin-bottom: var(--blog-space-small);
}

.postExcerpt {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
    flex-grow: 1;
    margin-bottom: var(--blog-space-regular);
}

.postExcerpt p {
    margin: 0;
}

.postAuthor {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-style: italic;
    margin-bottom: var(--blog-space-regular);
}

.blogCardFooter {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: var(--blog-space-regular);
    margin-top: auto;
}

.postTags {
    align-self: start;
}

.readMore {
    font-size: 0.875rem;
    color: var(--text);
    font-weight: 600;
    white-space: nowrap;
    transition: color 0.2s ease;
    justify-self: end;
}

.postCardLink:hover .readMore {
    color: var(--highlight);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .blogCardContent {
        padding: var(--blog-space-regular);
    }

    .postTitle {
        font-size: 1.125rem;
    }

    .blogCardFooter {
        grid-template-columns: 1fr;
        gap: var(--blog-space-small);
    }

    .readMore {
        justify-self: start;
    }
}
</style>
