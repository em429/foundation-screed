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

import { getHashrateMultiplier } from '$lib/utils.js'

import { appSettingsStore } from '$lib/stores.js'
const {
    SCD_NETWORK_HASHRATE_DISPLAY_UNIT,
    SCD_BLOCK_EXPLORER_URL,
    SCD_BLOCK_TIME_IN_SECONDS,
    SCD_BLOCK_TIME_UNIT,
    SCD_BLOCK_TIME_UNIT_DIVIDER,
} = $appSettingsStore

const hashrate_display = getHashrateMultiplier(SCD_NETWORK_HASHRATE_DISPLAY_UNIT)
</script>

<div class="t-card-body card">
    <div class="t-card-header">
        <h2 class="text-2xl font-bold">Network</h2>
    </div>

    <!-- Network Stats Table -->
    <div class="overflow-x-auto">
        <table class="w-full table-auto text-left text-sm">
            <tbody>
                <tr>
                    <th>Hashrate</th>
                    <td class="font-bold italic">
                        {(
                            parseFloat(stats?.network.hashrate) /
                            hashrate_display.multiplier
                        ).toFixed(2) +
                            ' ' +
                            hashrate_display.unit_short_name}
                    </td>
                </tr>
                <tr>
                    <th>Difficulty</th>
                    <td>{(parseFloat(stats?.network.difficulty) / 1000).toFixed(2)} K</td>
                </tr>
                <tr>
                    <th>Block Height</th>
                    <td>
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
                            href="{SCD_BLOCK_EXPLORER_URL}/{stats?.network.height}"
                            class="underline decoration-dotted hover:decoration-solid"
                        >
                            {[
                                stats?.network.height.toString().slice(0, 1),
                                ',',
                                stats?.network.height.toString().slice(1, 4),
                                ',',
                                stats?.network.height.toString().slice(4),
                            ].join('')}
                        </a>
                    </td>
                </tr>
                <tr>
                    <th>Block Time</th>
                    <td
                        >{SCD_BLOCK_TIME_IN_SECONDS / SCD_BLOCK_TIME_UNIT_DIVIDER}
                        {SCD_BLOCK_TIME_UNIT}</td
                    >
                </tr>

                <!--
                            <tr>
                                <th>Last Found</th>
                                <td>TODO minutes ago</td>
                            </tr>

                            -->
            </tbody>
        </table>
    </div>
    <!-- END Network Stats Table -->
    <!-- END card-body -->
</div>
