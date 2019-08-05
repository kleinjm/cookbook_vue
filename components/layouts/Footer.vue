<template>
  <v-footer height="auto" :color="backgroundColor">
    <v-layout justify-center row wrap>
      <v-flex py-3 text-center white--text xs12>
        &copy; {{ currentYear }} — <strong>Cookbook</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    backgroundColor() {
      return this.$vuetify.theme.dark ? '' : 'primary lighten-1'
    },
  },
}
</script>
