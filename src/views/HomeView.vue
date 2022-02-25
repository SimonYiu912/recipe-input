<template>
  <div class="home">
    <TranslatorEN />
  </div>
</template>

<script>
// @ is an alias to /src
import TranslatorEN from '@/components/TranslatorEN.vue'

export default {
  name: 'HomeView',
  components: {
    TranslatorEN
  }
}
</script>
