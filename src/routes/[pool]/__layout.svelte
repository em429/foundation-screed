<script context="module">
// const hydrate = false
    
import { appSettingsStore } from '$lib/stores.js'
import { get } from 'svelte/store'
import { handleError } from '$lib/utils.js'
import ErrorBox from '$lib/ErrorBox.svelte'


export async function load({ url, fetch, params, status  }) {
    const ENV = get(appSettingsStore)

    let stats
    let blocks
    let historical
    let error = { type: 'none', message: '' }

    let stats_json = await fetch(`${ENV.SCD_FOUNDATION_API_BASE}/${params.pool}`)
        .then((r) => r.json())
        .catch((e) => {
            error = handleError(e)
        })
    stats = stats_json?.body.primary

    let blocks_json = await fetch(`${ENV.SCD_FOUNDATION_API_BASE}/${params.pool}/blocks`)
        .then((r) => r.json())
        .catch((e) => {
            error = handleError(e)
        })
    blocks = blocks_json?.body.primary

    let historical_json = await fetch(
        `${ENV.SCD_FOUNDATION_API_BASE}/${params.pool}/historical`
    )
        .then((r) => r.json())
        .catch((e) => {
            error = handleError(e)
        })
    historical = historical_json?.body.primary

    // Handle wallet submit:
    //   If user enters their wallet address in form on SearchWallet component
    const wallet = url.searchParams.get('wallet')
    if (wallet) {
        return {
            status: 302,
            redirect: `/${params.pool}/${wallet}`,
            stuff: { stats, },
        }
    }

    return {
        props: {
            stats,
            blocks,
            historical,
            error,
        },
        stuff: {
            stats,
        },
    }
}
</script>

<script>
import Pool from '$lib/Pool.svelte'
// import MissingPool from '$lib/MissingPool.svelte'
import NetworkStats from '$lib/NetworkStats.svelte'
import Blocks from '$lib/Blocks.svelte'


export let stats
export let error
export let blocks
export let historical

const { SCD_POOL_NAME, SCD_HIDE_BLOCKS_CARD } = $appSettingsStore

</script>

<svelte:head>
    <title
        >{SCD_POOL_NAME || 'foundation-server and foundation-screed based '} | {stats
            ?.config.coin || ''}
        {stats?.config.symbol || ''} Mining Pool</title
    >
</svelte:head>

<!-- Start Grid Container -->
<div class="min-h-screen">
    <div
        class="container mx-auto grid max-w-6xl grid-cols-1 items-start gap-4 p-4 lg:grid-cols-3"
    >
        <!-- Handle if requested pool doesnt exist
       redirect to special error page -->
        <!-- Disabled temporaroly. TODO: add better detection of missing pool
        {#if typeof stats === 'undefined' && error.type === 'none'}
            <MissingPool />
    -->

       {#if error.type === 'none'}
            <div class="lg:col-span-1">
                <NetworkStats {stats} />
                <Pool {stats} {blocks} {historical} />
            </div>

            <div class="min-h-screen lg:col-span-2">
                <slot />
                {#if !SCD_HIDE_BLOCKS_CARD}
                    <Blocks {blocks} />
                {/if}
            </div>
            
        {:else if error.type === 'api'}
            <ErrorBox error_msg="Statistics API temporarily unavailable" />
        {:else if error.type === 'limiter'}
            <ErrorBox error_msg="Too many requests!" />
        {:else if error.type === 'unknown'}
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
