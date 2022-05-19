<script context="module">
    let miner
    let my_workers

    export async function load({ stuff }) {
        miner = stuff?.miner
        my_workers = stuff?.my_workers

        return { props: {} }
    }
</script>

<script>
    import Workers from '$lib/Workers.svelte'
</script>

<Workers {miner} {my_workers} />
