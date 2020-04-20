<template>
  <v-app>
    <v-card 
      width="540"
      class="mx-auto my-auto">

      <v-toolbar
        color="indigo"
        dark>
        <v-app-bar-nav-icon v-if="(gamePhase == 'home')" @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
        <v-btn v-else icon @click="goHome()">
          <v-icon>home</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <div>
          <v-icon class="white--text">flash_on</v-icon>
          <span class="title pr-1">{{ gameScore }}/{{ gameSettings['round'].value }}</span>
        </div>
      </v-toolbar>

      <v-content>
        <component :is="selectedComponent"></component>
        
        <Drawer 
          :toggle="toggle"
          :settings="gameSettings" 
          @changeSettings="changeSettings">

          <template v-slot:header>
            <div class="title text-center my-3">
              <v-icon color="indigo">timer</v-icon>
              <span class="white--text ">Thai<strong>TIME</strong></span>
            </div>
            <div class="text-center my-3">
              <v-btn 
                :href="myInfo.support" 
                target="_blank"
                rounded 
                outlined 
                dark>Support
              </v-btn>
            </div>
          </template>

          <template v-slot:footer>
            <div class="white--text text-center pa-2">
              {{ new Date().getFullYear() }} — 
              <span class="designed">Made with </span>
              <v-icon class="red--text">favorite</v-icon>
              by <a class="white--text" :href="myInfo.link" target="_blank">{{ myInfo.name }}</a>
            </div>
          </template>
        </Drawer>

      </v-content>

    </v-card>

  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Drawer from '@/components/NavigationDrawer';
import Home from '@/views/Home';
import Play from '@/views/Play';
import Over from '@/views/Over';

export default {
  name: 'App',

  components: {
    Drawer,
    Home,
    Play,
    Over,
  },

  data: () => ({
    //
    selectedComponent: 'Home',
    toggle: false,
  }),

  computed: {
    ...mapState([
      'gamePhase',
      'gameScore',
      'gameSettings',
      'myInfo',
    ]),
    ...mapGetters([
    ])
  },

  methods: {
    ...mapMutations([
    ]),
    goHome() {
      this.$store.state.gamePhase = 'home';
    },
    toggleDrawer() {
      this.toggle = !this.toggle
    },
    changeSettings(value) {
      this.$store.state.gameSettings = value
    },
  },

  watch: {
    gamePhase: { 
      immediate: true,
      handler() {
        if (this.gamePhase == "home") {
          this.selectedComponent = 'Home';
        } else if (this.gamePhase == "play") {
          this.selectedComponent = 'Play';
        } else if (this.gamePhase == "over") {
          this.selectedComponent = 'Over';
        }
      }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Dynalight');

@media screen and (min-width: 540px) {
  .card-inner {
    height: 580px;
  }
}
.v-chip.number {
  background-color:lightskyblue !important;
}
.v-chip.word {
  background-color:lightsteelblue !important;
}
.designed {
  font-family: 'Dynalight';
  font-size: 1.5em;
}
</style>
