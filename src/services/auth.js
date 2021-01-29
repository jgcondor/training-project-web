const apiUrl = 'http://localhost:4000/graphql';

const request = async query => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  return await request(
    `mutation {
      login(input: {
        email: "${email}"
        password: "${password}"
      }) {
        name
        email
        token
      }
    }`
  );
};

export const register = async (name, email, password) => {
  return await request(
    `mutation {
      register(input: {
        name: "${name}"
        email: "${email}"
        password: "${password}"
      }) {
        name
        email
        token
      }
    }`
  );
};
