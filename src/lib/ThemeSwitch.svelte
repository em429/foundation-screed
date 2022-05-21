<script lang="ts">
  import { theme } from '$lib/stores'
</script>

<select bind:value="{$theme}">
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>
