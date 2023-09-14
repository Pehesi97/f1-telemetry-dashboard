<template>
  <div ref="telemetryChart" id="telemetryChart" :style="{ width, height }"></div>
</template>

<script lang="ts">
import TimeChart from 'timechart'
import { TimeChartZoomPlugin } from 'timechart/plugins/chartZoom';

import * as d3 from 'd3'

export default {
  name: 'Chart',
  props: {
    series: Array,
    width: String,
    height: String,
    realTime: Boolean
  },
  expose: ['update', 'render'],
  data() {
    return {
      chart: {}
    }
  },
  methods: {
    render() {
      this.chart = new TimeChart(this.$refs.telemetryChart, {
        backgroundColor: '#fafafa',
        lineWidth: 1,
        realTime: this.realTime,
        xScaleType: d3.scaleLinear,
        xRange: {
          min: 0,
          max: 3000
        },
        yRange: {
          min: 0,
          max: 360
        },
        plugins: {
          zoom: new TimeChartZoomPlugin({
            x: {
              autoRange: true,
            },
            y: {
              autoRange: true,
            }
          })
        },
        series: this.series,
      })
    },
    update() {
      this.chart.update()
    }
  },
  mounted() {
    this.render()
  }
}
</script>
