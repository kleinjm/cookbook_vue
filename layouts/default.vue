<template>
  <v-app :dark="isDarkTheme">
    <v-navigation-drawer
      v-if="$auth.$state.loggedIn"
      v-model="drawer"
      fixed
      right
    >
      <v-alert type="error" :value="error">{{ error }}</v-alert>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ fullName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon>mdi-account</v-icon>
            Account
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item @click="toggleDarkTheme">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ themeNameDisplay }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
    async logout() {
      this.drawer = false
      await this.$auth
        .logout()
        .then(() => {
          this.$router.push('/login')
        })
        .catch((e) => {
          this.error = e + ''
        })
      await this.$apolloHelpers.onLogout()
    },
  },
}
</script>
