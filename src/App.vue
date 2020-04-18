<template>
  <v-app>
    <!-- <div class="mx-auto my-auto"> -->
    <v-card 
    width="540"
    class="mx-auto my-auto">

      <Header 
        @toggleDrawer="toggleDrawer">
      </Header>

      <v-content>
        <Drawer 
          :toggle="toggle"
          :links="gameLinks" 
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

        <component :is="selectedComponent"></component>
      </v-content>

      <!-- <Footer
        :info="myInfo"/> -->
    </v-card>
    <!-- </div> -->

  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Drawer from '@/components/NavigationDrawer';
import Header from '@/layouts/Header';
import Home from '@/views/Home';
import Play from '@/views/Play';
import Over from '@/views/Over';

export default {
  name: 'App',

  components: {
    Drawer,
    Header,
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
      'gameLinks',
      'gameSettings',
      'myInfo',
    ]),
    ...mapGetters([
    ])
  },

  methods: {
    ...mapMutations([
    ]),
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
  background-color:gold !important;
}
.v-chip.word {
  background-color:coral !important;
}
.designed {
  font-family: 'Dynalight';
  font-size: 1.5em;
}
</style>
