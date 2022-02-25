<template>
  <div class="home">
    <TranslatorDE />
  </div>
</template>

<script>
// @ is an alias to /src
import TranslatorDE from '@/components/TranslatorDE.vue'

export default {
  name: 'DEView',
  components: {
    TranslatorDE
  }
}
</script>
