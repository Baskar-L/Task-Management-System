export const saveAuth = (
  token,
  user
) => {
  localStorage.setItem(
    "token",
    token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
};

export const getStoredToken = () => {
  return localStorage.getItem("token");
};

export const getStoredUser = () => {
  const user =
    localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error(
      "Invalid stored user:",
      error
    );

    localStorage.removeItem("user");

    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};