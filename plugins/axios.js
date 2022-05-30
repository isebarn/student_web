export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    if (config.method !== 'get' && config.url.startsWith('api/')) {
      app.store._actions.setLoading[0]()
    }
  })

  $axios.onResponse((config) => {
    if (config.status === 200) {
      app.store._actions.setSuccess[0]()
      setTimeout(() => {
        app.store._actions.setDone[0]()
      }, 2000)
    } else {
      app.store._actions.setDone[0]()
    }
  })

  $axios.onError((error) => {
    parseInt(error.response && error.response.status)
    app.store._actions.setDone[0]()
  })
}
