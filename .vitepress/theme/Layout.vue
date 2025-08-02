<script setup>
import { useData } from 'vitepress';
import Home from './Sites/Home.vue';
import NotFound from './Sites/NotFound.vue';
import Article from './Sites/Article.vue';

const { page, frontmatter } = useData();
</script>

<template>
    <Home v-if="frontmatter.layout === 'home'" />
    <Article v-if="frontmatter.layout === 'post'" />
    <NotFound v-else-if="page.isNotFound" />
    <!-- <slot v-else /> -->
</template>

<style scoped></style>