import axios from 'axios'

export default async function({ query, store }) {
  if (query.confirmation_token) {
    const url = `${process.env.baseUrl}/users/confirmation?confirmation_token=${query.confirmation_token}`
    try {
      await axios.get(url)

      store.state.globalAlert.type = 'success'
      store.state.globalAlert.message = 'Email successfully confirmed'
    } catch (e) {
      store.state.globalAlert.type = 'error'
      if (e.response.data.email) {
        store.state.globalAlert.message = `Email ${e.response.data.email[0]}`
      } else {
        store.state.globalAlert.message = e.message
      }
    }
  }
}
