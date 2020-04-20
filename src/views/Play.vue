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
        <v-col cols="12" sm="10">
          <div 
            class="overflow-y-auto"
            style="min-height: 120px;">
            <!-- <span class="indigo lighten-2 white--text justify-center py-0">
              <span>Words</span>
            </span> -->
            <draggable
              v-model="wordsAndNumbers"
              v-bind="dragOptions"
              :group="{ name: 'time', pull: 'clone', put: false }"
              :sortable="false"
              @change="log"
              @start="drag = true"
              @end="drag = false">
              <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                <v-hover v-for="(choice, key) in wordsAndNumbers" :key="key">
                  <template v-slot="{ hover }">
                    <v-chip 
                      :disabled="(answerGrade != null)"
                      :class="[choice.class, `elevation-${hover ? 4 : 0}`]"
                      class="mx-1 my-1"
                    >{{ choice.thai[gameSettings['lang'].value] }}</v-chip>
                  </template>
                </v-hover>
              </transition-group>
            </draggable>
          </div>
        </v-col>
      </v-row>

      <v-divider class="mx-4"></v-divider>

      <v-row class="justify-center">
        <v-col cols="12" sm="10">
          <v-sheet 
            class="card-body overflow-y-auto"
            style="min-height: 80px;">
            <!-- <v-card-title class="indigo lighten-2 white--text justify-center py-0">
              <span>Solution</span>
            </v-card-title> -->
            <v-card-text class="pa-0">
              <draggable
                v-model="userAnswers"
                v-bind="dragOptions"
                group="time"
                @change="log">
                <v-hover v-for="(answer, key) in userAnswers" :key="key">
                  <template v-slot="{ hover }">
                    <v-chip 
                      close
                      @click:close="removeAt(key)"
                      :disabled="(answerGrade != null)"
                      :class="[answer.class, `elevation-${hover ? 4 : 0}`]"
                      class="mx-1 my-1"
                    >{{ answer.thai[gameSettings['lang'].value] }}</v-chip>
                  </template>
                </v-hover>
                <!-- <span>{{ (userAnswers.length == 0) ? message.gameRule : '' }}</span> -->
              </draggable>
            <v-spacer></v-spacer>
            </v-card-text>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions v-if="(answerGrade != null)">
      <span :class="answerGrade">{{ message[answerGrade + 'Answer'] }}</span>
      <v-spacer></v-spacer>
      <v-btn 
        text 
        color="indigo lighten-2" 
        @click="next">
        <span class="title">Next</span>
      </v-btn>
    </v-card-actions>

    <v-card-actions v-else>
      <v-spacer></v-spacer>
      <v-btn 
        text 
        :disabled="(userAnswers.length == 0)" 
        @click="reset">
        <span>Reset</span>
      </v-btn>
      <v-btn 
        text 
        color="indigo lighten-2" 
        :disabled="(userAnswers.length == 0)" 
        @click="confirm">
        <span class="title">Confirm</span>
      </v-btn>
    </v-card-actions>

  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters, mapMutations } from 'vuex';
import { thaiTimeMixin } from "@/mixins/thaiTimeMixin.js";
import draggable from "vuedraggable";
import AnalogClock from '@/components/AnalogClock.vue'

export default {
  name: 'Play',

  mixins: [thaiTimeMixin],

  components: {
    draggable,
    AnalogClock,
  },
  
  data() {
    return {
      hour: 1,
      minute: 0,
      newDate: new Date(),
      wordsAndNumbers: [],
      compAnswers: [],
      userAnswers: [],
      answerGrade: null,
      show: true,
      drag: false,
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      },
      message: {
        badAnswer: "Bad Answer!",
        goodAnswer: "Good Answer!",
        gameRule: "Drag the words to this area to compose what time it is on the clock.",
      }
    }
  },

  created() {
  },

  mounted() {
    // Remove the zero from the list (useless for time)
    this.wordsAndNumbers = this.getNumbersForTime.slice(1).concat(this.getWordsForTime);
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
  },

  methods: {
    ...mapMutations([
    ]),
    log: function(evt) {
      window.console.log(evt);
    },
    removeAt(idx) {
      this.userAnswers.splice(idx, 1);
    },
    reset() {
      this.userAnswers = [];
    },
    confirm() {
      this.answerGrade = "bad";
      let compAnswers = this.timeInThai(this.newDate);
      // console.log(this.newDate)
      for(let i=0; i<compAnswers.length; i++) {
        let compAnswer = compAnswers[i].map((x) => x.thai.word);
        // console.log(compAnswer)
        let userAnswer = this.userAnswers.map((x) => x.thai.word);
        // console.log(userAnswer)
        if(compAnswer.join("") == userAnswer.join("")) {
          this.answerGrade = "good";
          this.$store.state.gameScore++;
        } 
      }
    },
    next() {
      if(this.numRound == this.gameSettings['round'].value) {
        this.$store.state.gamePhase = 'over';
      } else {
        this.$store.state.gamePhase = 'play';
        this.$store.state.numRound++;
        this.answerGrade = null;
        this.compAnswers = [];
        this.userAnswers = [];
      }
    }
  },

  watch: {
    answerGrade: { 
      immediate: true,
      handler() {
        if (this.answerGrade == null) {
          this.hour = Math.floor(Math.random() * 24);
          this.minute = Math.floor(Math.random() * 60);
          this.newDate = new Date();
          this.newDate.setHours(this.hour.toString());
          this.newDate.setMinutes(this.minute.toString());
          this.newDate.setSeconds(0);
          console.log(this.newDate)
        }
      }
    }
  }
}
</script>

<style scoped>
.card-body {
  background-color: #eee;
  min-height: 50px;
}
span.good {
  color: green;
}
span.bad {
  color: red;
}
</style>
