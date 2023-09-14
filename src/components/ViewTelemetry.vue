<template>
  <div>
    <Chart :width="width" :height="height" :series="series" ref="chart" />
    <div>
      <input type="file" ref="file" @change="uploadFileAndPlotData" style="visibility: hidden; display: none"
        accept=".json,application/json" />
      <button v-on:click="openUploadModal">Upload data</button>
    </div>
  </div>
</template>

<script lang="ts">
import Chart from '@/components/Chart.vue'

export default {
  name: 'ViewTelemetry',
  components: {
    Chart
  },
  data: () => ({
    width: '1000px',
    height: '360px',
    chart: {},
    series: []
  }),
  mounted() { },
  methods: {
    uploadFileAndPlotData(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = (readerEvent) => {
        const data = JSON.parse(readerEvent.target?.result?.toString() || '{}')
        if (data.throttleData) {
          this.series.push({
            name: 'throttle',
            color: '#0f0',
            data: data.throttleData
          })
          console.log('imported throttle data')
        }
        if (data.brakeData) {
          this.series.push({
            name: 'brake',
            color: '#f00',
            data: data.brakeData
          })
          console.log('imported brake data')
        }
        if (data.speedData) {
          this.series.push({
            name: 'speed',
            color: '#00f',
            data: data.speedData
          })
          console.log('imported speed data')
        }
        this.$refs.chart.render()
      }
    },
    openUploadModal() {
      this.$refs.file.click()
    }
  }
}
</script>
