<script setup>
import PostCard from '../Components/PostCard.vue'
import { data as posts } from '../posts.data.ts'
import { useData } from 'vitepress'
import SocialMediaLinks from '../Components/SocialMediaLinks.vue'

const { frontmatter } = useData()

const allUniqueTags = new Set(posts.flatMap(p => p.frontmatter.tags || []));
const topicCount = allUniqueTags.size;
</script>

<template>
    <div :class="$style['blog-container']">
        <header :class="$style['blog-header']">
            <div :class="$style['blog-header-content']">
                <h1 :class="$style['blog-title']">{{ frontmatter.title || 'K0IN Blog' }}</h1>
                <p :class="$style['blog-subtitle']">'Welcome to my personal blog where I
                    share thoughts on development, technology, and more.</p>

                <div :class="$style['blog-stats']">
                    <div :class="$style['stat-item']">
                        <span :class="$style['stat-number']">{{ posts.length }}</span>
                        <span :class="$style['stat-label']">{{ posts.length === 1 ? 'Post' : 'Posts' }}</span>
                    </div>
                    <div :class="$style['stat-item']">
                        <span :class="$style['stat-number']">{{ topicCount }}</span>
                        <span :class="$style['stat-label']">Topics</span>
                    </div>
                </div>

                <SocialMediaLinks />
            </div>
        </header>

        <main :class="$style['main-content']">
            <section :class="$style['posts-section']">
                <div :class="$style['section-header']">
                    <h2 :class="$style['section-title']">Latest Posts</h2>
                    <p :class="$style['section-description']">Explore my latest thoughts and discoveries</p>
                </div>

                <div :class="$style['post-grid']">
                    <PostCard v-for="post of posts" :key="post.url" :post="post" />
                </div>
            </section>
        </main>
    </div>
</template>

<style module>
.blog-container {
    min-height: 100vh;
    background: var(--bg-light);
}

.blog-header {
    background: var(--bg-light);
    padding: var(--blog-space-large) var(--blog-space-large) calc(var(--blog-space-large) * 2);
    text-align: center;
    position: relative;
}

.blog-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--border-color) 50%, transparent 100%);
}

.blog-header-content {
    max-width: var(--blog-content-max-width);
    margin: 0 auto;
    display: grid;
    gap: var(--blog-space-regular);
}

.blog-title {
    font-size: var(--blog-font-size-5xl);
    font-weight: 700;
    color: var(--text);
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.02em;
}

.blog-subtitle {
    font-size: var(--blog-font-size-lg);
    color: var(--text-muted);
    margin: 0;
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.blog-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--blog-space-large);
    margin-top: var(--blog-space-large);
    justify-content: center;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
}

.stat-item {
    display: grid;
    gap: var(--blog-space-small);
    text-align: center;
}

.stat-number {
    font-size: var(--blog-font-size-3xl);
    font-weight: 700;
    color: var(--primary);
    line-height: 1;
}

.stat-label {
    font-size: var(--blog-font-size-sm);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
}

.main-content {
    padding: var(--blog-space-large);
}

.posts-section {
    max-width: var(--blog-max-width);
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: calc(var(--blog-space-large) * 2);
}

.section-title {
    font-size: var(--blog-font-size-3xl);
    font-weight: 700;
    color: var(--text);
    margin: 0;
    margin-bottom: var(--blog-space-regular);
}

.section-description {
    font-size: var(--blog-font-size-base);
    color: var(--text-muted);
    margin: 0;
    line-height: 1.6;
}

.post-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--blog-grid-min-width), 1fr));
    gap: var(--blog-card-gap);
}

.blog-footer {
    padding: var(--blog-space-large);
    text-align: center;
    border-top: 1px solid var(--border-color);
    background: var(--bg-light);
    margin-top: var(--blog-space-large);
}

.github-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 20px;
}

.github-link:hover {
    background: var(--primary-dark, #2563eb);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
    .blog-container {
        padding: 0;
    }

    .blog-header {
        padding: var(--blog-space-large) var(--blog-space-regular) calc(var(--blog-space-large) * 1.5);
    }

    .blog-title {
        font-size: var(--blog-font-size-4xl);
    }

    .blog-subtitle {
        font-size: var(--blog-font-size-base);
    }

    .blog-stats {
        grid-template-columns: 1fr 1fr;
        gap: var(--blog-space-regular);
        max-width: 250px;
    }

    .stat-number {
        font-size: var(--blog-font-size-2xl);
    }

    .main-content {
        padding: var(--blog-space-large) var(--blog-space-regular);
    }

    .section-header {
        margin-bottom: var(--blog-space-large);
    }

    .section-title {
        font-size: var(--blog-font-size-2xl);
    }

    .post-grid {
        grid-template-columns: 1fr;
        gap: var(--blog-space-large);
    }
}

@media (max-width: 480px) {
    .blog-title {
        font-size: var(--blog-font-size-3xl);
    }

    .blog-stats {
        grid-template-columns: 1fr;
        gap: var(--blog-space-regular);
        max-width: 200px;
    }

    .stat-item {
        padding: var(--blog-space-regular);
        background: var(--bg-light);
        border-radius: var(--blog-radius-regular);
        border: 1px solid var(--border-color);
    }
}
</style>