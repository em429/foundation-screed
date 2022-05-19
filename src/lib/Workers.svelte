<script lang="ts">
    import { page } from '$app/stores'

    import Transition from '$lib/Transition.svelte'

    export let miner
    export let my_workers = []
</script>

<!-- Start Workers Card -->
<div class="col-span-1 xl:col-span-2">
    <Transition x={100}>
        <div class="card col-span-1 min-h-fit overflow-x-auto p-0 shadow xl:col-span-2">
            <div class="space-x-3 bg-[#174C7E] p-2 sm:space-x-6">
                <a sveltekit:noscroll href="/{$page.params.pool}/{$page.params.wallet}">
                    <h2 class="inline-block text-xl font-bold text-white sm:text-2xl">
                        My Workers
                    </h2>
                </a>

                <a
                    sveltekit:prefetch
                    sveltekit:noscroll
                    href="/{$page.params.pool}/{$page.params.wallet}/tx"
                >
                    <h2 class="inline-block text-xl font-bold text-zinc-300 sm:text-2xl">
                        My Transactions
                    </h2>
                </a>
            </div>

            {#if Object.keys(my_workers)?.length === 0}
                <span class="supra block py-3 pl-2">No Workers</span>
            {:else}
                <div class="overflow-x-auto">
                    <table
                        class="table-auto text-left border-orange-200 w-full text-xs sm:text-sm"
                    >
                        <!-- Workers Table -->

                        <thead class="border-orange-200">
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
                                    <tr class="hover:bg-blue-100">
                                        <td>{worker?.worker.split('.')[1]}</td>
                                        <td>
                                            {(
                                                parseFloat(worker?.hashrate) /
                                                1000 ** 2
                                            ).toFixed(2)}
                                            <span class="text-xs">MH/s</span>
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
    </Transition>
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
