<template>
  <v-container class="grey lighten-5" pa-sm-0>

    <v-card-text class="card-inner pa-0">
    <v-row class="justify-center">
      <v-col cols="8" sm="5">
        <v-img src="../assets/img/hourglass.png" alt=""></v-img>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col cols="12">
        <div class="title text-center">
          Right answers: {{ gameScore }}<br>
          Wrong answers: {{ numRound - gameScore }}
        </div>
      </v-col>
    </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="indigo lighten-2" text @click="goHome()">
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

export default {
  name: 'Over',

  mixins: [],

  components: {
  },
  
  data() {
    return {
    }
  },

  created() {
  },

  computed: {
    ...mapState([
      'gamePhase',
      'gameScore',
      'numRound',
    ]),
    ...mapGetters([
    ]),
  },

  methods: {
    ...mapMutations([
    ]),
    goHome() {
      this.$store.state.gamePhase = 'home';
    },
  },

  watch: {
  }
}
</script>

<style scoped>
</style>