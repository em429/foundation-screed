<script context="module">
import { appSettingsStore } from '$lib/stores'
import { get } from 'svelte/store';

export async function load() {
    // If Landing page feature is disabled, redirect straight
    // to the default coin page
    const ENV = get(appSettingsStore)

    let landing_enabled = ENV.SCD_ENABLE_LANDING_PAGE

    if (! ENV.SCD_ENABLE_LANDING_PAGE) {
        return {
            status: 302,
            redirect: ENV.SCD_DEFAULT_COIN_ENDPOINT,
        }
    }

    return { props: { } }
}

</script>

<script>

const { SCD_DEFAULT_COIN_ENDPOINT } = $appSettingsStore

</script>

<div class="p-4 my-20 max-w-7xl mx-auto">


<div class="mt-14 text-center">
    <a href="{SCD_DEFAULT_COIN_ENDPOINT}">
    <button class="font-bold btn text-2xl">Start Mining</button>
    </a>
</div>

</div>
