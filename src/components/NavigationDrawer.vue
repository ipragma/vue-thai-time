
<template>
  <v-navigation-drawer
    v-model="drawer"
    color="primary lighten-2"
    width="280"
    :expand-on-hover=false
    :mini-variant=false
    :right=false
    absolute
    temporary
    dark
  >
    <slot name="header"></slot>

    <v-list
      nav
      class="py-0"
    >
      <div v-for="(setting, key) in settings" :key="key">

        <v-divider v-if="setting.comp == 'divider'"></v-divider>

        <v-list-item v-if="setting.comp == 'btn-toggle'">
          {{ setting.title }}
          <v-spacer></v-spacer>
          <v-btn-toggle 
            v-model="setting.value" 
            @change="changeSettings(settings)" 
            mandatory>
            <v-btn 
              v-for="item in setting.items" :key="item"
              color="indigo"
              small
              :value="item">
              {{ item }}
            </v-btn>
          </v-btn-toggle>
        </v-list-item>

        <v-list-item v-if="setting.comp == 'link'" link>
          <v-list-item-icon v-if="setting.icon">
            <v-icon>{{ setting.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ setting.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-expansion-panels v-if="setting.comp == 'expansion-panel'" flat>
          <v-expansion-panel>
            <v-expansion-panel-header color="primary lighten-2" class="px-2">
              <span>{{ setting.title }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="primary lighten-2">
              <span>{{ setting.content }}</span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

      </div>

    </v-list>

    <template v-slot:append>
      <slot name="footer"></slot>
    </template>
  </v-navigation-drawer>  

</template>

<script>
export default {
  props: {
    info: Object,
    toggle: Boolean,
    links: Array,
    settings: Object,
  },

  data: () => ({
    drawer: false,
  }),

  created() {
  },

  computed: {
  },

  methods: {
    changeSettings() {
      this.$emit('changeSettings', this.settings)
    }
  },

  watch: {
    toggle: function() {
      this.drawer = !this.drawer
    },
  }
};
</script>

<style scoped>
</style>
