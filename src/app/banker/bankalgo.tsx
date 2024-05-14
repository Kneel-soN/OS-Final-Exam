'use client'
'use client'
import React, { useState, useEffect } from 'react';

const BankersAlgorithmForm = () => {
    // State variables for available resources, maximum demand, allocated resources, and need
    const [availableResources, setAvailableResources] = useState([]);
    const [maxDemand, setMaxDemand] = useState([]);
    const [allocatedResources, setAllocatedResources] = useState([]);
    const [need, setNeed] = useState([]);
    const [isSafe, setIsSafe] = useState(null); // Initially null until safety check is performed

    // Function to calculate the remaining need for each process
    const calculateNeed = () => {
        const newNeed = [];
        for (let i = 0; i < maxDemand.length; i++) {
            const allocated = allocatedResources[i] ? allocatedResources[i].split(',').map(Number) : [];
            const max = maxDemand[i].split(',').map(Number);
            const needForProcess = max.map((m, j) => m - (allocated[j] || 0));
            newNeed.push(needForProcess);
        }
        setNeed(newNeed);
    };

    // Function to perform the safety check
    const performSafetyCheck = () => {
        calculateNeed();
        let needArray = need.map(n => [...n]);
        let available = [...availableResources];
        let finish = new Array(maxDemand.length).fill(false);
        let work = [...available];

        while (true) {
            let found = false;
            for (let i = 0; i < needArray.length; i++) {
                if (!finish[i] && needArray[i].every((n, j) => n <= work[j])) {
                    work = work.map((w, j) => w + needArray[i][j]);
                    finish[i] = true;
                    found = true;
                    break;
                }
            }
            if (!found) break;
        }

        setIsSafe(!finish.includes(false));
    };

    useEffect(() => {
        if (maxDemand.length > 0 && allocatedResources.length > 0) {
            calculateNeed();
        }
    }, [maxDemand, allocatedResources]);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Banker's Algorithm Simulation</h1>
            <form style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Available Resources</label>
                    <input
                        type="text"
                        style={{ width: '300px', padding: '5px' }}
                        placeholder="Enter available resources (comma-separated)"
                        value={availableResources.join(',')}
                        onChange={(e) => setAvailableResources(e.target.value.split(','))}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Maximum Demand</label>
                    <input
                        type="text"
                        style={{ width: '300px', padding: '5px' }}
                        placeholder="Enter maximum demand (comma-separated)"
                        value={maxDemand.join(',')}
                        onChange={(e) => setMaxDemand(e.target.value.split(','))}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px' }}>Allocated Resources</label>
                    <input
                        type="text"
                        style={{ width: '300px', padding: '5px' }}
                        placeholder="Enter allocated resources (comma-separated)"
                        value={allocatedResources.join(',')}
                        onChange={(e) => setAllocatedResources(e.target.value.split(','))}
                    />
                </div>
                <button type="button" onClick={performSafetyCheck} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Check Safety</button>
                {isSafe !== null && (isSafe ? <p style={{ color: 'green', marginTop: '10px' }}>The system is in a safe state.</p> : <p style={{ color: 'red', marginTop: '10px' }}>The system is not in a safe state.</p>)}
            </form>

            {/* Display Banker's Algorithm state */}
            <div>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Banker's Algorithm State</h2>
                {maxDemand.map((max, index) => (
                    <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
                        <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Process {index}</p>
                        <p>Maximum Demand: {max}</p>
                        <p>Allocated Resources: {allocatedResources[index] || '-'}</p>
                        <p>Remaining Need: {need[index] ? need[index].join(', ') : '-'}</p>
                        <p>Finished: {isSafe !== null ? (isSafe ? "Yes" : "No") : "-"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BankersAlgorithmForm;
