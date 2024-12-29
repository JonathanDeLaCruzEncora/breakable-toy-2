const fetchData = async (url: string, accessToken: string) => {
  const response = await fetch(`http://localhost:8080${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error fetching data from ${url}: ${response.status} - ${errorText}`
    );
  }

  return await response.json();
};

export default fetchData;
