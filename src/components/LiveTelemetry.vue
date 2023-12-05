<template>
  <div>
    <Chart :width="width" :height="height" :series="series" ref="chart" real-time />
    <div>
      Current lap: {{ currentLapNum }} Current lap time: {{ currentLapTimeFormatted }} Best lap
      time: {{ bestLapTime }} Position: {{ position }}
      <button v-on:click="downloadData">Download data</button>
    </div>
    <div style="display: inline-block; visibility: visible">
      <a ref="downloadData" download="carData.json"></a>
    </div>
  </div>
</template>

<script lang="ts">
import { io } from 'socket.io-client'
import Chart from '@/components/Chart.vue'

export default {
  name: 'LiveTelemetry',
  components: {
    Chart
  },
  data: () => ({
    width: '1000px',
    height: '360px',
    chart: {},
    socket: {},
    bestLapTime: 0,
    lastLapTimes: [],
    throttleSeriesIndex: 0,
    brakeSeriesIndex: 1,
    speedSeriesIndex: 2,
    series: [
      {
        name: 'throttle',
        color: '#0f0',
        data: []
      },
      {
        name: 'brake',
        color: '#f00',
        data: []
      },
      {
        name: 'speed',
        color: '#00f',
        data: []
      }
    ],
    currentLapNum: 0,
    currentLapTime: 0,
    sector1Time: 0,
    sector2Time: 0,
    position: 0,
    updateInterval: 0
  }),
  computed: {
    currentLapTimeFormatted: function () {
      const ms = this.currentLapTime % 1000
      const s = (this.currentLapTime / 1000) % 60
      const m = this.currentLapTime / 60000
      return `${m.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
        maximumFractionDigits: 0
      })}:${s.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
        maximumFractionDigits: 0
      })}.${ms.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })}`
    }
  },
  mounted() {
    this.socket = io('localhost:3000', {
      autoConnect: true
    })
    this.socket.connect()
    this.socket.on('lapData', (data) => {
      this.position = data.position
      this.bestLapTime = data.bestLapTime
      this.currentLapTime = data.currentLapTime
      this.sector1Time = data.sector1Time
      this.sector2Time = data.sector2Time
      this.currentLapNum = data.currentLapNum
    })
    this.socket.on('telemetryData', (data) => {
      this.series[this.speedSeriesIndex].data.push({
        x: data.frame,
        y: data.speed
      })
      this.series[this.throttleSeriesIndex].data.push({
        x: data.frame,
        y: data.throttle * 100
      })
      this.series[this.brakeSeriesIndex].data.push({
        x: data.frame,
        y: data.brake * 100
      })
    })
    this.updateInterval = setInterval(this.updateChart, 33)
  },
  methods: {
    updateChart() {
      this.$refs.chart.update()
    },
    downloadData() {
      const obj = new Blob(
        [
          JSON.stringify({
            throttleData: this.series[this.throttleSeriesIndex].data,
            brakeData: this.series[this.brakeSeriesIndex].data,
            speedData: this.series[this.speedSeriesIndex].data
          })
        ],
        { type: 'application/json' }
      )

      const url = URL.createObjectURL(obj)
      this.$refs.downloadData.href = url
      this.$refs.downloadData.click()
    }
  }
}
</script>
