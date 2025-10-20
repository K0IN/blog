<script setup lang="ts">
import { onMounted, ref } from 'vue';

const commentsContainer = ref<HTMLElement | null>(null);

onMounted(() => {
    const prefersTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'github-dark' : 'github-light';

    if (commentsContainer.value) {
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', 'K0IN/blog');
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('theme', prefersTheme);
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        commentsContainer.value.appendChild(script);
    }
});
</script>

<template>
    <div ref="commentsContainer" :class="$style.comments"></div>
</template>

<style module>
.comments {
    max-width: var(--blog-content-max-width);
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
}
</style>
