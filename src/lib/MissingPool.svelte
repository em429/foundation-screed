<script>
    import { ENV } from '$lib/env.js'

    export function load({params}) {
        return {
            status: 302,
            // TODO: replace with $default_pool from config
            redirect: ENV.DEFAULT_COIN_ENDPOINT,
        }
    }

/*  let pools = []
    export async function load({ error, status, url }) {
        let pools_json = await fetch(ENV.FOUNDATION_API_BASE + '/pools').then((r) =>
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
    <a class="text-2xl" href="{ENV.DEFAULT_COIN_ENDPOINT}">{ENV.DEFAULT_COIN_ENDPOINT}</a>

<!--    {#each pools || [] as pool}
        <a class="text-2xl" href=`${pool_url}/${pool_name}`>${pool}</a>
    {/each}
-->

</div>
