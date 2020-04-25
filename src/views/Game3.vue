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

      <v-divider class="mx-4"></v-divider>

      <v-item-group v-model=userSelected :value="userSelected">
        <v-container>
          <v-row class="justify-center">
            <v-col
              v-for="(answer, key) in gameStatus.user" :key="key"
              cols="12"
              sm="11"
              class="pt-0"
            >
              <v-item v-slot:default="{ active, toggle }">
                <v-card
                  :dark="active ? true : false"
                  :color="active ? 'indigo lighten-2' : ''"
                  class="d-flex align-center"
                  @click="toggle"
                  :disabled="(gameStatus.grade != null)"
                >
                  <v-scroll-y-transition>
                    <div class="flex-grow-1">
                      <v-chip 
                        v-for="(item, j) in answer[0]" :key="j"
                        :class="item.class"
                        class="mx-1 my-1"
                      >{{ item.thai[gameSettings['lang'].value] }}</v-chip>
                    </div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
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

export default {
  name: 'Game3',

  mixins: [thaiTimeMixin],

  components: {
    AnalogClock,
  },
  
  data() {
    return {
      newDate: new Date(),
      compSelected: null,
      userSelected: null,
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
    init() {
      if (this.gameStatus.grade == null) {
        let n = this.gameSettings['choice'].value;
        this.userSelected = undefined;
        this.compSelected = Math.ceil(Math.random()*n)-1;
        // console.log(this.compSelected);

        let userAnswers = [];
        for (let i=0; i<n; i++) {
          let hour = Math.floor(Math.random() * 24);
          let minute = Math.floor(Math.random() * 60);
          let newDate = new Date();

          newDate.setHours(hour.toString());
          newDate.setMinutes(minute.toString());
          newDate.setSeconds(0,0);

          userAnswers.push(this.timeInThai(newDate));
          // console.log(this.timeInThai(newDate))

          if (i == this.compSelected) {
            this.newDate = newDate;
          }
        }
        this.$store.state.gameStatus.user = userAnswers;
      }
    },
    confirm() {
      this.$store.state.gameStatus.grade = "bad";
      if(this.compSelected == this.userSelected) {
        this.$store.state.gameStatus.grade = "good";
        this.$store.state.gameStatus.score++;
      }
    },
  },

  watch: {
  }
}
</script>

<style scoped>
</style>
