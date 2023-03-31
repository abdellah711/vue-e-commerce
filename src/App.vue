<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'

</script>

<template>
  <NavBar />
  <main class="content py-5 min-h-screen">
    <RouterView />
  </main>
</template>
