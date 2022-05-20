<script context="module">
    import { ENV } from '$lib/env.js'
    import ErrorBox from '$lib/ErrorBox.svelte'

    import { handleError } from '$lib/utils.js'

    let stats
    let max_miner_time

    let error = { type: 'none', message: '' }

    export async function load({ url, fetch, params, stuff }) {
        const { wallet, pool } = params
        stats = stuff?.stats

        let miner_json = await fetch(
            `${ENV.FOUNDATION_API_BASE}/${pool}/miners?method=${wallet}`
        ).then((r) => r.json()).catch(e => error = handleError(e))

        let active_miners_json = await fetch(
            `${ENV.FOUNDATION_API_BASE}/${pool}/miners?method=active`
        ).then((r) => r.json()).catch(e => error = handleError(e))
        let active_miners = active_miners_json?.body?.primary

        let workers_json = await fetch(`${ENV.FOUNDATION_API_BASE}/${pool}/workers`).then(
            (r) => r.json()
        ).catch(e => error = handleError(e))
        let workers = workers_json?.body?.primary

        // Filter workers object to only contain our wallet's rigs
        let my_workers = workers?.shared?.filter(
            (worker) => worker?.worker.split('.')[0] === wallet
        )

        // Find the maximum miner time value
        max_miner_time = Math.max.apply(
            Math,
            active_miners?.shared?.map(function (object) {
                return object.times
            })
        )

        return {
            stuff: {
                miner: miner_json?.body?.primary,
                my_workers,
            },
            props: {
                miner: miner_json?.body?.primary,
                max_miner_time: max_miner_time,
                workers,
                my_workers,
            },
        }
    }
</script>

<script>
    import Miner from '$lib/Miner.svelte'
    export let miner
    export let my_workers
    // NOTE: there is no 'export let stats' because it is passed using 'stuff' feature
    //       of SvelteKit which is suited for values that have to be passed to multiple
    //       components. It is passed down with 'blocks' from the top __layout component.
</script>

<!-- TODO: replace error handling with component -->
{#if error.type === 'none'}
    <Miner {miner} {max_miner_time} {stats} {my_workers} />
    <slot />
{:else if error.type === 'limiter'}
        <ErrorBox error_msg="Too many requests!" />
{:else if error.type == 'api'}
        <ErrorBox error_msg="Statistics API temporarily unavailable" />
{:else}
        <ErrorBox error_msg="An unknown error occured with the statistics API" />
{/if}
