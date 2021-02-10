<template>
  <div class="w-full main">
    <Countdown
      :iframeObj="iframeObj"
      v-if="renderCountdown"
    />
  </div>
</template>

<script>
import Countdown from '@/components/Countdown.vue'

export default {
  name: 'Iframe',
  data() {
    return {
      renderCountdown: false,
      iframeObj: {
        deadlineUnix: '0',
      },
    }
  },
  components: {
    Countdown,
  },
  created() {
    this.getIframe()
    document.title = this.iframeObj.name
  },
  methods: {
    getIframe: async function() {
      this.iframeObj = {
        name: this.$route.query.name,
        deadlineUnix: parseInt(this.$route.query.du),
      }
      this.renderCountdown = true
    },
  },
}
</script>

<style scoped>
.main {
  height: 100vh;
}
</style>
