<script lang="ts">
  import { onMount } from 'svelte'
  import type { AuthSession } from '@supabase/supabase-js'
  import { supabase } from '$lib/supabase.client'

  export let session: AuthSession

  let loading = false
  let username: string | null = null
  let website: string | null = null
  let avatarUrl: string | null = null

  onMount(() => {
    getProfile()
  })

  const getProfile = async () => {
    try {
      loading = true
      const { user } = session

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (data) {
        username = data.username
        website = data.website
        avatarUrl = data.avatar_url
      }

      if (error && status !== 406) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }

  async function updateProfile() {
    try {
      loading = true
      const { user } = session

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date()
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }

  async function signOut() {
    try {
      loading = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
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
  form.form-widget(on:submit!="{() => updateProfile()}")
    div
      label(for="email") Email
      input#email(type="text", value="{session.user.email}", disabled)
    div
      label(for="username") Name
      input#username(type="text", bind:value="{username}")
    div
      label(for="website") Website
      input#website(type="website", bind:value="{website}")

    div
      input(
        type="submit"
        class="button block primary"
        value=loading ? 'Loading...' : 'Update'
        disabled="{loading}"
      )
    div
      button.button.block(on:click!="{() => signOut()}", disabled=loading) Sign Out
</template>
