export async function getHomeData(dataAPI) {
    const fetchedResponse = await fetch(dataAPI);
    if (!fetchedResponse.ok) {
        const message = `An error has occured: ${fetchedResponse.status}`;
        throw new Error(message);
    }
    const convertedFetchedResponse = await fetchedResponse.json();
    return convertedFetchedResponse.data;
}