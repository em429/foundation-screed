<!-- END Outermost Container -->
<script context="module">
    import '../stone-lime.css';

//
// To make runtime environment variables available on the client side,
// we pull them from the server side using an endpoint (/appsettings.json),
// then set it on the global store 'appSettingsStore'.
//
// Because we are doing this in the root layout and on the server side, the
// settings will be available in every page.
//
// If we'd set the store's values on the client (regular <script> tag), our settings
// would only get loaded if we start navigating from the home page -- otherwise
// it would never get the chance to load; e.g. if we start from /Bitcoin, the store
// is empty, because the client never gets to set the values, as that code never ran.
//
import { appSettingsStore } from '$lib/stores.js'

export async function load({ fetch, url }) {
    const res = await fetch('/appsettings.json');
    if (res.ok) {
        appSettingsStore.set(await res.json())
        return { props: { }, }
    }
    return {
        status: res.status,
        error: new Error('Could not load configuration'),
    }
}
</script>


<slot />

