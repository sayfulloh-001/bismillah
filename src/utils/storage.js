const API_URL = 'http://localhost:5000/api';

// Specialists (Freelancers)
export const getFreelancers = async () => {
  try {
    const res = await fetch(`${API_URL}/freelancers`);
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error fetching freelancers from server:", e);
    return [];
  }
};

export const addFreelancer = async (freelancer) => {
  try {
    const res = await fetch(`${API_URL}/freelancers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(freelancer)
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error adding freelancer on server:", e);
    return null;
  }
};

export const updateFreelancer = async (freelancer) => {
  try {
    const res = await fetch(`${API_URL}/freelancers/${freelancer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(freelancer)
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error updating freelancer on server:", e);
    return null;
  }
};

export const deleteFreelancer = async (id) => {
  try {
    const res = await fetch(`${API_URL}/freelancers/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error deleting freelancer on server:", e);
    return null;
  }
};

// Startup Requests
export const getRequests = async () => {
  try {
    const res = await fetch(`${API_URL}/requests`);
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error fetching requests from server:", e);
    return [];
  }
};

export const addRequest = async (request) => {
  try {
    const res = await fetch(`${API_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error adding request on server:", e);
    return null;
  }
};

export const updateRequestStatus = async (id, status) => {
  try {
    const res = await fetch(`${API_URL}/requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error updating request status on server:", e);
    return null;
  }
};

export const deleteRequest = async (id) => {
  try {
    const res = await fetch(`${API_URL}/requests/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error deleting request on server:", e);
    return null;
  }
};

// Visitors Count
export const getVisitorCount = async () => {
  try {
    const res = await fetch(`${API_URL}/visitors`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data.visitors.toString();
  } catch (e) {
    console.error("Error getting visitor count from server:", e);
    return "1428";
  }
};

export const incrementVisitorCount = async (amount = 1) => {
  try {
    const res = await fetch(`${API_URL}/visitors/increment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data.visitors.toString();
  } catch (e) {
    console.error("Error incrementing visitor count on server:", e);
    return "1428";
  }
};

// Favorites (Client-side specific)
export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('fl_hub_favorites') || '[]');
  } catch (e) {
    return [];
  }
};

export const toggleFavorite = (id) => {
  try {
    const favorites = getFavorites();
    const index = favorites.indexOf(id);
    if (index === -1) {
      favorites.push(id);
    } else {
      favorites.splice(index, 1);
    }
    localStorage.setItem('fl_hub_favorites', JSON.stringify(favorites));
    return favorites;
  } catch (e) {
    console.error("Error toggling favorites locally:", e);
    return [];
  }
};

export const isFavorite = (id) => {
  return getFavorites().includes(id);
};
