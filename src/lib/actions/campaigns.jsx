"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const createCampaing = async (newCampaingData) => {
    // Ensure we don't have double slashes if baseUrl has a trailing slash
    const url = baseUrl.endsWith('/') ? `${baseUrl}newCampaign` : `${baseUrl}/newCampaign`;
    
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCampaingData),
    });

    if (!res.ok) {
        // Log the text so we know what actually failed instead of a blind JSON parse error
        const text = await res.text();
        console.error("Server error response:", text);
        throw new Error(`Failed to create campaign. Server returned status ${res.status}`);
    }

    return res.json();
}

export const getAllCampaigns = async () => {
    const url = baseUrl.endsWith('/') ? `${baseUrl}campaigns` : `${baseUrl}/campaigns`;
    
    // next: { revalidate: 0 } ensures the data is fetched fresh
    const res = await fetch(url, { next: { revalidate: 0 } });

    if (!res.ok) {
        throw new Error(`Failed to fetch campaigns. Server returned status ${res.status}`);
    }

    return res.json();
}

export const getCampaignById = async (id) => {
    const url = baseUrl.endsWith('/') ? `${baseUrl}campaigns/${id}` : `${baseUrl}/campaigns/${id}`;
    
    const res = await fetch(url, { next: { revalidate: 0 } });

    if (!res.ok) {
        throw new Error(`Failed to fetch campaign details. Server returned status ${res.status}`);
    }

    return res.json();
}