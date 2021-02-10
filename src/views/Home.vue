<template>
  <div class="w-full mt-2">
    <div class="flex w-full ui-countdown">
      <UI
        @emitIframe="generateIframe"
        class="w-1/5 pl-2 pr-2"
        @rerenderCL="rerenderCL"
        @rerenderUI="rerenderUI"
        v-if="renderUI"
        :editCountdown_mode="editCountdown_mode"
        :key="editCountdown_mode.iframeObj.id"
      />
      <Countdown
        :iframeObj="iframeObj"
        v-if="renderCountdown"
        class="w-4/5 mr-2 border border-blue-400"
      />
    </div>
    <div class="flex w-full">
      <GeneratedIframe
        class="w-1/5"
        v-if="renderGeneratedIframe"
        :iframeObj="iframeObj"
        :key="iframeObj.deadlineUnix"
      />
      <div v-else class="w-1/5"/>
      <CountdownList
        v-if="renderCL"
        class="w-4/5 pl-2"
        @emitCountdown="generateIframe"
        @rerenderCL="rerenderCL"
        @emitEdit="editCountdown"
      />
    </div>
  </div>
</template>

<script>
import UI from '@/components/UI.vue'
import Countdown from '@/components/Countdown.vue'
import CountdownList from '@/components/CountdownList.vue'
import GeneratedIframe from '@/components/GeneratedIframe.vue'

export default {
  name: 'Home',
  created() {
    document.title = 'Countdown Vue'
    this.$store.commit('getCountdowns')
  },
  data() {
    return {
      renderCountdown: true,
      renderCL: true,
      renderUI: true,
      renderGeneratedIframe: false,
      editCountdown_mode: {
        state: false,
        iframeObj: {},
      },
      iframeObj: {
        deadlineUnix: '0',
        name: '',
      },
    }
  },
  components: {
    GeneratedIframe,
    Countdown,
    CountdownList,
    UI,
  },
  methods: {

    editCountdown: function(editCountdown_mode) {
      this.editCountdown_mode = editCountdown_mode
    },

    generateIframe: function(newIframeObj) {
      this.renderGeneratedIframe = true
      this.iframeObj = newIframeObj
      this.renderCountdown = false
      this.$nextTick(() => {
        this.renderCountdown = true
      })
    },

    rerenderCL: function() {
      this.renderCL = false
      this.$nextTick(() => {
        this.renderCL = true
      })
    },

    rerenderUI: function() {
      this.renderUI = false
      this.$nextTick(() => {
        this.renderUI = true
      })
    }

  },
}
</script>
<style>
.ui-countdown {
  height: 20rem;
}
</style>
