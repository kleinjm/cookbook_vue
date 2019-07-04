import { validationMixin } from 'vuelidate'
import { fieldErrors } from '~/utils/vuelidate'
import { formattedAxiosErrors } from '~/utils/form'

export default {
  mixins: [validationMixin],
  data() {
    return {
      email: '',
      error: null,
      loading: false,
      password: '',
      passwordVisible: false,
    }
  },
  computed: {
    emailErrors() {
      return fieldErrors('email', this)
    },
    passwordErrors() {
      return fieldErrors('password', this)
    },
  },
  methods: {
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.loading = true

      try {
        await this.formAction()
      } catch (e) {
        this.error = formattedAxiosErrors(e)
      } finally {
        this.loading = false
      }
    },
  },
}
