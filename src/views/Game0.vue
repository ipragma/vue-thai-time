<template>
  <v-container class="game-container" pa-sm-0>

    <v-card-text class="game-main pa-0">
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
            v-model="hour"
            :value="hour" :min=0 :max=23 :maxLength=2 readonly loop
          ></NumberInput>
        </v-col>
        <v-col cols="5" sm="3">
          <NumberInput
            v-model="minute"
            :value="minute" :min=0 :max=59 :maxLength=2 :step=10 readonly loop
          ></NumberInput>
        </v-col>
      </v-row>

      <v-divider class="mx-4"></v-divider>

      <v-row class="justify-center">
        <v-col cols="11">

          <v-window
            v-model="window"
            show-arrows
            vertical
          >
            <v-window-item
              v-for="n in chunkCompAnswers.length"
              :key="n"
            >
              <div style="height: 120px;">
                <div v-for="(answer, i) in chunkCompAnswers[n-1]" :key="i">
                  <div
                    v-if="answer">
                  <v-chip 
                    v-for="(item, j) in answer" :key="j"
                    :class="item.class"
                    class="mx-1 my-1"
                  >{{ item.thai[gameSettings['lang'].value] }}</v-chip>
                  </div>
                </div>
              </div>
            </v-window-item>
          </v-window>

        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="">
      <v-spacer></v-spacer>
      <v-btn color="indigo lighten-2" text @click="home()">
        <v-icon>home</v-icon>
        <span class="title">Home</span>
      </v-btn>
      <v-spacer></v-spacer>
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
  name: 'Game0',

  mixins: [thaiTimeMixin],

  components: {
    AnalogClock,
    NumberInput,
  },
  
  data() {
    return {
      hour: 0,
      minute: 0,
      compAnswers: [],
      newDate: new Date(),
      window: 0,
    }
  },

  created() {
    this.hour = Math.floor(Math.random() * 24);
    this.minute = 0;
  },

  computed: {
    ...mapState([
      'gameSettings',
    ]),
    ...mapGetters([
    ]),
    hourAndMinute() {
      return `${this.hour}|${this.minute}`;
    },
    chunkCompAnswers() {
      return this.chunkArray(this.compAnswers, this.gameSettings.line.value);
    }
  },

  methods: {
    ...mapMutations([
    ]),
    home() {
      this.$emit('home');
    },
    // https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
    chunkArray(myArray, chunk_size) {
      var index = 0;
      var arrayLength = myArray.length;
      var tempArray = [];
      
      for (index = 0; index < arrayLength; index += chunk_size) {
          var myChunk = myArray.slice(index, index+chunk_size);
          // Do something if you want with the group
          tempArray.push(myChunk);
      }
      return tempArray;
    }
  },

  watch: {
    hourAndMinute: { 
      immediate: true,
      handler() {
        this.newDate = new Date();
        this.newDate.setHours(this.hour.toString());
        this.newDate.setMinutes(this.minute.toString());
        this.newDate.setSeconds(0,0);
        this.compAnswers = this.timeInThai(this.newDate);
        this.window = 0;
      }
    }
  }
}
</script>

<style scoped>
</style>