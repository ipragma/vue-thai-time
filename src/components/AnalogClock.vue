<!-- 
https://basicuse.net/articles/pl/textile/html_css/creating_analog_clock_with_responsive_design_using_animation_in_css3 
https://codepen.io/peterhanus/post/responsive-analog-clock-demo
https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component //ToTry
https://www.youtube.com/watch?v=94TKO4eKfIA
https://www.youtube.com/watch?v=JeLGZ6GH_H0
https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
-->

<template>
<div class="case" ref="case" :style="cssVars">
  <div class="clock" ref="clock"> 
    <div v-if="showDigi">
      <div class="digi">{{ showDigi }}</div>
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
let interval = null;

export default {
  props: {
    newDate: Date,
    showSecond: {
      type: Boolean,
      default: true
    },
  },

  data() {
    return {
      currentDate: new Date(),
      clockWidth: 350,
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

  destroyed() {
    clearInterval(interval);
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
    showDigi() {
      return (this.currentDate.getHours() < 12 ? "AM" : "PM");
    },
    cssVars() {
      let one = this.clockWidth/350;
      // console.log('cssvars:one=' + one)
      return {
        '--one': one + 'px',
        '--clock-border': (one*15) + 'px solid #fff',
        '--clock-box-shadow': 'inset 0 0 ' + (one*15) + 'px rgba(0, 0, 0, .1), 0 ' + (one*15) + 'px '+ (one*15) + 'px rgba(0, 0, 0, .2), 0 0 0 ' + (one*2) + 'px rgba(255, 255, 255, 1)',
        '--border-radius': (one*6) + 'px ' + (one*6) + 'px 0 0',
        '--digi-padding': (one*4) + 'px ' + (one*4) + 'px 0 ' + (one*4) + 'px',
        '--digi-transform': 'translateY(' + (one*75) + 'px',
        '--digi-box-shadow': 'inset 0 ' + (one*4) + 'px ' + (one*4) + 'px 0 rgba(0, 0, 0, 0.3), inset 0 ' + (one*-4) + 'px ' + (one*4) + 'px 0 rgba(255, 255, 255, 0.2)'
      }
    }
  },

  methods: {
    handleResize() {
      // console.log('handleResize:clientWidth=' + this.$refs.case.clientWidth)
      // console.log('handleResize:clientHeight=' + this.$refs.case.clientHeight)
      this.clockWidth = this.$refs.case.clientWidth;
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
  width: 100%;
}
.clock {
  width: calc(var(--one)*350);
  height: calc(var(--one)*350);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff url(clock.png);
  background-size: cover;
  border-radius: 50%;
  border: var(--clock-border);
  box-shadow: var(--clock-box-shadow);
  transform-origin: left;
}
.clock::before {
  content: '';
  position: absolute;
  width: calc(var(--one)*15);
  height: calc(var(--one)*15);
  background: #262626;
  z-index: 99;
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
  width: calc(var(--one)*220);
  height: calc(var(--one)*220);
}
.sec, .sc {
  width: calc(var(--one)*260);
  height: calc(var(--one)*260);
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
  width: calc(var(--one)*10);
  height: calc(var(--one)*90);
  /* background-color: #848484; */
  background-color: #262626;
  z-index: 10;
  border-radius: var(--border-radius);
}
.mn::before {
  content: '';
  position: absolute;
  width: calc(var(--one)*8);
  height: calc(var(--one)*110);
  background-color: #d6d6d6;
  z-index: 11;
  border-radius: var(--border-radius);
}
.sc::before {
  content: '';
  position: absolute;
  width: calc(var(--one)*2);
  height: calc(var(--one)*150);
  background-color: #ff6767;
  z-index: 12;
  border-radius: var(--border-radius);
}

@import url("https://fonts.googleapis.com/css?family=Fjalla+One");
.digi {
  font-family: "Fjalla One", sans-serif;
  font-size: calc(var(--one)*40);
  text-align: center;
  line-height: calc(var(--one)*40);
  color: white;
  background: #83837a;
  border-radius: calc(var(--one)*3);
  padding: var(--digi-padding);
  transform: translateX(-50%);
  transform: var(--digi-transform); 
  box-shadow: var(--digi-box-shadow);
}
</style>