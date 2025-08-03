<template>
    <span :title="formattedDate">{{ timeAgoText }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { format } from 'timeago.js';

const props = defineProps({
    date: {
        type: [String, Date],
        required: true
    },
    fallbackText: {
        type: String,
        default: 'Loading...'
    }
});

const formattedDate = computed(() => {
    const date = typeof props.date === 'string' ? new Date(props.date) : props.date;
    return date.toLocaleDateString();
});

const date = computed(() => {
    return typeof props.date === 'string' ? new Date(props.date) : props.date;
});
const timeAgoText = computed(() => {
    try {
        return format(date.value);
    } catch (error) {
        console.error('Failed to format date:', error);
        return props.fallbackText;
    }
});
</script>
