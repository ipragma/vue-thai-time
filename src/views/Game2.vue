<template>
  <v-container class="game-container" pa-sm-0>

    <v-card-text class="game-main pa-0">

      <v-row class="justify-center">
        <v-col cols="11">
          <div class="user-answer">
            <v-chip 
              v-for="(item, j) in gameStatus.comp[0]" :key="j"
              :class="item.class"
              class="mx-1 my-1"
            >{{ item.thai[gameSettings['lang'].value] }}</v-chip>
          </div>
        </v-col>
      </v-row>

      <v-divider class="mx-4"></v-divider>

      <v-row class="justify-center">
        <v-col cols="8" sm="6">
          <AnalogClock
            v-if="newDate" 
            clockFace="modern"
            :newDate="newDate" 
            :showSecond=false
          />
        </v-col>
      </v-row>

      <v-row class="justify-center">
        <v-col cols="5" sm="3">
          <NumberInput
            :value="hour" :min=0 :max=23 :maxLength=2 loop :disabled="(gameStatus.grade != null)"
            v-model="hour"
          ></NumberInput>
        </v-col>
        <v-col cols="5" sm="3">
          <NumberInput
            :value="minute" :min=0 :max=59 :maxLength=2 :step=1 loop :disabled="(gameStatus.grade != null)"
            v-model="minute"
          ></NumberInput>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="game-actions">
      <slot name="action"></slot>
    </v-card-actions>

  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters, mapMutations } from 'vuex';
import { thaiTimeMixin } from "@/mixins/thaiTimeMixin.js";
import AnalogClock from '@/components/AnalogClock/AnalogClock.vue'
import NumberInput from '@/components/NumberInput.vue'

export default {
  name: 'Game2',

  mixins: [thaiTimeMixin],

  components: {
    AnalogClock,
    NumberInput
  },
  
  data() {
    return {
      hour: 0,
      minute: 0,
      newDate: new Date(),
      compDate: new Date(),
    }
  },

  created() {
    this.init();
  },

  computed: {
    ...mapState([
      'gameStatus',
      'gameSettings',
      'gameMessages',
    ]),
    ...mapGetters([
    ]),
    hourAndMinute() {
      return `${this.hour}|${this.minute}`;
    },
  },

  methods: {
    ...mapMutations([
    ]),
    init() {
      if (this.gameStatus.grade == null) {
        let hour = Math.floor(Math.random() * 24);
        let minute = Math.floor(Math.random() * 60);
        this.compDate = new Date();
        this.compDate.setHours(hour.toString());
        this.compDate.setMinutes(minute.toString());
        this.compDate.setSeconds(0,0);
        // console.log(this.compDate)
        this.$store.state.gameStatus.comp = this.timeInThai(this.compDate);
        this.hour = 0;
        this.minute = 0;
      }
    },
    confirm() {
      this.$store.state.gameStatus.grade = "bad";
      if (this.compDate - this.newDate == 0) {
        this.$store.state.gameStatus.grade = "good";
        this.$store.state.gameStatus.score++;
      } 
    },
  },

  watch: {
    hourAndMinute: { 
      immediate: true,
      handler() {
        this.newDate = new Date();
        this.newDate.setHours(this.hour.toString());
        this.newDate.setMinutes(this.minute.toString());
        this.newDate.setSeconds(0,0);
      }
    },
  }
}
</script>

<style scoped>
</style>
