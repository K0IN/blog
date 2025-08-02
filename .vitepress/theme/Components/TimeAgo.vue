<template>
    <ClientOnly>
        <span :title="formattedDate">{{ timeAgoText }}</span>
    </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

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

const timeAgoText = ref('');

// Computed property for the formatted date tooltip
const formattedDate = computed(() => {
    const date = typeof props.date === 'string' ? new Date(props.date) : props.date;
    return date.toLocaleDateString();
});

onMounted(async () => {
    try {
        // Dynamic import for client-side only
        const { format } = await import('timeago.js');

        // Parse the date if it's a string
        const date = typeof props.date === 'string' ? new Date(props.date) : props.date;

        // Format the date as "time ago"
        timeAgoText.value = format(date);

        // Optional: Update the time every minute
        const interval = setInterval(() => {
            timeAgoText.value = format(date);
        }, 60000); // Update every minute

        // Cleanup interval on unmount
        onUnmounted(() => {
            clearInterval(interval);
        });

    } catch (error) {
        console.error('Failed to load timeago.js:', error);
        timeAgoText.value = props.fallbackText;
    }
});
</script>
