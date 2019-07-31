<template>
  <v-footer height="auto" color="primary lighten-1">
    <v-layout justify-center row wrap>
      <v-btn v-for="link in links" :key="link" color="white" text rounded>
        {{ link }}
      </v-btn>
      <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
        &copy;2019 — <strong>Cookbook</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us'],
    }
  },
}
</script>
