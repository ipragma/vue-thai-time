<template>
  <v-container class="game-container">

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
        <v-col cols="11">
          <draggable
            v-model="wordsAndNumbers"
            v-bind="dragOptions"
            :group="{ name: 'time', pull: 'clone', put: false }"
            :sortable="false"
            @change="log"
            @start="drag = true"
            @end="drag = false"
          >
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <v-hover v-for="(choice, key) in wordsAndNumbers" :key="key">
                <template v-slot="{ hover }">
                  <v-chip 
                    :disabled="(gameStatus.grade != null)"
                    :class="[choice.class, `elevation-${hover ? 4 : 0}`]"
                    class="clickable mx-1 my-1"
                  >{{ choice.thai[gameSettings['lang'].value] }}</v-chip>
                </template>
              </v-hover>
            </transition-group>
          </draggable>
        </v-col>
      </v-row>

      <v-divider class="mx-4"></v-divider>

      <v-row class="justify-center">
        <v-col cols="11">
          <v-card class="user-answer overflow-y-auto">
            <draggable
              v-model="gameStatus.user"
              v-bind="dragOptions"
              class="user-answer overflow-y-auto"
              group="time"
              @change="log"
            >
              <v-hover v-for="(answer, key) in gameStatus.user" :key="key">
                <template v-slot="{ hover }">
                  <v-chip 
                    close
                    @click:close="removeAt(key)"
                    :disabled="(gameStatus.grade != null)"
                    :class="[answer.class, `elevation-${hover ? 4 : 0}`]"
                    class="clickable mx-1 my-1"
                  >{{ answer.thai[gameSettings['lang'].value] }}</v-chip>
                </template>
              </v-hover>
            </draggable>
          </v-card>
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
import draggable from "vuedraggable";
import AnalogClock from '@/components/AnalogClock/AnalogClock.vue'

export default {
  name: 'Game1',

  mixins: [thaiTimeMixin],

  components: {
    draggable,
    AnalogClock,
  },
  
  data() {
    return {
      hour: 0,
      minute: 0,
      newDate: new Date(),
      wordsAndNumbers: [],
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

  mounted() {
    // Remove the zero from the list (useless for time)
    this.wordsAndNumbers = this.getNumbersForTime.slice(1).concat(this.getWordsForTime);
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
    removeAt(idx) {
      this.$store.state.gameStatus.user.splice(idx, 1);
    },
    init() {
      if (this.gameStatus.grade == null) {
        this.hour = Math.floor(Math.random() * 24);
        this.minute = Math.floor(Math.random() * 60);
        this.newDate = new Date();
        this.newDate.setHours(this.hour.toString());
        this.newDate.setMinutes(this.minute.toString());
        this.newDate.setSeconds(0,0);
        // console.log(this.newDate)
        this.$store.state.gameStatus.comp = this.timeInThai(this.newDate);
      }
    },
    confirm() {
      this.$store.state.gameStatus.grade = "bad";
      let compAnswers = this.gameStatus.comp;
      let userAnswers = this.gameStatus.user;
      for(let i=0; i<compAnswers.length; i++) {
        let compAnswer = compAnswers[i].map((x) => x.thai.word);
        // console.log(compAnswer)
        let userAnswer = userAnswers.map((x) => x.thai.word);
        // console.log(userAnswer)
        if(compAnswer.join("") == userAnswer.join("")) {
          this.$store.state.gameStatus.grade = "good";
          this.$store.state.gameStatus.score++;
        } 
      }
    },
  },

  watch: {
  }
}
</script>

<style scoped>
</style>
