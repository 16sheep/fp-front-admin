const urlBase = `http://localhost:3006/api/v1`

const createUser = (userDetails) => {
  return fetch(`${urlBase}/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userDetails)
  }).then(resp => resp.json())
}

const updateFestival = (festivalDetails) => {
  return fetch(`${urlBase}/festivals/${festivalDetails.id.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(festivalDetails)
  }).then(resp => resp.json())
}

const destroyFestival = (details) => {
  return fetch(`${urlBase}/festivals/${details.id.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify(details)
  }).then(resp => resp.json())
}

const createFestival = (festivalDetails) => {
  return fetch(`${urlBase}/festivals`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    method: 'POST',
    body: JSON.stringify(festivalDetails)
  }).then(resp => resp.json())
}

const loginUser = (userDetails) => {
  return fetch(`${urlBase}/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userDetails)
  }).then(resp => resp.json())
}

const getCurrentUser = (token) => {
  return fetch(`${urlBase}/current_user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
  }).then(resp => resp.json())
}

const getUserFestivals = (id) => {
  return fetch(`${urlBase}/users/${id}/managedfestivals`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }).then(resp => resp.json())
}
//EVENTS//

const getFestivalEvents = (id) => {
  return fetch(`${urlBase}/festival_events/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }).then(resp => resp.json())
}

const createEvent = (eventDetails) => {
  return fetch(`${urlBase}/events`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    method: 'POST',
    body: JSON.stringify(eventDetails)
  }).then(resp => resp.json())
}

const updateEvent = (eventDetails) => {
  return fetch(`${urlBase}/events/${eventDetails.event_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    method: 'PATCH',
    body: JSON.stringify(eventDetails)
  }).then(resp => resp.json())
}

const destroyEvent = (details) => {
  return fetch(`${urlBase}/events/${details.event_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    method: 'DELETE',
    body: JSON.stringify(details)
  }).then(resp => resp.json())
}


//AREAS
const getFestivalAreas = (id) => {
  return fetch(`${urlBase}/festival_areas/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }).then(resp => resp.json())
}

const createArea = (areaDetails) => {
  return fetch(`${urlBase}/areas`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    method: 'POST',
    body: JSON.stringify(areaDetails)
  }).then(resp => resp.json())
}

const updateArea = (areaDetails) => {
  return fetch(`${urlBase}/areas/${areaDetails.area_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    method: 'PATCH',
    body: JSON.stringify(areaDetails)
  }).then(resp => resp.json())
}

const destroyArea = (details) => {
  return fetch(`${urlBase}/areas/${details.area_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    method: 'DELETE',
    body: JSON.stringify(details)
  }).then(resp => resp.json())
}



export {
  createUser,
  loginUser,
  getCurrentUser,
  getUserFestivals,
  createFestival,
  updateFestival,
  destroyFestival,
  createEvent,
  updateEvent,
  destroyEvent,
  getFestivalEvents,
  createArea,
  updateArea,
  getFestivalAreas,
  destroyArea
}
