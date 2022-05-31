<script>
import { appSettingsStore } from '$lib/stores'

const { SCD_DEFAULT_COIN_ENDPOINT, SCD_FOUNDATION_API_BASE } = $appSettingsStore

    // export function load({params}) {
    //     return {
    //         status: 302,
    //         // TODO: replace with $default_pool from config
    //         redirect: SCD_DEFAULT_COIN_ENDPOINT,
    //     }
    // }

/*  let pools = []
    export async function load({ error, status, url }) {
        let pools_json = await fetch(SCD_FOUNDATION_API_BASE + '/pools').then((r) =>
            r.json()
        )

        pools = pools_json.body
        console.log({ pools_json })

        return {
            props: {
                pools,
            },
        }
    }
*/
</script>

<div class="content">
    <h1>Requested pool doesn't exist!</h1>
    <h2>Try the below:</h2>
    <!-- TODO: Replace with dynamic config -->
    <a class="text-2xl" href="{SCD_DEFAULT_COIN_ENDPOINT}">{SCD_DEFAULT_COIN_ENDPOINT}</a>

<!--    {#each pools || [] as pool}
        <a class="text-2xl" href=`${pool_url}/${pool_name}`>${pool}</a>
    {/each}
-->

</div>
