<template>
  <v-app>
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
    <Footer />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from '~/components/layouts/Navbar'
import NavigationDrawer from '~/components/layouts/NavigationDrawer'
import Footer from '~/components/layouts/Footer'

export default {
  components: { Navbar, NavigationDrawer, Footer },
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
    isDarkTheme(isDark) {
      this.$vuetify.theme.dark = isDark
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
