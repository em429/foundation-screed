<script lang="ts">
    import { fly } from 'svelte/transition'

    export let animate = true
    export let duration = 200
    export let delay = 200
    export let x = 0
    export let y = 0
</script>

{#if animate}
    <div in:fly={{ duration, delay, x, y }} out:fly={{ duration, x, y }}>
        <slot />
    </div>
{:else}
    <slot />
{/if}
