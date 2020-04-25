<template>
  <v-container class="game-container" pa-sm-0>

    <v-card-text class="game-main pa-0">
      <v-row class="justify-center">
        <v-col cols="12" sm="8">
          <!-- <v-img src="../assets/img/hourglass.png" alt=""></v-img> -->
          <DoughnutChart 
            :percent="Math.floor((gameStatus.score/gameStatus.round)*100)"
            :visibleValue="true" 
            foregroundColor="green"
            backgroundColor="#d3fde2"
            :strokeWidth="40"
            :radius="60"
          />
          </v-col>
          <v-col cols="12">
            <div class="title text-center">
              Right answers: {{ gameStatus.score }}<br>
              Wrong answers: {{ gameStatus.round - gameStatus.score }}
            </div>
          </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
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
import DoughnutChart from '@/components/DoughnutChart.vue'

export default {
  name: 'Over',

  mixins: [],

  components: {
    DoughnutChart,
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
    ]),
    ...mapGetters([
    ]),
  },

  methods: {
    ...mapMutations([
    ]),
    home() {
      this.$emit('home');
    },
  },

  watch: {
  }
}
</script>

<style scoped>
</style>