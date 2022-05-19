<script context="module">
    import '../app.css'

    let currentRoute = ''
    export async function load({ url }) {
        currentRoute = url.pathname
        return {
            props: { currentRoute },
        }
    }
</script>

{#key currentRoute}
    <slot />
{/key}

<footer class="m-auto mt-20 block max-w-xs  text-center text-xs text-zinc-500">
    powered by <a href="https://github.com/blinkhash/foundation-server">foundation</a> and
    <a href="https://github.com/qirpi/foundation-screed">foundation-screed</a>
</footer>

<style>
    :root {
        /* background-color: #fff7ed; */
        background-color: #fff;
        /* background-color: #fed7aa; */
    }
</style>
