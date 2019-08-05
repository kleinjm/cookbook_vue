<template>
  <v-app-bar fixed app :color="backgroundColor" elevate-on-scroll>
    <v-toolbar-title>
      <nuxt-link to="/recipes" class="white--text no-underline">
        Cookbook
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text class="white--text" nuxt exact to="/up-next">
        <v-badge color="info" left>
          <template v-if="upNextCount" v-slot:badge>
            <span>{{ upNextCount }}</span>
          </template>
          Up Next
        </v-badge>
      </v-btn>

      <template v-if="$auth.$state.loggedIn">
        <v-btn text icon @click="$emit('toggle-drawer')">
          <v-icon class="white--text">
            account_circle
          </v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn to="/login" router text class="white--text">
          Sign In
        </v-btn>
        <v-btn to="/sign-up" router text class="white--text">
          Sign Up
        </v-btn>
      </template>
    </v-toolbar-items>

    <v-menu class="hidden-md-and-up" offset-y>
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon class="white--text hidden-md-and-up" v-on="on">
        </v-app-bar-nav-icon>
      </template>
      <v-list>
        <v-list-item to="up-next">
          <v-list-item-title>
            Up Next
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['up-next/upNextRecipes']),
    upNextCount() {
      return this['up-next/upNextRecipes'].length
    },
    backgroundColor() {
      return this.$vuetify.theme.dark ? '' : 'primary'
    },
  },
  beforeMount() {
    this.$store.dispatch('up-next/fetchUpNextRecipes', this.$apollo)
  },
}
</script>
