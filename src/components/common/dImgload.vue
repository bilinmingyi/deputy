<template>
    <div class="loaderBlock">
      <div class="loader2"></div>
    </div>
</template>

<script>
    export default {
        name: "dImgload"
    }
</script>

<style scoped>
  .loaderBlock{
    position: relative;
  }
  .loader2{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  .loader2,
  .loader2:before,
  .loader2:after
  {
    background: rgb(204, 204, 204);
    -webkit-animation: loaders2 1s infinite ease-in-out;
    animation: loaders2 1s infinite ease-in-out;
    width: 1em;
    height: 2em;
  }
  .loader2:before,
  .loader2:after {
    position: absolute;
    top:50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    content: '';
  }
  .loader2:before{
    left: -1.5em;
  }
  .loader2{
    text-indent: -99999em;
    -webkit-animation-delay: 0.16s;
    animation-delay: 0.16s;

  }
  .loader2:after{
    left: 1.5em;
    -webkit-animation-delay: 0.32s;
    animation-delay: 0.32s;
  }
  @-webkit-keyframes loaders2 {
    0%,80%, 100% {
      height: 4em;
    }
    40% {
      height: 6em;
    }
  }
  @keyframes loaders2 {
    0%,80%, 100% {
      height: 4em;
    }
    40% {
      height: 6em;
    }
  }
</style>
