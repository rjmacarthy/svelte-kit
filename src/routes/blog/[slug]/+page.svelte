<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<template lang="pug">
  .w-full.flex.justify-center.h-screen.items-center
	  h1.text-blue-500 {data.title}
    p.text-gray-500 {data.body}
</template>
