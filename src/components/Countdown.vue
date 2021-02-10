<template>
  <div>
    <div class="flex justify-center">
      <h2 class="name">
        {{iframeObj.name}}
      </h2>
    </div>
    <div class="flex items-center justify-center main">
      <div class="flex justify-center space-x-3">
        <div class="flex flex-col items-center">
          <p class="digit">{{ days | twoDigits }}</p>
          <p class="">{{ days > 1 ? 'DAYS' : 'DAY' }}</p>
        </div>
        <p class="colon">:</p>
        <div class="flex flex-col items-center">
          <p class="digit">{{ hours | twoDigits }}</p>
          <p class="">{{ hours > 1 ? 'HOURS' : 'HOUR' }}</p>
        </div>
        <p class="colon">:</p>
        <div class="flex flex-col items-center">
          <p class="digit">{{ minutes | twoDigits }}</p>
          <p class="">MIN</p>
        </div>
        <p class="colon">:</p>
        <div class="flex flex-col items-center">
          <p class="digit">{{ seconds | twoDigits }}</p>
          <p class="">SEC</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let interval = null;
export default {
  name: 'vuejsCountDown',
  props: {
    iframeObj: Object,
    stop: {
      type: Boolean
    }
  },
  data() {
    return {
      now: '',
      date: null,
      diff: 0,
      ok: true,
    }
  },
  created() {
    this.date = this.iframeObj.deadlineUnix

    if (!this.date) {
      throw new Error("Invalid date!")
    }
    this.now = Math.trunc((new Date()).getTime() / 1000)
    interval = setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    }, 1000)
  },
  computed: {
    seconds() {
      return Math.trunc(this.diff) % 60
    },
    minutes() {
      return Math.trunc(this.diff / 60) % 60
    },

    hours() {
      return Math.trunc(this.diff / 60 / 60) % 24
    },

    days() {
      return Math.trunc(this.diff / 60 / 60 / 24)
    }
  },
  watch: {
    //now(value) {
    now: function() {
      this.diff = this.date - this.now
      if (this.diff <= 0 || this.stop) {
        this.diff = 0
        // Remove interval
        clearInterval(interval)
      }
    }
  },
  filters: {
    twoDigits(value) {
      if ( value.toString().length <= 1 ) {
        return '0'+value.toString()
      }
      return value.toString()
    }
  },
  destroyed() {
    clearInterval(interval);
  }
}
</script>
<style scoped>
.digit {
  /*font-size: 8rem;*/
  font-size: 8vw;
}
.colon {
  /*font-size: 8rem;*/
  font-size: 8vw;
}
.name {
  font-size: 4vw;
  font-weight: bold;
}
.main {
}
</style>
