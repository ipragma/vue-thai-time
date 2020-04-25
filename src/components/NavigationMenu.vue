<template>
  <v-menu
    v-model="drawer"
    color="primary lighten-2"
    :min-width="settings.menuWidth.value"
    :close-on-click=true
    :close-on-content-click=false
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>settings</v-icon>
      </v-btn>
    </template>

    <v-list
      nav
    >
      <slot name="header"></slot>

      <div v-for="(setting, key) in settings" :key="key">
        <div v-if="setting.comp != null">

          <v-divider v-if="setting.comp == 'divider'" class="my-2"></v-divider>

          <v-list-item v-if="setting.comp == 'switch'">
            {{ setting.title }}
            <v-spacer></v-spacer>
            <v-switch
              v-model="setting.value"
              @change="clickSwitch(key)"
              color="indigo"
              inset
              label=""
            ></v-switch>
          </v-list-item>

          <v-list-item v-if="setting.comp == 'slider'">
            {{ setting.title }}
            <v-spacer></v-spacer>
            <v-slider style=" "
              v-model="setting.value"
              class="navigation-menu"
              color="indigo"
              :min="setting.items[0]"
              :max="setting.items[setting.items.length-1]"
              :step="setting.items[1]-setting.items[0]"
              :thumb-size="24"
              thumb-label="always"
            ></v-slider>
          </v-list-item>
              <!-- :tick-labels="setting.items" -->

          <v-list-item v-if="setting.comp == 'btn'">
            {{ setting.title }}
            <v-spacer></v-spacer>
            <v-btn-toggle 
              v-model="setting.value" 
              mandatory
            >
              <v-btn 
                v-for="item in setting.items" :key="item"
                style="min-width: 40px;"
                color="indigo"
                outlined
                small
                :value="item"
              ><strong>{{ item }}</strong>
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

          <v-expansion-panels 
            v-if="setting.comp == 'expansion-panel'" 
            flat 
            :style="{ 'max-width': settings.menuWidth.value-16 + 'px' }"
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="px-2">
                <span>{{ setting.title }}</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <span>{{ setting.content }}</span>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>

      <slot name="footer"></slot>

    </v-list>
  </v-menu>

</template>

<script>
export default {
  props: {
    info: Object,
    toggle: Boolean,
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
    clickSwitch(key) {
      let related = this.settings[key].related;
      // console.log(this.settings[key].value)
      if (this.settings[key].value) {
        // console.log(this.settings[related].items[1])
        this.settings[related].value = this.settings[related].items[1]
      } else {
        // console.log(this.settings[related].items[0])
        this.settings[related].value = this.settings[related].items[0]
      } 
    },
  },

  watch: {
    toggle: function() {
      this.drawer = !this.drawer
    },
  }
};
</script>

<style scoped>
.navigation-menu >>> .v-messages {
  display: none;
}
.navigation-menu >>> .v-slider {
  margin-top: 10px;
}
</style>
