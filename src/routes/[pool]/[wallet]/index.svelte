<script context="module">
export async function load({ stuff }) {
    let miner = stuff?.miner
    let my_workers = stuff?.my_workers

    return {
        props: {
            miner,
            my_workers,
        },
    }
}
</script>

<script>
import Workers from '$lib/Workers.svelte'
export let miner
export let my_workers
</script>

<Workers {miner} {my_workers} />
