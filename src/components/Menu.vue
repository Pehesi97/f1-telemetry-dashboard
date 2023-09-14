<template>
  <div class="menu-wrapper">
    <img src="../assets/logo.png" alt="F1 Logo" width="150">
    <ul>
      <li><a href="/live">Live Telemetry</a></li>
      <li><a href="/view">Analyze Telemetry</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
</script>

<style>
.menu-wrapper {
  margin: 1em;
}

.menu-wrapper img {
  width: 100%;
}

.menu-wrapper ul {
  list-style: none;
  width: 100%;
  padding: 0;
}

.menu-wrapper li {
  margin-top: 1em;
  margin-bottom: 1em;
}

.menu-wrapper a {
  display: inline-block;
  background-color: #fefefe;
  color: #111;
  width: 100%;
  height: 2em;
  line-height: 2em;
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
