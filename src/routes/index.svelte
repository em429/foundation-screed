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
