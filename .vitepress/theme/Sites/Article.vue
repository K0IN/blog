<script setup lang="ts">
import { useData } from 'vitepress';
import { Ref } from 'vue';
import type { PostFrontmatter } from '../post-type';

import ArticleHeader from '../Components/ArticleHeader.vue';
import ArticleFooter from '../Components/ArticleFooter.vue';
import ContentWithScopedStyle from '../Components/Content/ContentWithScopedStyle.vue';
import Comments from '../Components/Comments.vue';

const { frontmatter }: { frontmatter: Ref<PostFrontmatter> } = useData() as unknown as {
    frontmatter: Ref<PostFrontmatter>;
};
</script>

<template>
    <article :class="$style.article">
        <ArticleHeader :frontmatter="frontmatter" />
        <main :class="$style.content">
            <ContentWithScopedStyle />
        </main>
        <ArticleFooter :frontmatter="frontmatter" />
        <Comments />
    </article>
</template>

<style module>
.article {
    min-height: 100vh;
    background: var(--bg-light);
    padding: var(--blog-space-large) var(--blog-space-large);
    gap: var(--blog-space-large);
    display: flex;
    flex-direction: column;
}

.content {
    max-width: var(--blog-content-max-width);
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    flex: 1;
}

@media (max-width: 768px) {
    .article {
        padding: var(--blog-space-large) var(--blog-space-regular);
    }
}
</style>