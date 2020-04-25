<template>
  <v-container class="game-container" pa-sm-0>

    <v-card-text class="game-main pa-0">

      <v-divider class="mx-4"></v-divider>

        <v-container>
          <v-row class="justify-center">

            <v-col cols="6" sm="5" class="pa-0">
              <v-card
                v-for="(answer, key) in gameStatus.comp" :key="key"
                class="overflow-y-auto mb-3 mx-3"
                :disabled="(gameStatus.grade != null)"
                :style="{ 'height': gameSettings.cardWidth.value + 'px' }"
              >
                <v-chip 
                  v-for="(chip, key) in answer" :key="key"
                  :disabled="(gameStatus.grade != null)"
                  :class="chip.class"
                  class="mx-1 my-1"
                >{{ chip.thai[gameSettings['lang'].value] }}</v-chip>
              </v-card>
            </v-col>

            <v-col cols="6" sm="5" class="pa-0">
              <draggable
                class="drag"
                v-model="gameStatus.user"
                v-bind="dragOptions"
                group="time"
                @change="log"
              >
                <v-card
                  v-for="(answer, key) in gameStatus.user" :key="key"
                  class="d-flex justify-center align-center clickable mb-3 mx-3"
                  :disabled="(gameStatus.grade != null)"
                  :style="{ 'height': gameSettings.cardWidth.value + 'px' }"
                >
                  <v-container class="flex-grow-1" pa-0>
                    <v-row class="justify-center">
                      <v-col cols="10" sm="7">
                        <AnalogClock
                          v-if="answer" 
                          clockFace="modern"
                          :newDate="answer" 
                          :showSecond=false
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </draggable>
            </v-col>

          </v-row>
        </v-container>

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
import draggable from "vuedraggable";
import AnalogClock from '@/components/AnalogClock/AnalogClock.vue'

export default {
  name: 'Game5',

  mixins: [thaiTimeMixin],

  components: {
    draggable,
    AnalogClock,
  },
  
  data() {
    return {
      clone: [],
      show: true,
      drag: false,
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      },
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
  },

  methods: {
    ...mapMutations([
    ]),
    log: function(evt) {
      window.console.log(evt);
    },
    init() {
      if (this.gameStatus.grade == null) {
        let n = this.gameSettings['choice'].value;

        let compAnswers = [];
        let userAnswers = [];
        for (let i=0; i<n; i++) {
          let hour = Math.floor(Math.random() * 24);
          let minute = Math.floor(Math.random() * 60);
          let newDate = new Date();

          newDate.setHours(hour.toString());
          newDate.setMinutes(minute.toString());
          newDate.setSeconds(0,0);

          userAnswers.push(newDate);
          // console.log(this.timeInThai(newDate))
          let timeInThai = this.timeInThai(newDate);
          compAnswers.push(timeInThai[0]);
        }
        this.$store.state.gameStatus.comp = compAnswers;
        this.clone = [].concat(userAnswers);
        this.shuffle(userAnswers);
        this.$store.state.gameStatus.user = userAnswers;

      }
    },
    confirm() {
      this.$store.state.gameStatus.grade = "bad";
      // console.log('clone=' + this.clone)
      // console.log('user=' + this.gameStatus.user)
      if(this.gameStatus.user.join("") == this.clone.join("")) {
        this.$store.state.gameStatus.grade = "good";
        this.$store.state.gameStatus.score++;
      } 
    },
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  },

  watch: {
  }
}
</script>

<style scoped>
</style>
