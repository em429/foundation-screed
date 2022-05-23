<!-- END Card -->
<style>
th {
    padding: 2px 0 2px 9px;
}
td {
    padding: 2px 0 2px 0;
}

@media (min-width: 640px) {
    .right-table th {
        padding: 2px 0 2px 1px;
    }
}
</style>

<script lang="ts">
import { ENV } from '$lib/env.js'

import { page, navigating } from '$app/stores'

export let miner
export let my_workers
export let stats
export let max_miner_time

// solo - shared config
let miner_share_obj
let miner_hashrate_obj

if (ENV.POOL_SHARED) {
    miner_hashrate_obj = miner?.hashrate.shared
    miner_share_obj = miner?.shares.shared
} else {
    miner_hashrate_obj = miner?.hashrate.solo
    miner_share_obj = miner?.shares.solo
}

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
<div class="t-card-body card relative">
    <div class="t-card-header">
        <a sveltekit:prefetch sveltekit:noscroll href="/">
            <button class="t-card-header-btn button align-text-bottom">
                <span class="icon">
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
        <h2 class="inline-block text-2xl font-bold">Miner</h2>
        <h3
            class="t-card-header-inactive-text absolute right-2 top-4 hidden text-sm font-bold sm:top-3 sm:inline-block sm:text-lg"
        >
            {$page.params.wallet}
        </h3>
    </div>

    <!-- Miner Stats Table -->
    <div class="grid grid-cols-1 overflow-x-auto sm:grid-cols-2">
        <div>
            <span class="inline-block pt-1 pl-2 text-lg font-bold"> Statistics </span>
            <table class="w-full table-fixed text-left">
                <tbody class="text-sm">
                    <tr>
                        <th>Hashrate</th>
                        <!-- convert Hash to Megahash by dividing it by 1 million -->
                        <td
                            >{(parseFloat(miner_hashrate_obj) / 1000 ** 2).toFixed(2)}
                            <span class="text-xs">MH/s</span>
                        </td>
                    </tr>
                    <tr>
                        <th>Workers</th>
                        <!-- Filter out inactive workers -->
                        <td>
                            {my_workers?.filter((worker) => worker?.hashrate != 0).length}
                        </td>
                    </tr>
                    <tr>
                        <th>Efficiency</th>
                        <td>
                            {#if miner_share_obj.valid + miner_share_obj.invalid + miner_share_obj.stale > 0}
                                {#if miner_share_obj.invalid + miner_share_obj.stale === 0}
                                    100%
                                {:else}
                                    {((miner_share_obj.invalid + miner_share_obj.stale) /
                                        miner_share_obj.valid) *
                                        100}
                                {/if}
                            {:else}
                                Not enough data
                            {/if}
                        </td>
                    </tr>
                    <tr>
                        <th>Total Shares</th>
                        <td>
                            {#if typeof miner_share_obj.valid === 'undefined'}
                                0
                            {:else}
                                {miner_share_obj.valid}
                            {/if}
                        </td>
                    </tr>

                    {#if ENV.POOL_SHARED}
                        <!-- The Miner Round Share is the miners current share percent of the
                             block reward for the current round. -->
                        <tr>
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
                        <tr>
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
                    {/if}
                </tbody>
            </table>
        </div>

        <div class="">
            <span class="mt-2 inline-block pl-2 text-lg font-bold sm:mt-1 sm:p-0">
                Payments & Balances
            </span>
            <table class="right-table w-full table-fixed text-left">
                <tbody class="text-sm">
                    <tr>
                        <th>Unconfirmed</th>
                        <td>{miner?.payments.immature}</td>
                    </tr>
                    {#if ENV.POOL_SHARED}
                        <tr>
                            <th>Unpaid</th>
                            <td>{miner?.payments.balances}</td>
                        </tr>
                    {/if}
                    <tr>
                        <th>Validated</th>
                        <td>{miner?.payments.generate}</td>
                    </tr>
                    <tr>
                        <th>Total Paid</th>
                        <td>{miner?.payments.paid}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- END miner Stats Table -->
</div>
