export const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status}`, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    return await response.json();
}