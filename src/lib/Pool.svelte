<!-- END card -->
<style>
th {
    padding: 4px 0 2px 8px;
}
td {
    padding: 4px 0 2px 8px;
}
</style>


<script>
export let stats
export let blocks
export let historical

import { appSettingsStore } from '$lib/stores.js'
const {
    SCD_POOL_HASHRATE_DISPLAY_UNIT,
    SCD_POOL_SHARED,
    SCD_POOL_CARD_TITLE,
} = $appSettingsStore
const hashrate_display = getHashrateMultiplier(SCD_POOL_HASHRATE_DISPLAY_UNIT)

import { getHashrateMultiplier } from '$lib/utils.js'
import { differenceInSeconds, intervalToDuration } from 'date-fns'
import { average } from '$lib/utils.js'


let last_5_historical = []
let last_5_hashrate = []
let hashrate_obj

// Calculate average hashrate over last 5 entries in /historical
last_5_historical = historical?.slice(-5)

last_5_historical?.map((obj) => {
    if (SCD_POOL_SHARED) {
        hashrate_obj = obj.hashrate.shared
    } else {
        hashrate_obj = obj.hashrate.solo
    }

    last_5_hashrate?.push(hashrate_obj)
})
let avg_hashrate = average(last_5_hashrate)

// Calculate Est. Avg. Blocktime as a Date object
let est_avg_blocktime
try {
    est_avg_blocktime = intervalToDuration({
        start: 0,
        end: (stats?.network.hashrate / avg_hashrate) * 60 * 1000,
    })
} catch (error) {
    // TODO specify RangeError
    est_avg_blocktime = 0
}

// Determine necessary values for Progress calculation
let last_block_epoch = blocks?.confirmed[0]?.time
let next_block_epoch =
    last_block_epoch + (stats?.network.hashrate / avg_hashrate) * 60 * 1000
let est_seconds_to_next_block = differenceInSeconds(next_block_epoch, last_block_epoch)
let seconds_since_last_block = differenceInSeconds(
    new Date().getTime(),
    blocks?.confirmed[0]?.time
)

</script>

<!-- Start Pool Card -->
<div class="t-card-body card mt-4">
    <div class="t-card-header">
        <h2 class="text-2xl font-bold">{SCD_POOL_CARD_TITLE}</h2>
    </div>

    <!-- Pool Stats Table -->
    <div class="overflow-x-auto">
        <table class="w-full table-auto text-left">
            <tbody class="text-sm">
                <tr>
                    <th>Hashrate</th>
                    <!-- convert hash to megahash by dividing by 1 mil -->
                    <!-- TODO: add env var for unit -->
                    <td class="font-bold italic">
                        {(avg_hashrate / 1000 ** 2).toFixed(2) + ' ' + hashrate_display.unit_short_name}
                    </td>
                </tr>
                <!-- Hide if no hashrate to avoid displaying a worker count from shared pool when
                     looking at a solo pool -->
                {#if avg_hashrate > 0}
                    <tr>
                        <th>Workers</th>
                        <td>{stats?.status.workers}</td>
                    </tr>
                {/if}
                <tr>
                    <th>Fee</th>
                    <td>{stats?.config.recipientFee * 100}%</td>
                </tr>
                <!--
                <tr>
                    <th>Effort</th>
                    <td>{parseFloat(stats?.status.effort).toFixed(2)}</td>
                </tr>
                -->

                <!-- SOLO POOL: hidden fields below -->

                <!--
                To calculate progress:
                  First we get the difference of the estimated future block date and the last block date,
                  and store it in seconds_to_block.

                  Then we divide the
                 
               
                  est_blocktime_in_seconds

                  / (now_unix_timestap + est_blocktime_in_seconds)
                -->

                <!-- Values below only displayed on shared pools
                -->
                {#if SCD_POOL_SHARED}
                    <!-- Hide Progress if pool hashrate is 0 -->
                    {#if avg_hashrate > 0}
                        <tr>
                            <th>Progress</th>
                            <td>
                                {(
                                    (seconds_since_last_block /
                                        est_seconds_to_next_block) *
                                    100
                                ).toFixed(0)}%
                            </td>
                        </tr>
                    {/if}
                    <tr>
                        <!-- luck1, luck10, luck100 show the pool luck over the last x blocks-->
                        <th>Luck (last 10 blocks)</th>
                        <td>{parseFloat(stats?.status.luck.luck10)}</td>
                    </tr>
                    <tr>
                        <th>Next Payment</th>
                        <td
                            >{new Date(parseInt(stats?.payments.next)).toLocaleTimeString(
                                'en-US'
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Total Blocks Found</th>
                        <!-- blocks are retained indefinitely, shares reset at start of
                             every new round after a block is found. -->
                        <td>{stats?.blocks.valid}</td>
                    </tr>

                    <!--
                    <tr>
                        <th>Last Found</th>
                        <td>TODO minutes ago</td>
                    </tr>
                    -->
                    <tr>
                        <th>Shares This Round</th>
                        <td>{stats?.shares.valid}</td>
                    </tr>

                    <tr>
                        <th>Pay System</th>
                        <td>PPLNT</td>
                    </tr>
                    <!-- To calculate Estimated Avg. Time to next block in seconds:
        	           network_hashrate / pool_hashrate * block_time_in_seconds
        	           Hide if pool hashrate is 0
        	    -->
                    {#if avg_hashrate > 0}
                        <tr>
                            <th>Est.Avg. Time</th>
                            <td>
                                {#if est_avg_blocktime === 0}
                                    N/A
                                {:else}
                                    {est_avg_blocktime.days}d {est_avg_blocktime.hours}h {est_avg_blocktime.minutes}m
                                {/if}
                            </td>
                        </tr>
                    {/if}
                {/if}
            </tbody>
        </table>
    </div>
    <!-- End Pool Stats Table -->
</div>
