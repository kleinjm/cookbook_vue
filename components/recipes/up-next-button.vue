<template>
  <v-btn
    fab
    small
    :loading="loading"
    :disabled="loading"
    :color="color"
    @click="toggleUpNext"
  >
    <v-icon>mdi-page-next-outline</v-icon>
  </v-btn>
</template>
<script>
import _get from 'lodash/get'
import _filter from 'lodash/filter'
import { mapActions } from 'vuex'
import updateUpNext from '~/mutations/updateUpNext'

export default {
  name: 'UpNextButton',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    upNext() {
      return _get(this.recipe, 'upNext', 0)
    },
    color() {
      return this.upNext ? 'primary' : ''
    },
  },
  methods: {
    ...mapActions(['up-next/addUpNextRecipe', 'up-next/removeUpNextRecipe']),
    toggleUpNext() {
      this.loading = true
      const upNext = this.upNext === 0 ? 1 : 0

      updateUpNext({
        apollo: this.$apollo,
        recipeIds: [this.recipe.id],
        upNext,
      })
        .then((recipes) => {
          if (upNext) {
            this['up-next/addUpNextRecipe'](recipes[0])
          } else {
            this['up-next/removeUpNextRecipe'](recipes[0])
          }
        })
        .catch((errors) => {
          this.$emit('errors', errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
