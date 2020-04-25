<template>
<!-- 
https://github.com/mazipan/vue-doughnut-chart/tree/master/src
https://codeburst.io/creating-svg-pie-chart-with-vue-js-f22f4ed14841
 -->
  <div class="doughnut_chart" ref="doughnut_chart" style="position:relative; text-align:center;">
    <svg width="100%" height="100%" viewBox="0 0 200 200" style="stroke-linecap:round;">
      <text v-if="visibleValue" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">{{ percent }}%</text>
      <!-- Background circle -->
      <path :d="dBg" fill="transparent" :stroke="backgroundColor" :stroke-width="strokeWidth" />
      <!-- Move to start position, start drawing arc -->
      <path v-if="percent > 0" :d="d" fill="transparent" :stroke="foregroundColor" :stroke-width="strokeWidth" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "DoughnutChart",
  props: {
    percent: {
      default: 0
    },
    foregroundColor: {
      type: String,
      default: "#1993ff"
    },
    backgroundColor: {
      type: String,
      default: "#ecf6ff"
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    radius: {
      type: Number,
      default: 85
    },
    visibleValue: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      width: 0,
    };
  },

  mounted() {
    this.handleResize()
    // https://github.com/vuejs/vue/issues/1915
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy() {
    // https://github.com/vuejs/vue/issues/1915
    window.removeEventListener('resize', this.handleResize)
  },

  computed: {
    // If more than 50% filled we need to switch arc drawing mode from less than 180 deg to more than 180 deg
    largeArc() {
      return parseInt(this.percent) < 50 ? 0 : 1;
    },
    // Where to put x coordinate of center of circle
    x() {
      return 100;
    },
    // Where to put y coordinate of center of circle
    y() {
      return 100 - this.radius;
    },
    // Calculate X coordinate of end of arc (+ 100 to move it to middle of image)
    // add some rounding error to make arc not disappear at 100%
    endX() {
      return -Math.sin(this.radians) * this.radius + 100 - 0.0001; // eslint-disable-line no-mixed-operators
    },
    // Calculate Y coordinate of end of arc (+ 100 to move it to middle of image)
    endY() {
      return Math.cos(this.radians) * this.radius + 100; // eslint-disable-line no-mixed-operators
    },
    // Calculate length of arc in radians
    radians() {
      const degrees = (this.percent / 100) * 360;
      const value = degrees - 180; // Turn the circle 180 degrees counter clockwise
      return (value * Math.PI) / 180;
    },
    // If we reach full circle we need to complete the circle, this ties into the rounding error in X coordinate above
    z() {
      return parseInt(this.percent) === 100 ? "z" : "";
    },
    dBg() {
      return `M ${this.x} ${this.y} A ${this.radius} ${this.radius} 0 1 1 ${this
        .x - 0.0001} ${this.y} z`;
    },
    d() {
      return `M ${this.x} ${this.y} A ${this.radius} ${this.radius} 0 ${this.largeArc} 1 ${this.endX} ${this.endY} ${this.z}`;
    },
  },

  methods: {
    handleResize() {
      // console.log('handleResize:clientWidth=' + this.$refs.doughnut_chart.clientWidth)
      // console.log('handleResize:clientHeight=' + this.$refs.doughnut_chart.clientHeight)
      this.width = this.$refs.doughnut_chart.clientWidth;
    },
  },
};
</script>