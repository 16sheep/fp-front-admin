import {getCurrentUser} from './adapter/adapter.js'

export const validatePassword = (a, b) => a === b

export const postAuth = (data) => {
  if (data.error) {
    alert(data.error)
  } else {
    localStorage.setItem('token', data.token)
    console.log("postAuthreturn", updateCurrentUser(data.token))
    return data.user
  }
}

const updateCurrentUser = (token, dispatch) => {
  getCurrentUser(token).then(data => {
    if (data.error) {
      console.log(" in error getCurrentUser data", data)
      dispatch({type:"LOG_OUT"})
    } else {
        console.log("in success getCurrentUser data", data)
        return data
    }
  })
}
