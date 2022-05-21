<script lang="ts">
    import { page } from '$app/stores'
    import { ENV } from '$lib/env.js'

    export let miner
    export let my_workers = []
</script>

<!-- Start Workers Card -->
<div class="mt-4 overflow-x-hidden t-card-shadow">
        <div class="card t-card-body min-h-fit overflow-x-auto p-0">
            <div class="space-x-3 t-card-header sm:space-x-6">
                <a sveltekit:noscroll href="/{$page.params.pool}/{$page.params.wallet}">
                    <h2 class="inline-block text-xl font-bold sm:text-2xl">
                        My Workers
                    </h2>
                </a>

                <a
                    sveltekit:prefetch
                    sveltekit:noscroll
                    href="/{$page.params.pool}/{$page.params.wallet}/tx"
                >
                    <h2 class="inline-block text-xl font-bold t-card-header-inactive-text sm:text-2xl">
                        My Transactions
                    </h2>
                </a>
            </div>

            {#if Object.keys(my_workers)?.length === 0}
                <span class="supra block py-3 pl-2">No Workers</span>
            {:else}
                <div class="overflow-x-auto">
                    <table
                        class="table-auto text-left w-full text-xs sm:text-sm"
                    >
                        <!-- Workers Table -->

                        <thead>
                            <tr>
                                <th>Worker Name</th>
                                <th>Hashrate</th>
                                <th>Total Shares</th>
                                <th>Time (%)</th>
                                <th>Work (%)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {#each my_workers || [] as worker}
                                {#if worker?.hashrate !== 0}
                                    <tr>
                                        <td>{worker?.worker.split('.')[1]}</td>
                                        <td>
                                            {(
                                                parseFloat(worker?.hashrate) /
                                                ENV.WORKER_HASHRATE_DISPLAY_MULTIPLIER
                                            ).toFixed(2)}
                                            <span class="text-xs">{ENV.WORKER_HASHRATE_DISPLAY_UNIT}/s</span>
                                        </td>
                                        <td>{worker?.shares.valid}</td>
                                        <td
                                            >{(
                                                (worker?.times / miner?.times.shared) *
                                                100
                                            ).toFixed(1)}%</td
                                        >
                                        <td
                                            >{(
                                                (worker?.work / miner?.work.shared) *
                                                100
                                            ).toFixed(1)}%</td
                                        >
                                    </tr>
                                {/if}
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/if}
        </div>
</div>

<!-- END Card -->
<style>
    th {
        padding: 4px 0 2px 8px;
    }
    td {
        padding: 4px 0 2px 8px;
    }
</style>
