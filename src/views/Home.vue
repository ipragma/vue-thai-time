<template>
  <v-container class="game-container" pa-sm-0>

    <v-card-text class="game-main pa-0">

      <v-row class="justify-center">
        <v-col cols="8" sm="6">
          <AnalogClock
            clockFace="thai"
            :showDigit=false
          />
        </v-col>
      </v-row>

      <v-container fluid>
        <v-row dense class="justify-center">
          <v-col
            v-for="game in gameOptions"
            :key="game.id"
            :cols="game.cols"
            :sm="game.sm"
          >
            <v-hover>
              <template v-slot="{ hover }">
                <v-card 
                  class="clickable justify-center text-center"
                  :color="`${hover ? 'indigo lighten-2' : ''}`"
                  :class="`${hover ? 'white' : 'dark'}--text`"
                  @click.native="playGame(game.id)"
                >
                  <!-- :class="[`elevation-${hover ? 6 : 2}`]" -->
                  <v-img
                    :src="game.src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="80px"
                  ></v-img>
                  <v-card-title class="justify-center py-1" v-text="game.title"></v-card-title>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text disabled>
        <span class="title"></span>
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters, mapMutations } from 'vuex';
import AnalogClock from '@/components/AnalogClock/AnalogClock.vue'

export default {
  name: 'Home',

  components: {
    AnalogClock,
  },
  
  data() {
    return {
    }
  },

  created() {
  },

  computed: {
    ...mapState([
      'gameStatus',
      'gameOptions',
    ]),
    ...mapGetters([
    ]),
  },

  methods: {
    ...mapMutations([
    ]),
    playGame(value) {
      this.$store.state.gameStatus.phase = value;
    },
  },

  watch: {
  }
}
</script>

<style scoped>
</style>