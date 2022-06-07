<script context="module">
// Supply your own landing page if you enable it, it's not included
// in the repo by default.
//
// You can mix and match Markdown and regular svelte code as you wish.
// Check out mdsvex.com for more info
//
import { appSettingsStore } from '$lib/stores'
import { get } from 'svelte/store';

// TODO: figure out how to do landingpages without building separately per instance
import LandingPage from '../LandingPage.md'

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

<div class="p-4 my-20 max-w-3xl mx-auto">

<LandingPage />

<div class="mt-14 text-center">
    <a href="{SCD_DEFAULT_COIN_ENDPOINT}">
    <button class="font-bold btn text-2xl">View Stats</button>
    </a>
</div>

</div>
