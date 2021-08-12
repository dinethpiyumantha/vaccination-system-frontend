<template>
  <div>
    <div class="d-flex">
      <div class="report-thumb"></div>
      <div class="report-thumb"></div>
      <div class="report-thumb"></div>
      <div class="report-thumb"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.report-thumb {
  margin: 10px;
  width: 150px;
  height: 180px;
  border: 3px solid #ff002666;
  border-radius: 15px;
  background: #ff002622;
  transition: 0.2s;
}

.report-thumb:hover {
  border: 3px solid #ff002677;
  background: #ff002644;
}
</style>