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

<!-- Outermost Container -->
<div class="min-h-screen max-w-8xl">
    {#key currentRoute}
        <slot />
    {/key}

    <footer class="m-auto my-10 block max-w-xs text-stone-400 text-center text-xs">
        powered by <a href="https://github.com/blinkhash/foundation-server">foundation</a>
        and
        <a href="https://github.com/qirpi/foundation-screed">foundation-screed</a>
    </footer>
</div>

<!-- END Outermost Container -->
<style>
    :root {
        /* background-color: #fff7ed; */
        background-color: #fff;
        /* background-color: #fed7aa; */
    }
</style>
