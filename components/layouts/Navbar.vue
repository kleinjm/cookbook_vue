<template>
  <v-app-bar fixed app color="primary" elevate-on-scroll>
    <v-toolbar-title>
      <nuxt-link to="/recipes" class="white--text no-underline">
        Cookbook
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text class="white--text">
        <v-badge color="info" left>
          <template v-slot:badge>
            <span>4</span>
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
        <v-list-item>
          <v-list-item-title>Up Next</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
