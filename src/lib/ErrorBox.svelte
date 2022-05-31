<script>
export let error_msg

import { appSettingsStore } from '$lib/stores.js'
const { SCD_STRATUM_URL } = $appSettingsStore

</script>

<div class="content">
    <h1>{error_msg}</h1>
    <p>Please try again later, and if the problem persists, contact support.</p>
    <h2>Stratums address:</h2>
    <p>
        lowdiff: <code>{SCD_STRATUM_URL}:3333</code><br />
        highdiff: <code>{SCD_STRATUM_URL}:4334</code>
    </p>
</div>
