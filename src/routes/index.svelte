<script context="module">
import { ENV } from '$lib/env.js'

// Supply your own landing page if you enable it, it's not included
// in the repo by default.
//
// You can mix and match Markdown and regular svelte code as you wish.
// Check out mdsvex.com for more info
//
import LandingPage from '../LandingPage.md'

export async function load() {
    // If Landing page feature is disabled, redirect straight
    // to the default coin page
    if (!ENV.ENABLE_LANDING_PAGE) {
        return {
            status: 302,
            redirect: ENV.DEFAULT_COIN_ENDPOINT,
        }
    }

    return {}
}
</script>

<div class="p-4 my-20 max-w-3xl mx-auto">

<LandingPage />

<div class="mt-14 text-center">
    <a href="{ENV.DEFAULT_COIN_ENDPOINT}">
    <button class="font-bold btn text-2xl">View Stats</button>
    </a>
</div>

</div>
