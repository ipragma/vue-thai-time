import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myInfo: {
      name: 'Nova Web App',
      link: 'https://www.novawebapp.com',
      support: 'https://www.novawebapp.com',
      author: 'iPragma'
    },

    gameStatus: {
      phase: 'home',
      score: 0,
      round: 1,
      grade: null,
      comp: [],
      user: [],
    },

    gameOptions: [
      { id: "game0", title: "Learn",  src: require('@/assets/img/learn-to-tell-time-clock-dial-learning-clock.jpg'), cols: 6, sm: 4 },
      { id: "game1", title: "Game 1", src: require('@/assets/img/learn-to-tell-time-clock-dial-learning-clock.jpg'), cols: 6, sm: 4 },
      { id: "game2", title: "Game 2", src: require('@/assets/img/learn-to-tell-time-clock-dial-learning-clock.jpg'), cols: 6, sm: 4 },
      { id: "game3", title: "Game 3", src: require('@/assets/img/learn-to-tell-time-clock-dial-learning-clock.jpg'), cols: 6, sm: 4 },
      { id: "game4", title: "Game 4", src: require('@/assets/img/learn-to-tell-time-clock-dial-learning-clock.jpg'), cols: 6, sm: 4 },
      { id: "game5", title: "Game 5", src: require('@/assets/img/learn-to-tell-time-clock-dial-learning-clock.jpg'), cols: 6, sm: 4 },
    ],

    gameSettings: {
      'div1': {
        comp: 'divider',
      },
      'phonetic': {
        comp: 'switch',
        title: 'Phonetic',
        value: false,
        related: 'lang'
      },
      'lang': {
        value: 'word',
        items: ['word', 'phonetic'],
      },
      'round': {
        comp: 'slider',
        title: 'Rounds',
        value: 10,
        items: [1, 2, 20],
      },
      'choice': {
        title: 'Choice',
        value: 4,
        items: [2, 4, 6],
      },
      'div2': {
        comp: 'divider',
      },
      'height': {
        value: 540,
      },
      'width': {
        value: 560,
      },
      'line': {
        value: 3,
      },
      'cardWidth': {
        value: 122,
      },
      'menuWidth': {
        value: 280,
      },
      'timeout': {
        value: 3000,
      },
//       'link1': {
//         comp: 'expansion-panel',
//         action: 'about',
//         title: 'About',
//         icon: 'mdi-help-box',
//         path: '/about',
//         content: `
// This is a mini-game for practicing telling the time in Thai. It does not teach you the basic, but you can easily browse the web to learn how to tell the time in Thai before playing this mini-game.
// If you notice a mistake or for any feedback, email me ...
//          `
//       },
    },

    gameMessages: {
      grade: {
        bad: "Bad Answer!",
        good: "Good Answer!",
      },
      rules: {
        home:  "",
        game0: "Feel free to change the hours and the minutes on the clock to learn the differents ways to tell time in Thai.",
        game1: "Drag the words to the bottom area to guess the time displayed on the clock.",
        game2: "Change the hours and the minutes below the clock to guess the time written in Thai.",
        game3: "Select one card written in Thai to guess what time it is on the clock.",
        game4: "Select one card with the clock that displays the time written in Thai.",
        game5: "Sort the clocks in the correct order to match the cards with the time written in Thai.",
      }
    },
  },

  getters: {
  },

  mutations: {
  },

  actions: {
  },

  modules: {
  }
})
