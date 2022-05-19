<script lang="ts">
    import Transition from '$lib/Transition.svelte'
    import { ENV } from '$lib/env.js'

    import { page, navigating } from '$app/stores'

    export let miner
    export let my_workers
    export let stats
    export let max_miner_time

    export let animate = true
    export let block_reward = ENV.BLOCK_REWARD

    // Extra polish for transitions: only animate the element that is really changing
    //   Animate the Miner card only when navigating to, or from the pool index. Do not
    //   animate when clicking between 'My Workers' and 'My Transactions' tabs.
    //
    // NOTE: IF animate is initialized as 'false' here, there would be a small glitch the
    //       first time 'My Transactions' is clicked after coming from the pool index page.
    //
    //       Not sure why is this, but initializing animate as true and changing the logic to
    //       the reverse fixed the glitch.
    if (
        $navigating?.to.pathname.endsWith(`/${$page.params.wallet}/tx`) &&
        $navigating?.from.pathname.endsWith(`${$page.params.wallet}`)
    ) {
        animate = false
    }
    if (
        $navigating?.to.pathname.endsWith(`/${$page.params.wallet}`) &&
        $navigating?.from.pathname.endsWith(`${$page.params.wallet}/tx`)
    ) {
        animate = false
    }
</script>

<!-- Start Miner Card -->
<div class="overlow-x-auto col-span-1 xl:col-span-2">
    <Transition x={100} {animate}>
        <div class="card relative min-h-fit p-0 shadow shadow-orange-800/20">
            <div class="bg-[#174C7E] p-2">
                <a sveltekit:prefetch sveltekit:noscroll href="/">
                    <button class="button bg-blue-600 align-text-bottom">
                        <span class="icon text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                        </span>
                    </button>
                </a>
                <h2 class="inline-block text-2xl font-bold text-white">Miner</h2>
                <h2
                    class="absolute right-2 top-4 hidden text-sm font-bold text-zinc-200 sm:top-3 sm:inline-block sm:text-lg"
                >
                    {$page.params.wallet}
                </h2>
            </div>

            <!-- Miner Stats Table -->
            <div class=" grid grid-cols-1 overflow-x-auto p-1 sm:grid-cols-2">
                <div class="col-span-1">
                    <table class="w-full table-auto text-left">
                        <tbody class="text-sm">
                            <tr class="hover:bg-blue-100">
                                <th>Hashrate</th>
                                <!-- convert Hash to Megahash by dividing it by 1 million -->
                                <td
                                    >{(
                                        parseFloat(miner?.hashrate.shared) /
                                        1000 ** 2
                                    ).toFixed(2)}
                                    <span class="text-xs">MH/s</span>
                                </td>
                            </tr>
                            <tr class="hover:bg-blue-100">
                                <th>Efficiency</th>
                                <td>
                                    {#if miner?.shares.shared.invalid + miner?.shares.shared.stale === 0}
                                        100%
                                    {:else}
                                        {((miner?.shares.shared.invalid +
                                            miner?.shares.shared.stale) /
                                            miner?.shares.shared.valid) *
                                            100}
                                    {/if}
                                </td>
                            </tr>
                            <tr class="hover:bg-blue-100">
                                <th>Workers</th>
                                <!-- Filter out inactive workers -->
                                <td>
                                    {my_workers?.filter((worker) => worker?.hashrate != 0)
                                        .length}
                                </td>
                            </tr>
                            <tr class="hover:bg-blue-100">
                                <th>Total Shares</th>
                                <td>
                                    {#if typeof miner?.shares.shared.valid === 'undefined'}
                                        0
                                    {:else}
                                        {miner?.shares.shared.valid}
                                    {/if}
                                </td>
                            </tr>
                            <!-- The Miner Round Share is the miners current share percent of the
                             block reward for the current round. -->

                            <tr class="hover:bg-blue-100">
                                <th>Round Share</th>
                                <td>
                                    {#if typeof miner?.shares.shared.valid === 'undefined'}
                                        0 %
                                    {:else}
                                        {(
                                            (miner?.shares.shared.valid /
                                                stats?.shares.valid) *
                                            100
                                        ).toFixed(2)} %
                                    {/if}
                                </td>
                            </tr>
                            <!--
                    The Round Est. (round estimate) is an estimate of how much
                    would be earned by the miner if a block is found right now.
                    How it is calculated depends on the Pay System used by the pool.

a                    The essence of the formula used is the same for all Pay Systems:
                    RoundEst = MinerShare / EveryonesShares * BlockRewardAndFees

                    For PPLNT, an if needs to be introduced:

                    If time mining >= 51% of the max:
                        Estimate = (shares / total shares) * (block reward - fees)
                    Otherwise:
                  	    Estimate = (( (1 - (time / max time) ) * shares) / total shares)
                  	               * (block reward - fees)

                    In essence: the system punishes pool-hoppers by rewarding time spent mining.

                                If someone is connected for less than 50% of the round, they get
                                their shared reduced by at least 50%.
          	        -->
                            <!-- TODO: calculate this somewhere else instead of the template;
          	           it's a bit too much complexity here -->
                            <tr class="hover:bg-blue-100">
                                <th>Est. Earnings</th>

                                <td>
                                    {#if miner?.times.shared === 0}
                                        0
                                    {:else if miner?.times.shared >= max_miner_time * 0.51}
                                        {(
                                            (miner?.shares.shared.valid /
                                                stats?.shares.valid) *
                                            (block_reward -
                                                block_reward * stats?.config.recipientFee)
                                        ).toFixed(4)}
                                    {:else}
                                        {(
                                            (((1 - miner?.times.shared / max_miner_time) *
                                                miner?.shares.shared.valid) /
                                                stats?.shares.valid) *
                                            (block_reward -
                                                block_reward * stats?.config.recipientFee)
                                        ).toFixed(4)}
                                    {/if}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-span-1">
                    <span class="text-md mt-2 inline-block pl-1 font-bold sm:mt-0 sm:p-0">
                        Payments & Balances
                    </span>
                    <table class="w-full table-auto text-left">
                        <tbody class="text-sm">
                            <tr class="hover:bg-blue-100">
                                <th>Unconfirmed</th>
                                <td>{miner?.payments.immature}</td>
                            </tr>
                            <tr class="hover:bg-blue-100">
                                <th>Unpaid</th>
                                <td>{miner?.payments.balances}</td>
                            </tr>
                            <tr class="hover:bg-blue-100">
                                <th>Immature</th>
                                <td>{miner?.payments.immature}</td>
                            </tr>
                            <tr class="hover:bg-blue-100">
                                <th>Validated</th>
                                <td>{miner?.payments.generate}</td>
                            </tr>
                            <tr class="hover:bg-blue-100">
                                <th>Total Paid</th>
                                <td>{miner?.payments.paid}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- END miner Stats Table -->
        </div>
    </Transition>
</div>

<!-- END Card -->
<style>
    th {
        padding: 2px 0 2px 6px;
    }
    td {
        padding: 2px 0 2px 6px;
    }
</style>
