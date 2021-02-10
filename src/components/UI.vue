<template>
  <div class="flex flex-col space-y-2">
    <div class="flex flex-col">
      Date (UTC):
      <input
        class="border border-black input"
        v-model="deadline"
        type="datetime-local"
      >
    </div>

    <div class="flex flex-col">
      Name:
      <input
        class="border border-black input"
        v-model="iframeObj.name"
        type="text"
      >
    </div>

    <!--
    <div class="flex flex-col">
      Timezone:
      <select v-model="iframeObj.timezone">
        <option value="Local Timezone">Local Timezone</option>
        <option value="Pacific Standard Time">Pacific Standard Time</option>
      </select>
    </div>
    -->

    <div>
      <button
        class="bbtn"
        @click="postCountdown"
      >
        Save new
      </button>
      <button
        class="ml-1 ybtn"
        v-if="editCountdown_mode.state"
        @click="putCountdown"
      >
        Save edit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UI',
  props: {
    editCountdown_mode: Object,
  },
  data() {
    return {
      deadline: '',
      iframeObj: {
        timezone: 'UTC',
        deadlineUnix: '',
        name: '',
      },
    }
  },
  created() {
    if (this.editCountdown_mode.state === true) {
      this.iframeObj = this.editCountdown_mode.iframeObj
      const deadlineUTC = new Date(this.iframeObj.deadlineUnix*1000)
      /*const deadlinePST = this.changeTimezone(deadlineUTC, 'America/Los_Angeles', '-')*/
      this.deadline = deadlineUTC.toISOString().slice(0, 16)
    }
  },
  methods: {

    postCountdown: async function() {
      const deadlineUTC = new Date(this.deadline)
      this.iframeObj.deadlineUnix = Math.trunc(Date.parse(deadlineUTC) / 1000)

      this.$store.commit('postCountdown', this.iframeObj)
      this.$emit('emitIframe', this.iframeObj)
      this.$emit('rerenderCL')
      this.$emit('rerenderUI')
    },

    putCountdown: async function() {
      const deadlineUTC = new Date(this.deadline)
      this.iframeObj.deadlineUnix = Math.trunc(Date.parse(deadlineUTC) / 1000)

      this.$store.commit('putCountdown', this.iframeObj)
      this.$emit('rerenderCL')
    },

    changeTimezone: function(date, timeZone, op) {
      let invdate = new Date(
        date.toLocaleString('en-US', {timeZone: timeZone})
      )
      let diff = date.getTime() - invdate.getTime()
      let res
      if (op === '+') {
        res = new Date(date.getTime() + diff)
      } else if (op === '-') {
        res = new Date(date.getTime() - diff)
      }
      return res
    },

  },
}

</script>

<style lang="postcss" scoped>
.bbtn {
  @apply bg-blue-500 rounded-lg font-bold text-white text-center px-2 py-2;
  @apply transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none;
}
.ybtn {
  @apply bg-yellow-500 rounded-lg font-bold text-white text-center px-2 py-2;
  @apply transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none;
}
</style>
