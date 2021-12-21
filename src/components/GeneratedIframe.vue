<template>
  <div class="flex flex-col items-center pl-2 pr-2">
    <div class="flex flex-col w-full mb-2">
      <p>
        iframe url:
      </p>
      <div class="flex">
        <textarea
          type="text"
          class="w-full iframe-url"
          :value="iframeUrl"
        />
        <div>
          <button
            class="ml-1 bbtn"
            @click="copyToClipboard('iframe-url')"
          >C</button>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full">
      <p>
        iframe tag:
      </p>
      <div class="flex">
        <textarea
          type="text"
          class="w-full iframe-tag"
          :value="iframeTag"
        />
        <div>
          <button
            class="ml-1 bbtn"
            @click="copyToClipboard('iframe-tag')"
          >C</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeneratedIframe',
  props: {
    iframeObj: Object,
  },
  data() {
    return {
      iframeUrl: '',
      iframeTag: '',
    }
  },
  created() {
    this.generateIframe()
  },
  methods: {
    copyToClipboard: function(selector) {
      let copyText = document.querySelector(`.${selector}`)
      copyText.select()
      document.execCommand('copy')
    },

    generateIframe: function() {
      let du = encodeURIComponent(this.iframeObj.deadlineUnix)
      let name = encodeURIComponent(this.iframeObj.name)
      this.iframeUrl = `${location.protocol}//${location.host}/#/embed/?du=${du}&name=${name}`
      this.iframeTag = `<iframe src="${this.iframeUrl}"></iframe>`
    },
  },
}
</script>

<style lang="postcss" scoped>
.iframe-tag {
  /*width: 25rem;*/
  height: 9rem;
}
.iframe-url {
  /*width: 25rem;*/
  height: 5rem;
}

.bbtn {
  @apply bg-blue-500 rounded-lg font-bold text-white text-center px-3 py-2;
  @apply transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none;
}
</style>
