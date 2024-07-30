<template>
  <div class="tool-bar">
    <div class="bar-box">
      <div class="bar-item wechat">
        <img :src="wechatIcon" class="wechat-icon" title="加微信" />
        <img :src="qrcodeIcon" class="qrcode-icon" />
      </div>
      <div
        class="bar-item music"
        @click="toggleSong"
        @dblclick="changeSong"
        title="放松一下，点击播放，双击切换"
      >
        <MusicWave
          v-if="playing"
          style="width: 30px; height: 30px; overflow: hidden; cursor: pointer"
        ></MusicWave>
        <Icon v-else type="ios-musical-notes" size="30" />
      </div>
      <div class="bar-item" v-if="showBackUp" title="回到顶部" @click="backUp">
        <Icon type="md-arrow-up" size="30" />
      </div>
    </div>
    <audio
      ref="song"
      :src="currentSong"
      controlsList="nodownload noplaybackrate"
      @ended="changeSong"
    ></audio>
  </div>
</template>

<script>
import MusicWave from '@/components/MusicWave'
export default {
  name: 'ToolBar',
  components: {
    MusicWave
  },
  data() {
    return {
      wechatIcon: require('@/assets/wechat-icon.png'), // eslint-disable-line no-undef
      playing: false,
      songIndex: 0,
      songList: [
        'https://ting8.yymp3.com/new14/xuwei9/15.mp3',
        'https://ting8.yymp3.com/new27/mljyyj/1.mp3',
        'https://ting8.yymp3.com/new21/wangzhengliang5/12.mp3',
        'https://ting8.yymp3.com/new27/xuezhiqian7/4.mp3',
        'https://ting8.yymp3.com/new27/kuaizixd3//1.mp3'
      ],
      showBackUp: false,
      qrcodeIcon: require('@/assets/qrcode.png') // eslint-disable-line no-undef
    }
  },
  computed: {
    currentSong() {
      return this.songList[this.songIndex]
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop
      this.showBackUp = scrollTop >= 800
    })
  },
  methods: {
    toggleSong() {
      const song = this.$refs.song
      if (song.paused) {
        song.play()
        this.playing = true
      } else {
        song.pause()
        this.playing = false
      }
    },
    changeSong(event) {
      this.songIndex =
        this.songIndex === this.songList.length - 1 ? 0 : this.songIndex + 1
      event.preventDefault()
      this.$nextTick(() => {
        const song = this.$refs.song
        song.play()
        this.playing = true
      })
    },
    backUp() {
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;

  .bar-box {
    position: relative;
    top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
    color: #fff;
    background-color: #1b87f3;

    .bar-item {
      position: relative;
      margin-bottom: 10px;

      &.music::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        opacity: 0;
      }

      &.wechat {
        position: relative;

        .qrcode-icon {
          position: absolute;
          top: -3px;
          left: -115px;
          display: none;
          width: 100px;
          height: 100px;
        }

        &:hover {
          .qrcode-icon {
            display: block;
          }
        }

        .wechat-icon {
          width: 30px;
          height: 30px;
          cursor: pointer;
          object-fit: cover;
        }
      }

      &:nth-child(2) {
        margin-bottom: 16px;
      }

      &:last-child {
        margin-bottom: 0;
      }

      i {
        cursor: pointer;
      }
    }
  }
}
</style>
