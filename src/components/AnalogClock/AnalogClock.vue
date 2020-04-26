<!-- 
https://basicuse.net/articles/pl/textile/html_css/creating_analog_clock_with_responsive_design_using_animation_in_css3 
https://codepen.io/peterhanus/post/responsive-analog-clock-demo
https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
https://www.youtube.com/watch?v=94TKO4eKfIA
https://www.youtube.com/watch?v=JeLGZ6GH_H0
-->
<template>
<div class="case" ref="case" :style="cssVars">
   <!-- :style="{'background-image': 'url(' + clockFace + ');'}" -->
  <div class="clock" ref="clock"> 
    <div v-if="showDigit">
      <div class="digit">{{ digit }}</div>
    </div>
    <div class="hour">
      <div class="hr" id="hr" :style="{ 'transform': 'rotate(' + angleHours + 'deg)' }"></div>
    </div>
    <div class="min">
      <div class="mn" id="mn" :style="{ 'transform': 'rotate(' + angleMinutes + 'deg)' }"></div>
    </div>
    <div v-if="showSecond" class="sec">
      <div class="sc" id="sc" :style="{ 'transform': 'rotate(' + angleSeconds + 'deg)' }"></div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable no-unused-vars */
let interval = null;
/* eslint-enable no-unused-vars */

export default {
  props: {
    clockFace: {
      type: String,
      default: 'default'
    },
    newDate: Date,
    showDigit: {
      type: Boolean,
      default: true
    },
    showSecond: {
      type: Boolean,
      default: true
    },
  },

  data() {
    return {
      currentDate: new Date(),
      clockWidth: 350,
      faces: {
        default: require('./img/default.png'),
        classic: require('./img/classic.png'),
        elegant: require('./img/elegant.png'),
        modern:  require('./img/modern.png'),
        thai:    require('./img/thai.png'),
      },
    };
  },

  created() {
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

  destroyed() {
    // console.log(interval)
    // clearInterval(interval);
  },

  computed: {
    angleSeconds() {
      return this.currentDate.getSeconds() * 6;
    },
    angleMinutes() {
      return this.currentDate.getMinutes() * 6 + this.currentDate.getSeconds() * (360/3600);
    },
    angleHours() {
      return this.currentDate.getHours() * 30 + this.currentDate.getMinutes() * (360/720);
    },
    digit() {
      return (this.currentDate.getHours() < 12 ? "AM" : "PM");
    },
    cssVars() {
      let one = this.clockWidth/350;
      // console.log('cssvars:one=' + one)
      return {
        '--one': one + 'px',
        '--url': 'url(' + this.faces[this.clockFace] + ')',
        '--clock-border': (one*15) + 'px solid #fff',
        '--clock-box-shadow': 'inset 0 0 ' + (one*15) + 'px rgba(0, 0, 0, .1), 0 ' + (one*15) + 'px '+ (one*15) + 'px rgba(0, 0, 0, .2), 0 0 0 ' + (one*2) + 'px rgba(255, 255, 255, 1)',
        '--border-radius': (one*6) + 'px ' + (one*6) + 'px 0 0',
        '--digit-padding': (one*4) + 'px ' + (one*4) + 'px 0 ' + (one*4) + 'px',
        '--digit-transform': 'translateY(' + (one*75) + 'px',
        '--digit-box-shadow': 'inset 0 ' + (one*4) + 'px ' + (one*4) + 'px 0 rgba(0, 0, 0, 0.3), inset 0 ' + (one*-4) + 'px ' + (one*4) + 'px 0 rgba(255, 255, 255, 0.2)'
      }
    }
  },

  methods: {
    handleResize() {
      console.log('handleResize:clientWidth=' + this.$refs.case.clientWidth)
      console.log('handleResize:clientHeight=' + this.$refs.case.clientHeight)
      let height = this.$refs.case.clientHeight;
      let width = this.$refs.case.clientWidth;
      if (height > width) {
        this.clockWidth = width;
      } else {
        this.clockWidth = height;
      }
    },
  },

  watch: {
    newDate: {
      immediate: true,
      handler() {
        if (this.newDate) {
          this.currentDate = this.newDate;
        } else {
          interval = setInterval(() => {
            this.currentDate = new Date();
          }, 1000);
        }
      }
    },
  }
}
</script>

<style scoped>
.case {
  width: auto;
  height: 100%;
}
.clock {
  width: calc(var(--one)*350);
  height: calc(var(--one)*350);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff var(--url);
  background-size: cover;
  border-radius: 50%;
  border: var(--clock-border);
  box-shadow: var(--clock-box-shadow);
  transform-origin: left;
}
.clock::before {
  content: '';
  position: absolute;
  width: calc(var(--one)*20);
  height: calc(var(--one)*20);
  background: #262626;
  z-index: 5;
  border-radius: 50%;
}
.hour,
.min,
.sec {
  position: absolute;
}
.hour, .hr {
  width: calc(var(--one)*182);
  height: calc(var(--one)*182);
}
.min, .mn {
  width: calc(var(--one)*242);
  height: calc(var(--one)*242);
}
.sec, .sc {
  width: calc(var(--one)*282);
  height: calc(var(--one)*282);
}
.hr,
.mn,
.sc {
  display: flex;
  justify-content: center;
  position: absolute;
  border-radius: 50%;
}
.hr::before {
  content: '';
  position: absolute;
  width: calc(var(--one)*12);
  height: calc(var(--one)*90);
  /* background-color: #848484; */
  background: #262626;
  z-index: 1;
  border-radius: var(--border-radius);
}
.mn::before {
  content: '';
  position: absolute;
  width: calc(var(--one)*8);
  height: calc(var(--one)*120);
  /* background: #d6d6d6; */
  background: #848484;
  z-index: 2;
  border-radius: var(--border-radius);
}
.sc::before {
  content: '';
  position: absolute;
  width: calc(var(--one)*4);
  height: calc(var(--one)*170);
  background: #ff6767;
  z-index: 3;
  border-radius: var(--border-radius);
}

@import url("https://fonts.googleapis.com/css?family=Fjalla+One");
.digit {
  font-family: "Fjalla One", sans-serif;
  font-size: calc(var(--one)*40);
  text-align: center;
  line-height: calc(var(--one)*40);
  color: white;
  /* background: #83837a; */
  background: #5E5E5E;
  border-radius: calc(var(--one)*3);
  padding: var(--digit-padding);
  transform: translateX(-50%);
  transform: var(--digit-transform); 
  box-shadow: var(--digit-box-shadow);
}
</style>