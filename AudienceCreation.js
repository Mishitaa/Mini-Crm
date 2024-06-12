import React, { useState } from 'react';
import axios from 'axios';

function AudienceCreation() {
    const [rules, setRules] = useState([]);
    const [audienceSize, setAudienceSize] = useState(0);

    const addRule = () => {
        setRules([...rules, { field: '', operator: '', value: '' }]);
    };

    const updateRule = (index, key, value) => {
        const newRules = rules.map((rule, i) => i === index ? { ...rule, [key]: value } : rule);
        setRules(newRules);
    };

    const checkAudienceSize = async () => {
        const response = await axios.post('/api/check-audience-size', { rules });
        setAudienceSize(response.data.size);
    };

    const saveAudience = async () => {
        await axios.post('/api/save-audience', { rules });
        // Redirect to campaigns page
    };

    return (
        <div>
            <h2>Create Audience</h2>
            {rules.map((rule, index) => (
                <div key={index}>
                    <select onChange={e => updateRule(index, 'field', e.target.value)}>
                        <option value="">Select Field</option>
                        <option value="total_spends">Total Spends</option>
                        <option value="max_visits">Max Visits</option>
                        <option value="last_visit">Last Visit</option>
                    </select>
                    <select onChange={e => updateRule(index, 'operator', e.target.value)}>
                        <option value="">Select Operator</option>
                        <option value=">"> {'>'} </option>
                        <option value="<"> {'<'} </option>
                        <option value="=">=</option>
                    </select>
                    <input type="text" onChange={e => updateRule(index, 'value', e.target.value)} />
                </div>
            ))}
            <button onClick={addRule}>Add Rule</button>
            <button onClick={checkAudienceSize}>Check Audience Size</button>
            <button onClick={saveAudience}>Save Audience</button>
            <p>Audience Size: {audienceSize}</p>
        </div>
    );
}

export default AudienceCreation;
