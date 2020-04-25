<template>
  <v-app class="thai-time">
    <v-card 
      :style="cssVars"
      class="game-outer mx-auto my-auto"
    >
      <!-- T O O L B A R -->
      <v-toolbar
        color="indigo"
        dark
      >
        <Menu 
          v-if="(gameStatus.phase == 'home')"
          :toggle="toggle"
          :settings="gameSettings" 
        >
          <template v-slot:header>
            <div class="text-center pa-2">
              <span class="display-1 indigo--text">{{ myInfo.name }}</span>
            </div>
            <div class="text-center pa-2">
              <v-btn 
                :href="myInfo.support" 
                target="_blank"
                color="indigo"
                dark
                rounded 
              >Support
              </v-btn>
            </div>
          </template>

          <template v-slot:footer>
            <div class="text-center pa-2">
              {{ new Date().getFullYear() }} — 
              <span class="designed">Made with </span>
              <v-icon class="red--text">favorite</v-icon>
              by <a class="" :href="myInfo.link" target="_blank">{{ myInfo.author }}</a>
            </div>
          </template>
        </Menu>

        <v-btn v-else icon @click="home()">
          <v-icon>home</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <div 
          v-if="(gameStatus.phase == 'home')" 
          class="title text-center my-3"
        >
          <v-icon color="primary lighten-2">timer</v-icon>
          <span class="white--text ">Thai<strong>TIME</strong></span>
        </div>

        <div v-else>
          <v-icon class="white--text">flash_on</v-icon>
          <span class="title pr-1">{{ gameStatus.score }}/{{ gameSettings['round'].value }}</span>
        </div>

        <v-spacer></v-spacer>

        <v-btn 
          class="help-button" 
          :disabled="!gameMessages.rules[gameStatus.phase]>''"
          icon 
          @click="snackbar.rule = !snackbar.rule"
        >
          <v-icon>help_outline</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- C O N T E N T -->
      <v-content>
        <v-snackbar
          v-if="gameMessages.rules[gameStatus.phase]"
          v-model="snackbar.rule"
          absolute
          multi-line
          :timeout="gameSettings.timeout.value"
          top
        >
          {{ gameMessages.rules[gameStatus.phase] }}
          <v-btn
            dark
            text
            @click="snackbar.rule = false"
          >
            Close
          </v-btn>
        </v-snackbar>

        <component 
          :is="selectedComponent"
          :ref="gameStatus.phase"
          @home="home"
        >
          <template v-slot:action>
            <v-snackbar
              v-model="snackbar.grade"
              absolute
              :color="(gameStatus.grade == 'good') ? 'success' : 'error'"
              :timeout="gameSettings.timeout.value"
              bottom
            >
              {{ gameMessages.grade[gameStatus.grade] }}
              <v-btn
                dark
                text
                @click="snackbar.grade = false"
              >
                Close
              </v-btn>
            </v-snackbar>

            <v-spacer></v-spacer>

            <v-btn v-if="(gameStatus.grade != null)"
              text 
              color="indigo lighten-2" 
              @click="next(gameStatus.phase)"
            >
              <span class="title">Next</span>
            </v-btn>
            <v-btn v-else
              text 
              color="indigo lighten-2" 
              @click="confirm()"
            >
              <span class="title">Confirm</span>
            </v-btn>
          </template>
        </component>

      </v-content>
    </v-card>

  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Menu from '@/components/NavigationMenu';
import Game0 from '@/views/Game0';
import Game1 from '@/views/Game1';
import Game2 from '@/views/Game2';
import Game3 from '@/views/Game3';
import Game4 from '@/views/Game4';
import Game5 from '@/views/Game5';
import Home from '@/views/Home';
import Over from '@/views/Over';

export default {
  name: 'App',

  components: {
    Menu,
    Home,
    Game0,
    Game1,
    Game2,
    Game3,
    Game4,
    Game5,
    Over,
  },

  data: () => ({
    //
    selectedComponent: 'Home',
    toggle: false,
    snackbar: {
      grade: false,
      rule: true,
    },
  }),

  computed: {
    ...mapState([
      'myInfo',
      'gameMessages',
      'gameStatus',
      'gameSettings',
    ]),
    ...mapGetters([
    ]),
    gamePhase() {
      return this.gameStatus.phase
    },
    cssVars() {
      return {
        '--width': this.gameSettings.width.value + 'px',
        '--height': this.gameSettings.height.value + 'px',
      }
    },
    // language() {
    //   return (this.gameSettings.phonetic.value ? this.gameSettings.phonetic.items[1] : this.gameSettings.phonetic.items[0] )
    // }
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
    confirm() {
      this.snackbar.grade = true;
      this.$refs[this.gameStatus.phase].confirm();
    },
    home() {
      this.$store.state.gameStatus.grade = null;
      this.$store.state.gameStatus.phase = 'home';
    },
    init() {
      this.$store.state.gameStatus.round = 1;
      this.$store.state.gameStatus.score = 0;
      this.snackbar.rule = true;
      this.snackbar.grade = false;
      this.$store.state.gameStatus.grade = null;
      this.$store.state.gameStatus.comp = [];
      this.$store.state.gameStatus.user = [];
    },
    next(value) {
      this.snackbar.grade = false;
      this.$store.state.gameStatus.grade = null;
      this.$store.state.gameStatus.comp = [];
      this.$store.state.gameStatus.user = [];

      if (this.gameStatus.round == this.gameSettings['round'].value) {
        this.$store.state.gameStatus.phase = 'over';
      } else {
        this.$store.state.gameStatus.phase = value;
        this.$store.state.gameStatus.round++;
        this.$refs[this.gameStatus.phase].init()
      }
    },
  },

  watch: {
    gamePhase: { 
      immediate: true,
      handler() {
        let phase = this.gameStatus.phase;
        if (phase == "home") {
          this.init();
          this.selectedComponent = 'Home';
        } else {
          this.selectedComponent = phase[0].toUpperCase() + phase.slice(1);
        } 
      }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Dynalight');

.thai-time .game-outer {
  width: var(--width);
}
.thai-time .game-container {
  background: rgb(240, 250, 255);
  padding: 0 !important;
}
.thai-time .game-main {
  padding: 0 !important;
  min-height: var(--height);
}
.thai-time .user-answer {
  min-height: 80px !important;
}
@media screen and (min-width: 540px) {
  .thai-time .game-main {
    height: var(--height);
  }
  .thai-time .user-answer {
    height: 80px !important;
  }
}
.thai-time .v-chip.number {
  background:lightskyblue !important;
}
.thai-time .v-chip.word {
  background:lightsteelblue !important;
}
.thai-time .designed {
  font-family: 'Dynalight';
  font-size: 1.5em;
}
.thai-time .clickable {
  cursor: pointer;
}
.thai-time .v-card__actions {
  padding: 8px 16px;
}
</style>
