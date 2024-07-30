<template>
  <div class="music active">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
</template>

<style scoped>
.music {
  position: relative;
  width: 50px;
  height: 1px;
}

.music i {
  position: absolute;
  bottom: 0;
  width: 4px;
  height: 5px;
  background-color: #fff;
}

.music i:nth-of-type(1) {
  left: 0;
}

.music i:nth-of-type(2) {
  left: 8px;
}

.music i:nth-of-type(3) {
  left: 16px;
}

.music i:nth-of-type(4) {
  left: 24px;
}

.music i:nth-of-type(5) {
  left: 32px;
}

.music i:nth-of-type(6) {
  left: 40px;
}

.music.active i:nth-of-type(1) {
  animation: wave 0.66s linear infinite;
}

.music.active i:nth-of-type(2) {
  animation: wave 0.8s linear infinite;
}

.music.active i:nth-of-type(3) {
  animation: wave 0.7s linear infinite;
}

.music.active i:nth-of-type(4) {
  animation: wave 0.5s linear infinite;
}

.music.active i:nth-of-type(5) {
  animation: wave 0.9s linear infinite;
}

.music.active i:nth-of-type(6) {
  animation: wave 1.2s linear infinite;
}

@keyframes wave {
  0% {
    height: 8px;
  }

  50% {
    height: 32px;
  }

  100% {
    height: 12px;
  }
}

@keyframes wave {
  0% {
    height: 8px;
  }

  50% {
    height: 32px;
  }

  100% {
    height: 12px;
  }
}
</style>
