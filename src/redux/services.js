
export const getAccessTokenService = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json();
}
export const getUserIdService = async (url = '',token) => {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json",
      "Accept": "application/json",
    }
  });
  return response.json();
}

export const getAllTaskService = async (url = '',token) => {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json",
      "Accept": "application/json",
    }
  });
  return response.json();
}
export const addNewTaskService = async (url = '', data = {},token) => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json();
}
export const updateTaskService = async (url = '', data = {},token) => {
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json();
}
export const deleteTaskService = async (url = '',token) => {
  const response = await fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json",
      "Accept": "application/json",
    },
    body: {} // body data type must match "Content-Type" header
  });
  return response.json();
}