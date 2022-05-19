<script context="module">
    import { ENV } from '$lib/env.js'

    let stats
    let blocks
    let historical
    let api_error

    export async function load({ url, fetch, params, status }) {
        let stats_json = await fetch(ENV.FOUNDATION_API_BASE + `/${params.pool}`)
            .then((r) => r.json())
            .catch((error) => {
                api_error = true
            })
        stats = stats_json?.body.primary

        let blocks_json = await fetch(ENV.FOUNDATION_API_BASE + `/${params.pool}/blocks`)
            .then((r) => r.json())
            .catch((error) => {
                api_error = true
            })
        blocks = blocks_json?.body.primary

        let historical_json = await fetch(
            `${ENV.FOUNDATION_API_BASE}/${params.pool}/historical`
        )
            .then((r) => r.json())
            .catch((error) => {
                api_error = true
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
        >{ENV.POOL_NAME || 'foundation-server and foundation-screed based '} | {stats?.config.coin || ''} {stats
            ?.config.symbol || ''} Mining Pool</title
    >
    <script
        data-goatcounter="https://38pt.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"></script>
</svelte:head>

<main class="block min-h-screen p-4">
    <!-- Start Grid Container -->
    <div class=" container mx-auto grid max-w-xl grid-cols-1 items-start gap-4">
        {#if api_error}
            <div class="content">
                <h1>Statistics API is temporarily unavailable</h1>
                <h2>Stratums address:</h2>

                <p>
                    lowdiff: <code>{ENV.STRATUM_URL}:3333</code><br />
                    highdiff: <code>{ENV.STRATUM_URL}:4334</code>
                </p>
            </div>
        {:else if typeof stats === 'undefined' && !api_error}
            <!-- Handle if requested pool doesnt exist
    	       redirect to special error page -->
            <MissingPool />
        {:else}
            <div class="col-span-1 grid gap-4">
                <NetworkStats {stats} />
                <Pool {stats} {blocks} {historical} />
            </div>

            <div class="grid gap-4">
                <slot />
                <Blocks {blocks} />
            </div>
        {/if}
    </div>
    <!-- END GRID container -->
</main>
