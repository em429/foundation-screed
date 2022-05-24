<script context="module">
    import { ENV } from '$lib/env.js'

    import { handleError } from '$lib/utils.js'

    import ErrorBox from '$lib/ErrorBox.svelte'

    let stats
    let blocks
    let historical

    let error = { type: 'none', message: '' }


    export async function load({ url, fetch, params, status }) {
        let stats_json = await fetch(ENV.FOUNDATION_API_BASE + `/${params.pool}`)
            .then((r) => r.json())
            .catch((e) => {
            	error = handleError(e)
            })
        stats = stats_json?.body.primary

        let blocks_json = await fetch(ENV.FOUNDATION_API_BASE + `/${params.pool}/blocks`)
            .then((r) => r.json())
            .catch((e) => {
            	error = handleError(e)
            })
        blocks = blocks_json?.body.primary

        let historical_json = await fetch(
            `${ENV.FOUNDATION_API_BASE}/${params.pool}/historical`
        )
            .then((r) => r.json())
            .catch((e) => {
            	error = handleError(e)
            })
        historical = historical_json?.body.primary

        let stuff_return = {
            stats,
            blocks,
            historical,
        }

        // Handle wallet submit:
        //   If user enters their wallet address in form on SearchWallet component
        const wallet = url.searchParams.get('wallet')
        if (wallet) {
            return {
                status: 302,
                redirect: `/${params.pool}/${wallet}`,
                stuff: stuff_return,
            }
        }
        return {
            stuff: stuff_return,
        }
    }
</script>

<script>
    import Pool from '$lib/Pool.svelte'
    import MissingPool from '$lib/MissingPool.svelte'
    import NetworkStats from '$lib/NetworkStats.svelte'
    import Blocks from '$lib/Blocks.svelte'
</script>

<svelte:head>
    <title
        >{ENV.POOL_NAME || 'foundation-server and foundation-screed based '} | {stats
            ?.config.coin || ''}
        {stats?.config.symbol || ''} Mining Pool</title
    >
</svelte:head>

<!-- Start Grid Container -->
<div class="min-h-screen">
<div
    class="container mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-3 items-start gap-4 p-4"
>
    {#if typeof stats === 'undefined' && error.type === 'none'}
        <!-- Handle if requested pool doesnt exist
    	       redirect to special error page -->
        <MissingPool />
    {:else if error.type === 'none'}
        <div class="lg:col-span-1">
            <NetworkStats {stats} />
            <Pool {stats} {blocks} {historical} />
        </div>

        <div class="lg:col-span-2 min-h-screen">
            <slot />
            {#if ENV.DISPLAY_BLOCKS_CARD}
                <Blocks {blocks} />
            {/if}
        </div>
    {:else if error.type === 'api'}
        <ErrorBox error_msg="Statistics API temporarily unavailable" />
    {:else if error.type === 'limiter'}
        <ErrorBox error_msg="Too many requests!" />
    {:else}
        <ErrorBox error_msg="An unknown error occured with the statistics API" />
    {/if}
</div>
<!-- END GRID container -->
</div>

<footer class="t-footer-text m-auto my-10 block max-w-xs text-center">
    powered by <a href="https://github.com/blinkhash/foundation-server">foundation</a>
    and
    <a href="https://github.com/qirpi/foundation-screed">foundation-screed</a>
</footer>
