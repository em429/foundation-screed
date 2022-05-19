<script lang="ts">
    import { differenceInSeconds, intervalToDuration } from 'date-fns'

    import { average } from '$lib/utils.js'

    export let stats
    export let blocks
    export let historical
    let last_5_historical = []
    let last_5_hashrate = []


    // Calculate average hashrate over last 5 entries in /historical
     last_5_historical = historical?.slice(-5)

    last_5_historical?.map((obj) => {
        last_5_hashrate?.push(obj.hashrate.shared)
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
    let est_seconds_to_next_block = differenceInSeconds(
        next_block_epoch,
        last_block_epoch
    )
    let seconds_since_last_block = differenceInSeconds(
        new Date().getTime(),
        blocks?.confirmed[0]?.time
    )


</script>

<!-- Start Pool Card -->
<div class="card col-span-1 min-h-fit overflow-x-auto p-0 shadow">
    <div class="bg-[#174C7E] p-2">
        <h2 class="text-2xl font-bold text-white">Pool</h2>
    </div>

    <!-- Pool Stats Table -->
    <div class="overflow-x-auto">
        <table class="w-full table-auto text-left">
            <tbody class="text-sm">
                <tr class="hover:bg-blue-100">
                    <th>Hashrate</th>
                    <!-- convert hash to megahash by dividing by 1 mil -->
                    <td class="font-bold italic">
                        {(avg_hashrate / 1000 ** 2).toFixed(2) +
                            ' MH/s'}
                    </td>
                </tr>
                <!--
                To calculate progress:
                  First we get the difference of the estimated future block date and the last block date,
                  and store it in seconds_to_block.

                  Then we divide the
                 
               
                  est_blocktime_in_seconds

                  / (now_unix_timestap + est_blocktime_in_seconds)
                -->
                <tr class="hover:bg-blue-100">
                    <th>Progress</th>
                    <td>
                        {(
                            (seconds_since_last_block / est_seconds_to_next_block) *
                            100
                        ).toFixed(0)}%
                    </td>
                </tr>

                <!--
                <tr class="hover:bg-blue-100">
                    <th>Effort</th>
                    <td>{parseFloat(stats?.status.effort).toFixed(2)}</td>
                </tr>
                -->

                <tr class="hover:bg-blue-100">
                    <!-- luck1, luck10, luck100 show the pool luck over the last x blocks-->
                    <th>Luck (last 10 blocks)</th>
                    <td>{parseFloat(stats?.status.luck.luck10)}</td>
                </tr>
                <tr class="hover:bg-blue-100">
                    <th>Workers</th>
                    <td>{stats?.status.workers}</td>
                </tr>
                <tr class="hover:bg-blue-100">
                    <th>Fee</th>
                    <td>{stats?.config.recipientFee * 100}%</td>
                </tr>
                <tr class="hover:bg-blue-100">
                    <th>Next Payment</th>
                    <td
                        >{new Date(parseInt(stats?.payments.next)).toLocaleTimeString(
                            'en-US'
                        )}
                    </td>
                </tr>
                <tr class="hover:bg-blue-100">
                    <th>Total Blocks Found</th>
                    <!-- blocks are retained indefinitely, shares reset at start of
                             every new round after a block is found. -->
                    <td>{stats?.blocks.valid}</td>
                </tr>
                <!--
                    <tr class="hover:bg-blue-100">
                        <th>Last Found</th>
                        <td>TODO minutes ago</td>
                    </tr>
                    -->
                <tr class="hover:bg-blue-100">
                    <th>Shares This Round</th>
                    <td>{stats?.shares.valid}</td>
                </tr>
                <tr class="hover:bg-blue-100">
                    <th>Pay System</th>
                    <td>PPLNT</td>
                </tr>
                <!-- To calculate Estimated Avg. Time to next block in seconds:
        	           network_hashrate / pool_hashrate * block_time_in_seconds
        	    -->
                <tr class="hover:bg-blue-100">
                    <th>Est.Avg. Time</th>
                    <td>
                        {#if est_avg_blocktime === 0}
                            N/A
                        {:else}
                            {est_avg_blocktime.days}d {est_avg_blocktime.hours}h {est_avg_blocktime.minutes}m
                        {/if}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- End Pool Stats Table -->
</div>

<!-- END card -->
<style>
    th {
        padding: 4px 0 2px 8px;
    }
    td {
        padding: 4px 0 2px 8px;
    }
</style>
