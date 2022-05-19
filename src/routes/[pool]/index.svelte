<script context="module">
    import { ENV } from '$lib/env.js'

    let stats

    export async function load({ url, stuff, params }) {
        stats = stuff.stats

        const { pool } = params

        let historical_json = await fetch(
            `${ENV.FOUNDATION_API_BASE}/${pool}/historical`
        ).then(res => {
             if (!res.ok) { throw new Error() }
             return res.json()
          }
        ).catch(error => { console.log(error) })

        let historical = historical_json?.body.primary

        // if (historical_json) {
        // }

        return { props: { historical } }
    }
</script>

<script>
    import SearchWallet from '$lib/SearchWallet.svelte'
</script>

<!-- <SearchWallet {stats} /> -->
<SearchWallet />
