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

import { appSettingsStore } from '$lib/stores.js'
const {
    SCD_WORKER_HASHRATE_DISPLAY_MULTIPLIER,
    SCD_WORKER_HASHRATE_DISPLAY_UNIT,
    SCD_POOL_SHARED,
} = $appSettingsStore

import { getHashrateMultiplier } from '$lib/utils.js'
const hashrate_display = getHashrateMultiplier(SCD_WORKER_HASHRATE_DISPLAY_UNIT)

export let miner
export let my_workers = []

let miner_work_obj = miner?.work.shared
let miner_times_obj = miner?.times.shared

console.log(miner_work_obj)
console.log(miner_times_obj)

if (!SCD_POOL_SHARED) {
    miner_work_obj = miner?.work.solo
    miner_times_obj = miner?.times.solo
}

</script>

<!-- Start Workers Card -->
<div class="t-card-body card mt-4">
    <div class="t-card-header space-x-3 sm:space-x-6">
        <a sveltekit:noscroll href="/{$page.params.pool}/{$page.params.wallet}">
            <h2 class="inline-block text-xl font-bold sm:text-2xl">My Workers</h2>
        </a>

<!--
        <a
            sveltekit:prefetch
            sveltekit:noscroll
            href="/{$page.params.pool}/{$page.params.wallet}/tx"
        >
            <h2
                class="t-card-header-inactive-text inline-block text-xl font-bold sm:text-2xl"
            >
                My Transactions
            </h2>
        </a>
        -->
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
                        <!-- <th>Time (%)</th> -->
                        <th>Work (%)</th>
                    </tr>
                </thead>

                <tbody>
                    {#each my_workers || [] as worker}
                        {#if worker?.hashrate !== 0}
                            <tr>
                                <td>{worker?.worker.split('.')[1] || "Unnamed Rig"}</td>
                                <td>
                                    {(
                                        parseFloat(worker?.hashrate) /
                                        hashrate_display.multiplier
                                    ).toFixed(2)}
                                    <span class="text-xs"
                                        >{hashrate_display.unit_short_name}</span
                                    >
                                </td>
                                <td>{worker?.shares.valid}</td>
                                <!--<td
                                    >
                                    {console.log(worker.time)}

                                    {((worker?.times / miner_times_obj) * 100).toFixed(
                                        1
                                    )}%</td
                                >
                                -->
                                <td
                                    >{((worker?.work / miner_work_obj) * 100).toFixed(
                                        1
                                    )}%</td
                                >
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>
