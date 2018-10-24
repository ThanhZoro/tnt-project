<template>
<div class="table">
    <div class="cell">
      <div class="content">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  display: table;
  position: absolute;
  height: 100%;
  width: 100%;
  /* background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
  background-color: #e8ebef; */
}
.cell {
  display: table-cell;
  vertical-align: middle;
}
.content {
  text-align: center;
  padding: 25px 0;
  margin-left: auto;
  margin-right: auto;
  width: 280px;
}
</style>
