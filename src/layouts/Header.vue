<template>
  <v-toolbar
    color="indigo"
    dark
  >
    <v-app-bar-nav-icon v-if="(gamePhase == 'home')" @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
    <v-btn v-else icon @click="goHome()">
      <v-icon>home</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <!-- <v-btn @click="goHome()" text>
      <slot></slot>
    </v-btn> -->

    <div>
      <v-icon class="white--text">flash_on</v-icon>
      <span class="title pr-1">{{ gameScore }}/{{ gameSettings['round'].value }}</span>
    </div>

  </v-toolbar>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Header',

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
      'gameSettings',
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
    toggleDrawer() {
      this.$emit('toggleDrawer')
    }
  },

  watch: {
  }
};
</script>

<style scoped>
</style>
