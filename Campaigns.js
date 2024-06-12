import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Campaigns() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            const response = await axios.get('/api/campaigns');
            setCampaigns(response.data);
        };
        fetchCampaigns();
    }, []);

    return (
        <div>
            <h2>Campaigns</h2>
            <ul>
                {campaigns.map(campaign => (
                    <li key={campaign.id}>
                        {campaign.name} - {campaign.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Campaigns;
