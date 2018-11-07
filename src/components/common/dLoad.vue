<template>
  <transition name="fade">
    <div class="d-load">
      <div class="loader-wrapper">
        <div class="loading-three-point"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.d-load {
  position: fixed;
  top: 2.75rem;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader-wrapper {
  width: 8rem;
  height: 5rem;
  background: rgba(100, 100, 100, 0.3);
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-three-point,
.loading-three-point::before,
.loading-three-point::after {
  animation: loading-three-point 2s infinite linear;
  border-radius: 50%;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.loading-three-point::before,
.loading-three-point::after {
  position: absolute;
  width: 1rem;
  height: 1rem;
  content: "";
}

.loading-three-point {
  position: relative;
  width: 1rem;
  height: 1rem;
  -webkit-animation-delay: 0.16s;
  animation-delay: 0.5s;
}

.loading-three-point::after {
  left: 1.75rem;
  -webkit-animation-delay: 0.32s;
  animation-delay: 1s;
}

.loading-three-point::before {
  left: -1.75rem;
}

@keyframes loading-three-point {
  0%,
  100% {
    background: #fff;
  }
  33% {
    background: #aaa;
  }
  66% {
    background: #555;
  }
}
</style>