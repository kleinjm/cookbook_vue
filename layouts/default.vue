<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" fixed app right>
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
        <v-list-tile v-if="$auth.$state.loggedIn" @click="logout">
          <v-list-tile-content>
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-else>
          <v-list-tile to="/login" router>
            <v-list-tile-content>
              <v-list-tile-title>Log In</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/sign-up" router>
            <v-list-tile-content>
              <v-list-tile-title>Sign Up</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app color="primary">
      <router-link to="/" class="white--text">
        <v-toolbar-title>
          Cookbook
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat class="white--text">
          <v-badge color="info" left>
            <template v-slot:badge>
              <span>4</span>
            </template>
            Up Next
          </v-badge>
        </v-btn>
        <template v-if="$auth.$state.loggedIn">
          <v-btn flat @click="drawer = !drawer">
            <v-icon class="white--text">
              account_circle
            </v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn to="/login" router flat class="white--text">
            Sign In
          </v-btn>
          <v-btn to="/sign-up" router flat class="white--text">
            Sign Up
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
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
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      right: true,
      error: null,
      displayGlobalAlert: false,
    }
  },
  computed: {
    ...mapGetters(['globalAlert']),
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
