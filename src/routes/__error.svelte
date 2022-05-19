<script context="module">
    /** @type {import('@sveltejs/kit').Load} */ export function load({ error, status }) {
            return {
                props: {
                    status,
                    error
                },
            }
    }
</script>

<script>
    export let status
    export let error
</script>

<div class="mt-10 container content mx-auto max-w-xl">
    <div class="text-center">
        <h1>{status}</h1>
    </div>

    <div class="text-center">
        <code>
            {error.message}
        </code>
    </div>
</div>
