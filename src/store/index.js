import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myInfo: {
      name: 'iPragma',
      link: 'https://www.techonsunday.com',
      support: 'https://www.techonsunday.com',
    },
    gamePhase: 'home',
    gameScore: 0,
    numRound: 1,

    gameSettings: {
      'div1': {
        comp: 'divider',
      },
      'lang': {
        comp: 'btn-toggle',
        title: 'Language',
        value: 'word',
        items: ['word', 'phonetic'],
      },
      'round': {
        comp: 'btn-toggle',
        title: 'Rounds',
        value: 3,
        items: [1, 3, 5],
      },
      'div2': {
        comp: 'divider',
      },
      'link1': {
        comp: 'expansion-panel',
        action: 'about',
        title: 'About',
        icon: 'mdi-help-box',
        path: '/about',
        content: `
This is a mini-game for practicing telling the time in Thai. It does not teach you the basic, but you can easily browse the web to learn how to tell the time in Thai before playing this mini-game.
If you notice a mistake or for any feedback, email me ...
`
      },
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
