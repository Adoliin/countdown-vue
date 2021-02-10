<template>
  <div>
    <h2 class="text-blue-600 title">
      Created countdowns:
    </h2>
    <ul>
      <li
        class="flex mb-2"
        v-for="(countdown, index) in countdowns"
        :key="index"
        :class="[editCountdown_mode.iframeObj.id === countdown.id ? 'edit-countdown' : '']"
      >
        <div class="w-2/6 countdown-font">
          {{countdown.name}}
        </div>
        <div class="w-2/6 countdown-font">
          {{humanDate(countdown.deadlineUnix)}}
        </div>
        <div class="flex items-center justify-end w-2/6 space-x-2">
          <div>
            <button
              class="bbtn"
              @click="emitCountdown(countdown)"
            >
              show
            </button>
          </div>
          <div>
            <button
              class="bbtn"
              @click="emitEdit(countdown, true)"
              v-if="editCountdown_mode.iframeObj.id !== countdown.id"
            >
              edit
            </button>
            <button
              class="rbtn"
              @click="emitEdit({}, false)"
              v-else
            >
              cancel
            </button>
          </div>
          <div>
            <button
              class="mr-2 bbtn"
              @click="deleteCountdown(countdown.id)"
            >
              delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CountdownList',
  data() {
    return {
      countdowns: [],
      editCountdown_mode: {
        state: false,
        iframeObj: {},
      }
    }
  },
  methods: {
    isDeadlineOutdated: function(deadlineUnix) {
      const currentDateUnix = Math.floor(Date.now() / 1000)
      return currentDateUnix > deadlineUnix
    },
    humanDate: function(unixDate) {
      let dateObj = new Date(unixDate * 1000)
      return dateObj.toLocaleString()
      //CHANGE THIS TO PST!
      /*return `${dateObj.toLocaleString('en-US', {timeZone: 'America/Los_Angeles'})} (PST)`*/
    },
    getCountdowns: function() {
      this.countdowns = this.$store.state.iframeObjs
    },
    emitCountdown: function(iframeObj) {
      this.$emit('emitCountdown', iframeObj)
    },
    deleteCountdown: function(id) {
      if (window.confirm('DELETE this countdown?')) {
        this.$store.commit('deleteCountdown', id)
        this.$emit('rerenderCL')
      }
    },

    emitEdit: function(iframeObj, state) {
      this.editCountdown_mode = {
        state,
        iframeObj,
      }
      this.$emit('emitEdit', this.editCountdown_mode)
    }
  },
  created() {
    this.getCountdowns()
  },
}
</script>

<style lang="postcss" scoped>
.title {
  font-size: 1rem;
  font-weight: bold;
}
.countdown-font {
  font-size: 1.0rem;
}

.bbtn {
  @apply bg-blue-500 rounded-lg font-bold text-white text-center px-2 py-2;
  @apply transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none;
}

.rbtn {
  @apply bg-red-500 rounded-lg font-bold text-white text-center px-2 py-2;
  @apply transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none;
}

.edit-countdown {
  @apply bg-blue-100
}
</style>
