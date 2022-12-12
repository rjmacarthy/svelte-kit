<script lang="ts">
  import '../app.postcss'
  import { supabase } from '$lib/supabase.client'
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'

  onMount(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      invalidate('supabase:auth')
    })

    return () => {
      subscription.unsubscribe()
    }
  })
</script>

<template lang="pug">
  .container
    slot
</template>
