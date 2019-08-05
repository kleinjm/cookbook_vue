<template>
  <v-navigation-drawer
    v-if="$auth.$state.loggedIn"
    :value="drawer"
    fixed
    right
    temporary
    @input="drawerToggled"
  >
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
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavigationDrawer',
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['globalAlert', 'isDarkTheme']),
    fullName() {
      const user = this.$auth.$state.user
      if (!user) return

      return `${user.first_name} ${user.last_name}`
    },
    themeNameDisplay() {
      return this.isDarkTheme ? 'Light Theme' : 'Dark Theme'
    },
  },
  methods: {
    ...mapActions(['toggleDarkTheme']),
    drawerToggled(open) {
      this.$emit('drawerToggled', open)
    },
    async logout() {
      await this.$auth
        .logout()
        .then(() => {
          this.$emit('logout', { success: true })
          this.$router.push('/login')
        })
        .catch((errors) => {
          this.$emit('logout', { success: false, errors })
        })
      await this.$apolloHelpers.onLogout()
    },
  },
}
</script>
