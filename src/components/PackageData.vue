<template>
  <div>
    <div
      ref="telemetryChart"
      id="telemetryChart"
      :style="{ width: '1200px', height: '360px' }"
    ></div>
    <div>
      Current lap: {{ currentLapNum }} Current lap time: {{ currentLapTime }} Best lap time:
      {{ bestLapTime }} Position: {{ position }}
    </div>
  </div>
</template>

<script lang="ts">
import TimeChart from 'timechart'
import { io } from 'socket.io-client'
import * as d3 from 'd3'

export default {
  name: 'PackageData',
  data() {
    return {
      width: 1000,
      height: 360,
      chart: {},
      socket: {},
      speedData: [],
      throttleData: [],
      brakeData: [],
      bestLapTime: 0,
      lastLapTimes: [],
      currentLapNum: 0,
      currentLapTime: 0,
      sector1Time: 0,
      sector2Time: 0,
      position: 0
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
      this.speedData.push({
        x: data.frame,
        y: data.speed
      })
      this.throttleData.push({
        x: data.frame,
        y: data.throttle * 100
      })
      this.brakeData.push({
        x: data.frame,
        y: data.brake * 100
      })
    })
    const that = this
    setInterval(function () {
      that.update()
    }, 33)
    this.chart = new TimeChart(this.$refs.telemetryChart, {
      lineWidth: 1,
      realTime: true,
      xScaleType: d3.scaleLinear,
      xRange: {
        min: 0,
        max: 1000
      },
      yRange: {
        min: 0,
        max: 360
      },
      series: [
        {
          name: 'throttle',
          data: this.throttleData,
          color: '#0f0'
        },
        {
          name: 'brake',
          data: this.brakeData,
          color: '#f00'
        },
        {
          name: 'speed',
          data: this.speedData,
          color: '#00f'
        }
      ]
    })
  },
  methods: {
    update() {
      this.chart.update()
    }
  }
}
</script>
