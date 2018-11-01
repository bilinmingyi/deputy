<template>
  <table class="d-table">

  </table>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>


<style scoped>
.d-table {
  border-collapse: separate;
  border: 1px solid #08bac6;
  border-radius: 0.25rem;
  width: 100%;
}

.d-table tr:nth-last-child(1) td,
.d-table tr:nth-last-child(1) th {
  border-bottom: none;
}

.d-table tr td:nth-last-child(1),
.d-table tr th:nth-last-child(1),
.d-table tr th:nth-last-child(1) > * {
  border-right: none;
}

.d-table tr:nth-child(1) th:nth-child(1) {
  border-top-left-radius: 4px;
}

.d-table tr:nth-child(1) th:nth-last-child(1) {
  border-top-right-radius: 4px;
}

.d-table tr:nth-last-child(1) td:nth-child(1) {
  border-bottom-left-radius: 4px;
}

.d-table tr:nth-last-child(1) td:nth-last-child(1) {
  border-bottom-right-radius: 4px;
}

.h44 td,
.h44 th {
  height: 44px;
  font-size: 15px;
  color: #3f3f3f;
}

.h36 td,
.h36 th {
  height: 36px;
  font-size: 14px;
  color: #3f3f3f;
}

.d-table td,
.d-table th {
  line-height: 21px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #08bac6;
  border-right: 1px solid #08bac6;
}

.width-auto {
  width: auto !important;
}

.width-100 {
  width: 100px;
}

.d-table .bg-ebf8f9 {
  background: #ebf8f9;
  color: #3f3f3f;
}

.d-table .bg-08bac6 {
  margin: 8px 0;
  background: #08bac6;
  color: #ffffff;
  border-right: none;
}

.d-table .bg-08bac6 > div {
  line-height: 16px;
  width: 100%;
  border-right: 1px solid #fff;
}
</style>