<template>
  <div class="menu-wrapper">
    <img src="../assets/logo.png" alt="F1 Logo" width="150">
    <ul>
      <!-- <li><a href="/live">Live Telemetry</a></li>
      <li><a href="/view">Analyze Telemetry</a></li> -->
      <li><a href="/session">Session Info</a></li>
      <li><a href="/race">Race Telemetry</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
</script>

<style>
.menu-wrapper {
  margin: 2em;
  flex: 1;
  display: flex;
  flex-direction: row;
}

.menu-wrapper img {
  flex: 1;
  margin-right: 2em;
}

.menu-wrapper ul {
  list-style: none;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.menu-wrapper li {
  flex: 1;
}

.menu-wrapper a {
  display: inline-block;
  background-color: #fefefe;
  color: #111;
  flex: 1;
  height: 2em;
  width: 100%;
  line-height: 12px;
  font-size: 12px;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-align: center;
}

.menu-wrapper a:hover {
  background-color: #f9f9f9;
}

.menu-wrapper a:active {
  background-color: #f5f5f5;
}
</style>
