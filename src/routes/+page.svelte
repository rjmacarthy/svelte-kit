<script>
  import { page } from '$app/stores'
  import Account from '$lib/components/Account.svelte'
  import Auth from '$lib/components/Auth.svelte'
</script>

<svelte:head>
  <title>Supabase + SvelteKit</title>
  <meta name="description" content="Supabase + SvelteKit" />
</svelte:head>

{#if !$page.data.session}
  <Auth />
{:else}
  <Account session={$page.data.session} />
{/if}
