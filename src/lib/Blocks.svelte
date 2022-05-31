<!-- END Card -->
<style>
th {
    padding: 4px 0 2px 8px;
}
td {
    padding: 3px 0 5px 8px;
}
</style>

<script lang="ts">
export let blocks = { confirmed: [], pending: [], kicked: [] }

import { appSettingsStore } from '$lib/stores.js'
const {
    SCD_BLOCK_EXPLORER_URL,
} = $appSettingsStore

// Augment block arrays coming from the API so they can be easily looped
//   over in the template as one array.
blocks?.confirmed.forEach((obj) => (obj['confirm'] = 'confirmed'))
blocks?.pending.forEach((obj) => (obj['confirm'] = 'pending'))
blocks?.kicked.forEach((obj) => (obj['confirm'] = 'kicked'))
</script>

<!-- Start Blocks Card -->
<div class="t-card-body t-card-shadow card mt-4">
    <div class="t-card-header">
        <a href="/">
            <h2 class="font-bold text-2xl">Blocks</h2>
        </a>
    </div>

    <!-- Miner Stats Table -->
    <div class="overflow-x-auto">
        <table class="w-full table-auto text-xs sm:text-sm ">
            <thead class="text-left">
                <tr>
                    <th>Date</th>
                    <th>Block</th>
                    <th>Confirm</th>
                    <th>Reward</th>
                    <!--<th>My Reward</th>-->
                    <th>Luck</th>
                </tr>
            </thead>

            <tbody>
                {#each [...blocks?.pending, ...blocks?.confirmed, ...blocks?.kicked] || [] as block}
                    <tr>
                        <td>
                            {new Date(parseInt(block?.time)).toLocaleDateString('en-US')}
                            <span class="text-xs">
                                {new Date(parseInt(block?.time)).toLocaleTimeString(
                                    'en-US',
                                    {
                                        hour12: false,
                                    }
                                )}
                            </span>
                        </td>
                        <td class="width-20">
                            <!-- Block icon -->
                            <span class="t-block-icon-color icon mb-1 mr-[-2px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                </svg>
                            </span>
                            <a
                                target="_blank"
                                class="underline decoration-dotted hover:decoration-solid"
                                href="{SCD_BLOCK_EXPLORER_URL}/{block?.height}"
                            >
                                {[
                                    block?.height.toString().slice(0, 1),
                                    ',',
                                    block?.height.toString().slice(1, 4),
                                    ',',
                                    block?.height.toString().slice(4),
                                ].join('')}
                            </a>
                        </td>
                        <td class="place-content-center">
                            {#if block?.confirm === 'confirmed'}
                                <span class="badge ~positive"> CONFIRMED </span>
                            {:else if block?.confirm === 'pending'}
                                <span class="badge ~warning"> PENDING </span>
                            {:else}
                                <span class="badge ~purple"> KICKED </span>
                            {/if}
                        </td>
                        <td>
                            <!-- Add a dot after the fourth position to make it readable,
                            	Reward comes in 'satoshis', so divide by 100 million
                            {[
                                block.reward.toString().slice(0, 4),
                                '.',
                                block.reward.toString().slice(4),
                            ].join('')}
                            -->
                            {block?.reward / 100000000}
                        </td>
                        <td>{block?.luck.toFixed(2)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <!-- END miner Stats Table -->
</div>
