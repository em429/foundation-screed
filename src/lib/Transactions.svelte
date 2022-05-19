<script lang="ts">
    import { page } from '$app/stores'

    import Transition from '$lib/Transition.svelte'

    export let transactions = []

    // Filter workers object to only contain our wallet
    //    const filtered_blocks = blocks.shared.filter(
    //  	(worker) => worker?.worker.split('.')[0] === $page.params.wallet
    //)

    let pathname = $page.url.pathname.split('/')[3]
</script>

<!--    class:text-base={$page.params} -->
<!-- Start Transactions Card -->
<div class="col-span-1 overflow-x-hidden xl:col-span-2">
    <Transition x={100}>
        <div class="card col-span-1 min-h-fit overflow-x-auto p-0 shadow xl:col-span-2">
            <div class="space-x-3 bg-[#174C7E] p-2 text-white sm:space-x-6">
                <a sveltekit:noscroll href="/{$page.params.pool}/{$page.params.wallet}">
                    <h2
                        class:text-zinc-300={pathname === 'tx'}
                        class="inline-block text-xl font-bold sm:text-2xl"
                    >
                        My Workers
                    </h2>
                </a>

                <a href="/{$page.params.pool}/{$page.params.wallet}/tx">
                    <h2 class="inline-block text-xl font-bold text-white sm:text-2xl">
                        My Transactions
                    </h2>
                </a>
            </div>

            <!-- Miner Stats Table -->
            <div class="overflow-x-auto">
                {#if transactions.length !== 0}
                    <table class="w-full table-auto text-xs sm:text-sm">
                        <thead class="border-orange-200 text-left">
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Transaction Hash</th>
                            </tr>
                        </thead>

                        <tbody>
                            {#each transactions || [] as tx}
                                <tr class="hover:bg-blue-100">
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
                                            href="https://rvn.tokenview.com/en/tx/{tx?.txid}"
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
                    <p>
                        The transaction validation API is currently unavailable, please
                        check back in a few minutes.
                    </p>
                {/if}
            </div>
            <!-- END miner Stats Table -->
        </div>
    </Transition>
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
