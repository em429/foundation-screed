<!-- END Outermost Container -->
<script context="module">
    //import '../dark.css';
    //import '../indigo-violet.css';
    import '../stone-lime.css';

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

