<template>
  <v-app :dark="isDarkTheme">
    <v-navigation-drawer
      v-if="$auth.$state.loggedIn"
      v-model="drawer"
      fixed
      app
      right
    >
      <v-alert type="error" :value="error">{{ error }}</v-alert>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ fullName }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="toggleDarkTheme">
          <v-list-tile-content>
            <v-list-tile-title>{{ themeNameDisplay }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-content>
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <Navbar @toggle-drawer="drawer = !drawer" />
    <v-content>
      <v-container>
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
        <v-btn v-for="link in links" :key="link" color="white" flat round>
          {{ link }}
        </v-btn>
        <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
          &copy;2018 — <strong>Cookbook</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from '~/components/Navbar'

export default {
  components: { Navbar },
  data() {
    return {
      drawer: false,
      right: true,
      error: null,
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
    fullName() {
      const user = this.$auth.$state.user
      if (!user) return

      return `${user.first_name} ${user.last_name}`
    },
    themeNameDisplay() {
      return this.isDarkTheme ? 'Light Theme' : 'Dark Theme'
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
    ...mapActions(['clearGlobalAlert', 'toggleDarkTheme']),
    logout() {
      this.drawer = false
      this.$auth
        .logout()
        .then(() => {
          this.$router.push('/login')
        })
        .catch((e) => {
          this.error = e + ''
        })
    },
  },
}
</script>
