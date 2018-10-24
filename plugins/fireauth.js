import { auth } from '@/services/fireinit.js'

export default async (context) => {
  const {store} = context
  if(process.server && store.state.loadingFinish){
      store.dispatch('setLoadingFinish', false)
  }
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      store.dispatch('auth/setUser', user)
      resolve()
    })
  })
}
