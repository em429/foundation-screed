<script lang="ts">
    import { page } from '$app/stores'
    import { ENV } from '$lib/env.js'

    export let transactions = []

    let pathname = $page.url.pathname.split('/')[3]
</script>

<!-- Start Transactions Card -->
<div class="mt-4 overflow-x-hidden t-card-shadow">
        <div class="t-card-body card">
            <div class="space-x-3 t-card-header sm:space-x-6">
                <a sveltekit:noscroll href="/{$page.params.pool}/{$page.params.wallet}">
                    <h2
                        class:t-card-header-inactive-text={pathname === 'tx'}
                        class="inline-block text-xl font-bold sm:text-2xl"
                    >
                        My Workers
                    </h2>
                </a>

                <a href="/{$page.params.pool}/{$page.params.wallet}/tx">
                    <h2 class="inline-block text-xl font-bold  sm:text-2xl">
                        My Transactions
                    </h2>
                </a>
            </div>

            <!-- Miner Stats Table -->
            <div class="overflow-x-auto">
                {#if transactions.length !== 0}
                    <table class="w-full table-auto text-xs sm:text-sm">
                        <thead class="text-left">
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Transaction Hash</th>
                            </tr>
                        </thead>

                        <tbody>
                            {#each transactions || [] as tx}
                                <tr>
                                    <td>
                                        {new Date(
                                            parseInt(tx?.time) * 1000
                                        ).toLocaleDateString('en-US')}
                                        <span class="text-xs">
                                            {new Date(
                                                parseInt(tx?.time) * 1000
                                            ).toLocaleTimeString('en-US', {
                                                hour12: false,
                                            })}
                                        </span>
                                    </td>

                                    <td>{(tx?.amount * -1).toFixed(3)}</td>

                                    <td>
                                        <span class="badge ~positive"> PAYOUT </span>
                                    </td>

                                    <td class="text-xs">
                                        <!-- TODO: Make block explorer URL configurable per $pool in configs! -->
                                        <a
                                            target="_blank"
                                            class="underline decoration-dotted hover:decoration-solid"
                                            href="{ENV.TX_EXPLORER_URL}/{tx?.txid}"
                                        >
                                            {tx?.txid}
                                        </a>
                                    </td>
                                </tr>

                            {/each}

                        </tbody>
                    </table>
                    {/if}

                {#if transactions.length === 0}
                <div class="p-2">
                    <p>
                        The transaction validation API is currently unavailable, please
                        check back in a few minutes.
                    </p>
                </div>
                {/if}
            </div>
            <!-- END miner Stats Table -->
        </div>
</div>

<!-- END Card -->
<style>
    th {
        padding: 4px 0 2px 8px;
    }
    td {
        padding: 3px 0 5px 8px;
    }
</style>
