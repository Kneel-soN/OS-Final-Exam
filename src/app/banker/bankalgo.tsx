'use client'
import React, { useState } from 'react';

type Process = {
    pid: number;
    max: number[];
    allot: number[];
};

type Resource = {
    rid: string;
    count: number;
};

const BankersAlgorithmForm: React.FC = () => {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [maxInput, setMaxInput] = useState('');
    const [allocInput, setAllocInput] = useState('');
    const [availInput, setAvailInput] = useState('');
    const [safeSequence, setSafeSequence] = useState<number[]>([]);

    const handleAddProcess = () => {
        const maxArray = maxInput.split(',').map(Number);
        const allotArray = allocInput.split(',').map(Number);

        if (maxArray.length !== allotArray.length || maxArray.length !== resources.length) {
            alert('The number of resources in Max Need and Allocated Resources must match the number of available resources.');
            return;
        }

        const pid = processes.length;

        setProcesses([...processes, { pid, max: maxArray, allot: allotArray }]);
        setMaxInput('');
        setAllocInput('');
    };

    const handleSetResources = () => {
        const resourceArray = availInput.split(',').map((count, index) => ({ rid: `R${index}`, count: Number(count) }));
        setResources(resourceArray);
        setAvailInput('');
    };

    const checkSafeState = () => {
        const available: Record<string, number> = resources.reduce((acc, curr) => {
            acc[curr.rid] = curr.count;
            return acc;
        }, {} as Record<string, number>);

        const needMatrix = processes.map(process => {
            const need = process.max.map((max, index) => max - process.allot[index]);
            return { pid: process.pid, need };
        });

        const canExecute = (need: number[], available: Record<string, number>): boolean => {
            return need.every((value, index) => {
                const resourceId = resources[index].rid;
                return value <= available[resourceId];
            });
        };

        const safeSequence: number[] = [];
        const executed = new Array(processes.length).fill(false);

        const findSafeSequence = () => {
            let processExecutedInThisRound = false;
            for (let i = 0; i < processes.length; i++) {
                if (!executed[i] && canExecute(needMatrix[i].need, available)) {
                    processes[i].allot.forEach((allot, index) => {
                        const resourceId = resources[index].rid;
                        available[resourceId] += allot;
                    });
                    safeSequence.push(processes[i].pid);
                    executed[i] = true;
                    processExecutedInThisRound = true;
                }
            }
            return processExecutedInThisRound;
        };

        while (findSafeSequence());

        const isSafe = executed.every(v => v);

        console.log(`System is ${isSafe ? '' : 'not '}in a safe state.`);
        if (isSafe) {
            setSafeSequence([...safeSequence]);
        } else {
            setSafeSequence([]);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Banker&apos;s Algorithm Simulation
            </h1>
            <form style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Available</label>
                    <input
                        type="text"
                        value={availInput}
                        onChange={(e) => setAvailInput(e.target.value)}
                        style={{ width: '300px', padding: '5px' }}
                        placeholder="Enter available resources (comma-separated)"
                    />
                    <button type="button" onClick={handleSetResources} style={{ padding: '8px 16px', marginLeft: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Set Resources</button>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Max Need</label>
                    <input
                        type="text"
                        value={maxInput}
                        onChange={(e) => setMaxInput(e.target.value)}
                        style={{ width: '300px', padding: '5px' }}
                        placeholder="Enter Max Need (comma-separated)"
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px' }}>Allocation</label>
                    <input
                        type="text"
                        value={allocInput}
                        onChange={(e) => setAllocInput(e.target.value)}
                        style={{ width: '300px', padding: '5px' }}
                        placeholder="Enter allocated resources (comma-separated)"
                    />
                    <button type="button" onClick={handleAddProcess} style={{ padding: '8px 16px', marginLeft: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Process</button>
                </div>
                <button type="button" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={checkSafeState}>Check Safety</button>
            </form>

            <div>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Processes</h2>
                <ul>
                    {processes.map(process => (
                        <li key={process.pid}>
                            <strong>Process {process.pid}:</strong> Max: {process.max.join(', ')} | Alloc: {process.allot.join(', ')}
                        </li>
                    ))}
                </ul>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Safe Sequence</h2>
                {safeSequence.length > 0 ? (
                    <p>{safeSequence.map(pid => `P${pid}`).join(' -> ')}</p>

                ) : (
                    <p>No safe sequence found.</p>
                )}
            </div>
        </div>
    );
};

export default BankersAlgorithmForm;
