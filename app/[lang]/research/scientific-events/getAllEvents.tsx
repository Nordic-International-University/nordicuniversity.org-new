const getAllEvents = async (
  lang: string,
  type: string,
  page: number,
  limit: number,
  time: string,
) => {
  try {
    const queryParams = `type=${type}&language=${lang}&page=${page}&limit=${limit}&timeFilter=${time}`;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/science/meeting?${queryParams}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export { getAllEvents };
