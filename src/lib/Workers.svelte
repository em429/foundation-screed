<!-- END Card -->
<style>
th {
    padding: 4px 0 2px 8px;
}
td {
    padding: 4px 0 2px 8px;
}
</style>

<script lang="ts">
import { page } from '$app/stores'
import { ENV } from '$lib/env.js'

export let miner
export let my_workers = []
</script>

<!-- Start Workers Card -->
    <div class="mt-4 t-card-body card">
        <div class="t-card-header space-x-3 sm:space-x-6">
            <a sveltekit:noscroll href="/{$page.params.pool}/{$page.params.wallet}">
                <h2 class="inline-block text-xl font-bold sm:text-2xl">My Workers</h2>
            </a>

            <a
                sveltekit:prefetch
                sveltekit:noscroll
                href="/{$page.params.pool}/{$page.params.wallet}/tx"
            >
                {#if ENV.POOL_SOLO}
                    <!-- Disable Transactions tab on solo pools as payments are generated directly to
                     miner's address.
                -->
                    <h2
                        class="t-card-header-inactive-text inline-block text-xl font-bold sm:text-2xl"
                    >
                        My Transactions
                    </h2>
                {/if}
            </a>
        </div>

        {#if Object.keys(my_workers)?.length === 0}
            <span class="supra block py-3 pl-2">No Workers</span>
        {:else}
            <div class="overflow-x-auto">
                <table class="w-full table-auto text-left text-xs sm:text-sm">
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
                                        <span class="text-xs"
                                            >{ENV.WORKER_HASHRATE_DISPLAY_UNIT}/s</span
                                        >
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
