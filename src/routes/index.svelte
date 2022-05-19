<script context="module">
    export async function load() {
        // TODO: set this redirect to $default_pool if more than one enabled in config
        //      or set it to the only pool if only a single pool is defined
        return {
            status: 302,
            redirect: '/Bitcoin',
        }
    }
</script>

<main class="block p-4 ">
    <div class="container mx-auto grid max-w-6xl grid-cols-1 gap-4 xl:grid-cols-3" />
</main>

<style>
</style>
