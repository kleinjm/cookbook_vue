<template>
  <v-app :dark="isDarkTheme">
    <NavigationDrawer
      :drawer="drawer"
      @logout="logout"
      @drawerToggled="drawerToggled"
    />
    <Navbar @toggle-drawer="drawer = !drawer" />
    <v-content>
      <v-container grid-list-md>
        <v-alert type="error" :value="errors">{{ errors }}</v-alert>
        <v-alert
          v-model="displayGlobalAlert"
          dismissible
          :type="alertType"
          transition="scale-transition"
        >
          {{ globalAlert.message }}
        </v-alert>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer app height="auto" color="primary lighten-1">
      <v-layout justify-center row wrap>
        <v-btn v-for="link in links" :key="link" color="white" text rounded>
          {{ link }}
        </v-btn>
        <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
          &copy;2019 — <strong>Cookbook</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from '~/components/layouts/Navbar'
import NavigationDrawer from '~/components/layouts/NavigationDrawer'

export default {
  components: { Navbar, NavigationDrawer },
  data() {
    return {
      drawer: false,
      right: true,
      errors: null,
      displayGlobalAlert: false,
      links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us'],
    }
  },
  computed: {
    ...mapGetters(['globalAlert', 'isDarkTheme']),
    globalAlertPopulated() {
      const message = this.globalAlert.message
      return message !== '' && message !== null && message !== undefined
    },
    alertType() {
      return this.globalAlert.type || 'success'
    },
  },
  watch: {
    displayGlobalAlert(displayed) {
      if (!displayed) this.clearGlobalAlert()
    },
    globalAlertPopulated(displayed) {
      if (displayed) this.displayGlobalAlert = true
    },
  },
  created() {
    this.displayGlobalAlert = this.globalAlertPopulated
  },
  methods: {
    ...mapActions(['clearGlobalAlert']),
    drawerToggled(open) {
      this.drawer = open
    },
    logout({ success, errors }) {
      if (success) {
        this.drawer = false
      } else {
        this.errors = errors
      }
    },
  },
}
</script>
