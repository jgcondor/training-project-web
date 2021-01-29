const apiUrl = 'http://localhost:4000/graphql';

const request = async query => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query })
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getSchedules = async () => {
  return await request(
    `query {
      getSchedules {
        id
        title
        category
        dueDateClass
        start
        end
        isReadOnly
      }
    }`
  );
};

export const addSchedule = async ({
  title,
  dueDateClass,
  start,
  end,
  isReadOnly
}) => {
  return await request(
    `mutation {
      addSchedule(input: {
        title: "${title}"
        category: "time"
        dueDateClass: "${dueDateClass || ''}"
        start: "${start.toDate()}"
        end: "${end.toDate()}"
        isReadOnly: ${isReadOnly || false}
      })
    }`
  );
};

export const updateSchedule = async (
  schedule,
  { title, dueDateClass, start, end, isReadOnly }
) => {
  return await request(
    `mutation {
      updateSchedule(input: {
        id: "${schedule.id}"
        title: "${title || schedule.title}"
        category: "time"
        dueDateClass: "${dueDateClass || schedule.dueDateClass}"
        start: "${start ? start.toDate() : schedule.start.toDate()}"
        end: "${end ? end.toDate() : schedule.end.toDate()}"
        isReadOnly: ${isReadOnly || schedule.isReadOnly}
      })
    }`
  );
};

export const deleteSchedule = async ({ id }) => {
  return await request(
    `mutation {
      deleteSchedule(id: "${id}")
    }`
  );
};
