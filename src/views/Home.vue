<template>
  <v-container class="grey lighten-5" pa-sm-0>

    <v-card-text class="card-inner pa-0">
      <v-row class="justify-center">
        <v-col cols="8" sm="6">
          <AnalogClock
            v-if="newDate" 
            :newDate="newDate" 
            :showSecond=false
          />
        </v-col>
      </v-row>

      <v-row class="justify-center">
        <v-col cols="5" sm="3">
          <NumberInput
            :value="hour" :min=0 :max=23 :maxLength=2 readonly loop
            v-model="hour"
          ></NumberInput>
        </v-col>
        <v-col cols="5" sm="3">
          <NumberInput
            :value="minute" :min=0 :max=59 :maxLength=2 :step=10 readonly loop
            v-model="minute"
          ></NumberInput>
        </v-col>
      </v-row>

      <v-divider class="mx-4"></v-divider>

      <v-row class="justify-center">
        <v-col cols="12" sm="10">
          <div 
            class="overflow-y-auto"
            style="height: 120px;">
            <div v-for="(answer, i) in compAnswers" :key="i">
              <v-chip 
                v-for="(item, j) in compAnswers[i]" :key="j"
                :class="item.class"
                class="mx-1 my-1"
              >{{ item.thai[gameSettings['lang'].value] }}</v-chip>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        color="indigo lighten-2"
        text
        @click="playGame()">
        <v-icon>play_arrow</v-icon>
        <span class="title">PLAY</span>
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters, mapMutations } from 'vuex';
import { thaiTimeMixin } from "@/mixins/thaiTimeMixin.js";
import AnalogClock from '@/components/AnalogClock.vue'
import NumberInput from '@/components/NumberInput.vue'

export default {
  name: 'Home',

  mixins: [thaiTimeMixin],

  components: {
    AnalogClock,
    NumberInput
  },
  
  data() {
    return {
      hour: 1,
      minute: 0,
      compAnswers: [],
      newDate: new Date(),
    }
  },

  created() {
    this.hour = Math.floor(Math.random() * 24);
    // this.hour = 1;
    this.minute = 0;
    this.$store.state.gameScore = 0;
    this.$store.state.numRound = 1;
  },

  computed: {
    ...mapState([
      'gamePhase',
      'gameScore',
      'numRound',
      'gameSettings',
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
    playGame() {
      this.$store.state.gamePhase = 'play';
    },
  },

  /*eslint-disable no-unused-vars*/ 
  watch: {
    hourAndMinute: { 
      immediate: true,
      handler(newValue, oldValue) {
        this.newDate = new Date();
        this.newDate.setHours(this.hour.toString());
        this.newDate.setMinutes(this.minute.toString());
        this.newDate.setSeconds(0);
        this.compAnswers = this.timeInThai(this.newDate);
      }
    }
  }
}
</script>

<style scoped>
</style>