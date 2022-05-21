<script lang="ts">
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'

    //export let stats

    async function handleSubmit(event) {
        const formData = new FormData(event.target)
        const data = {}
        for (let field of formData) {
            const [key, value] = field
            data[key] = value
        }
        goto(`/${$page.params.pool}/${data['wallet']}`, { noscroll: true })
    }
</script>

<!-- Start SearchWallet Card -->
<div class="overflow-x-hidden t-card-shadow">
<div class="card t-card-body">
        <div class="t-card-header p-2">
            <h2 class="inline-block text-2xl font-bold ">Miner Stats</h2>
        </div>

        <div class="content mb-7 overflow-x-auto p-3 text-center">

            <span class="inline-block mt-6">
                <p>Enter your wallet address to get your rig specific stats</p>
            </span>

        <!-- TODO: display diff from /ports endpoint -->
	<!--
            <ul class="m-7 inline-block text-left">
                <li class="text-md block font-semibold sm:text-xl">
                    {$page.url.hostname}
                </li>
                <li class="support">Stratum Adress</li>
            </ul>
            <ul class="mb-7 block space-x-12 text-sm sm:text-base">
                <li class="inline-block text-left">
                    <span class="block font-medium">{stats?.config.algorithm}</span>
                    <span class="support">Algo</span>
                </li>

                <li class="inline-block text-left">
                    <span class="block font-medium ">5031</span>
                    <span class="support">Port - 8 to 64 diff.</span>
                </li>

                <li class="inline-block text-left">
                    <span class="block font-medium">5032</span>
                    <span class="support">Port - 16 to 128 diff.</span>
                </li>
            </ul>
            -->

            <div class="text-center">
                <div class="form-control">
                    <!-- TODO: add some input validation: no spaces allowed, strip them -->
                    <form
                        on:submit|preventDefault={handleSubmit}
                        method="get"
                        action={`/${$page.params.pool}`}
                    >
                        <input
                            required
                            type="search"
                            name="wallet"
                            placeholder="Wallet Address"
                            class="field w-auto t-primary-input "
                        />
                        <button
                            class="button mt-2 t-primary-btn"
                            type="submit">Submit</button
                        >
                    </form>
                </div>
            </div>
        </div>
        <!-- <Line data={dataLine} {options} /> -->
</div>
</div>

<!-- END Card -->
<style>
</style>
