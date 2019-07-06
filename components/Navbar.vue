<template>
  <v-toolbar fixed app color="primary">
    <router-link to="/" class="white--text">
      <v-toolbar-title>
        Cookbook
      </v-toolbar-title>
    </router-link>
    <v-spacer />
    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat class="white--text">
        <v-badge color="info" left>
          <template v-slot:badge>
            <span>4</span>
          </template>
          Up Next
        </v-badge>
      </v-btn>
      <template v-if="$auth.$state.loggedIn">
        <v-btn flat icon @click="$emit('toggle-drawer')">
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
</template>
