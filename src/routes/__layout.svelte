<!-- END Outermost Container -->
<style>
</style>

<script>
import Transition from '$lib/Transition.svelte';

</script>

<script context="module">
    //import '../dark.css';
    import '../indigo-violet.css';

let currentRoute = ''
export async function load({ url }) {
    currentRoute = url.pathname
    return {
        props: { currentRoute },
    }
}
</script>


<Transition>
<!-- Outermost Container -->
<div class="max-w-8xl min-h-screen">
    {#key currentRoute}
        <slot />
    {/key}

    <footer class="t-footer-text m-auto my-10 block max-w-xs text-center">
        powered by <a href="https://github.com/blinkhash/foundation-server">foundation</a>
        and
        <a href="https://github.com/qirpi/foundation-screed">foundation-screed</a>
    </footer>
</div>
</Transition>
