const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return await response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/new`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/validate-token`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};
