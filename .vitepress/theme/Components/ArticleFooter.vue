<script setup lang="ts">
import { useRoute } from 'vitepress';
import { computed } from 'vue';
import { data as posts } from '../posts.data.ts';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { withBase } from '../../build-context.ts';

const route = useRoute();

function findCurrentIndex() {
    return posts.findIndex((p) => p.url === route.path);
}

// Navigation posts
const nextPost = computed(() => posts[findCurrentIndex() - 1]);
const prevPost = computed(() => posts[findCurrentIndex() + 1]);
</script>

<template>
    <footer class="blog-footer">
        <!-- Next/Previous Post Navigation -->
        <div v-if="prevPost">
            <a :href="withBase(prevPost.url)" class="blog-nav-link">
                <FontAwesomeIcon :icon="faArrowLeft" />
                <span class="blog-nav-title">{{ prevPost.frontmatter.title }}</span>
            </a>
        </div>

        <div v-if="nextPost">
            <a :href="withBase(nextPost.url)" class="blog-nav-link">
                <span class="blog-nav-title">{{ nextPost.frontmatter.title }}</span>
                <FontAwesomeIcon :icon="faArrowRight" />
            </a>
        </div>
    </footer>
</template>

<style scoped>
.blog-footer {
    width: var(--blog-content-max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.blog-nav-link {
    display: flex;
    gap: var(--blog-space-small);
    align-items: center;
}
</style>