<script lang="ts">
  import { supabase } from '$lib/supabase.client'
  import { logger } from '$lib/utils/logger'

  let loading = false
  let email: string

  logger.error(new Error('This is an error!'))

  const handleLogin = async () => {
    try {
      loading = true
      await supabase.auth.signInWithOtp({ email })
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }
</script>

<template lang="pug">
  form.form-widget(on:submit!="{(e) => handleLogin(e)}")
    h1.header Supabase + SvelteKit
    p.description Sign in via magic link with your email below
    .form-widget__field
      input.inputField(type="email" placeholder="Your email" bind:value="{email}")
    .form-widget__field
      input(
        type="submit"
        class="button block"
        value=loading ? 'Loading' : 'Send magic link'
        disabled="{loading}"
      )
</template>
