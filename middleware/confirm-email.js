import axios from 'axios'

export default async function({ query, store }) {
  if (query.confirmation_token) {
    const url = `${process.env.baseUrl}/users/confirmation?confirmation_token=${query.confirmation_token}`
    try {
      await axios.get(url)
      store.state.globalAlert = 'Email successfully confirmed'
    } catch (e) {
      if (e.response.data.email) {
        store.state.globalAlert = `Email ${e.response.data.email[0]}`
      } else {
        store.state.globalAlert = e
      }
    }
  }
}
