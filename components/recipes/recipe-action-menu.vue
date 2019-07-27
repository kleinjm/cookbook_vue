<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </template>
    <v-list dense flat>
      <v-list-item @click="editRecipe">
        <v-list-item-icon>
          <v-icon>mdi-square-edit-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense flat>
      <v-list-item @click="deleteRecipe">
        <v-list-item-icon>
          <v-icon>mdi-delete</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import deleteRecipe from '~/mutations/deleteRecipe'

export default {
  name: 'RecipeActionMenu',
  props: {
    recipeId: {
      type: String,
      required: true,
    },
    recipeUuid: {
      type: String,
      required: true,
    },
  },
  methods: {
    editRecipe() {
      this.$router.push(`/recipes/edit/${this.recipeUuid}`)
    },
    deleteRecipe() {
      if (!confirm('Are you sure you want to delete this recipe?')) return

      deleteRecipe({
        apollo: this.$apollo,
        recipeId: this.recipeId,
      })
        .then(() => {
          this.$router.push('/recipes')
        })
        .catch((errors) => {
          this.$emit('errors', errors)
        })
    },
  },
}
</script>
