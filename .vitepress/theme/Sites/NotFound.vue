<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';    
</script>

<template>
    <div :class="$style.notFoundPage">
        <div :class="$style.content">
            <h1 :class="$style.title">404</h1>
            <p :class="$style.subtitle">Page Not Found</p>
            <p :class="$style.description">
                The page you're looking for doesn't exist.
            </p>

            <a href="/" :class="$style.backButton">
                <FontAwesomeIcon :icon="faArrowLeft" />
                Back to Overview
            </a>
        </div>
    </div>
</template>

<style module>
.notFoundPage {
    min-height: 100vh;
    background: var(--bg-light);
    padding: var(--blog-space-large) var(--blog-space-large);
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    max-width: var(--blog-content-max-width);
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    gap: var(--blog-space-regular);
    text-align: center;
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
    justify-self: center;
    grid-row: 4;
    margin-top: var(--blog-space-large);
}

.backButton:hover {
    color: var(--primary);
}

.title {
    font-size: clamp(6rem, 15vw, 16rem);
    font-weight: 900;
    line-height: 0.8;
    color: var(--text);
    opacity: 0.6;
    grid-row: 1;
    margin: 0;
    letter-spacing: -0.05em;
}

.subtitle {
    font-size: var(--blog-font-size-xl);
    font-weight: 600;
    color: var(--text);
    grid-row: 2;
    margin: 0;
}

.description {
    font-size: var(--blog-font-size-base);
    line-height: 1.6;
    color: var(--text-muted);
    margin: 0;
    grid-row: 3;
}


.backButton {
    font-size: var(--blog-font-size-xs);
}
</style>