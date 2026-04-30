export const getEmployees = () => {
  const data = localStorage.getItem("employees");
  return data ? JSON.parse(data) : [];
};

export const saveEmployees = (employees) => {
  localStorage.setItem("employees", JSON.stringify(employees));
};

export const getUser = () => {
  const data = localStorage.getItem("authUser");
  return data ? JSON.parse(data) : null;
};

export const saveUser = (user) => {
  localStorage.setItem("authUser", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("authUser");
};

export const getActivities = () => {
  const data = localStorage.getItem("activities");
  return data ? JSON.parse(data) : [];
};

export const logActivity = (message) => {
  const activities = getActivities();
  const newEntry = {
    id: Date.now(),
    message,
    time: new Date().toLocaleString(),
  };
  const updated = [newEntry, ...activities].slice(0, 20);
  localStorage.setItem("activities", JSON.stringify(updated));
};