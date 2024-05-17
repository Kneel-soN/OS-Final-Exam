'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

const DiskSchedulingInput = () => {
    const [cylinderSize, setCylinderSize] = useState(0);
    const [startCylinder, setStartCylinder] = useState(0);
    const [endCylinder, setEndCylinder] = useState(0);
    const [headStartCylinder, setHeadStartCylinder] = useState(0);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [results, setResults] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // FCFS (First-Come-First-Serve) Algorithm
        const fcfs = () => {
            let head = headStartCylinder;
            let totalHeadMovement = 0;
            pendingRequests.forEach(request => {
                totalHeadMovement += Math.abs(request - head);
                head = request;
            });
            return totalHeadMovement;
        };

        // SCAN Algorithm
        const scan = () => {
            let requests = [...pendingRequests];
            let totalHeadMovement = 0;
            let head = headStartCylinder;
            requests.sort((a, b) => a - b);
            let index = requests.findIndex(req => req >= head);

            // Move towards the end
            for (let i = index; i < requests.length; i++) {
                totalHeadMovement += Math.abs(requests[i] - head);
                head = requests[i];
            }

            // Move to the start and then towards the beginning
            if (index > 0) {
                totalHeadMovement += Math.abs(endCylinder - head);
                head = endCylinder;
                for (let i = index - 1; i >= 0; i--) {
                    totalHeadMovement += Math.abs(requests[i] - head);
                    head = requests[i];
                }
            }

            return totalHeadMovement;
        };

        // C-SCAN Algorithm
        const cscan = () => {
            let requests = [...pendingRequests];
            let totalHeadMovement = 0;
            let head = headStartCylinder;
            requests.sort((a, b) => a - b);
            let index = requests.findIndex(req => req >= head);

            // Move towards the end
            for (let i = index; i < requests.length; i++) {
                totalHeadMovement += Math.abs(requests[i] - head);
                head = requests[i];
            }

            // Move to the start and then continue towards the beginning
            totalHeadMovement += Math.abs(endCylinder - head) + Math.abs(endCylinder - startCylinder);
            head = startCylinder;
            for (let i = 0; i < index; i++) {
                totalHeadMovement += Math.abs(requests[i] - head);
                head = requests[i];
            }

            return totalHeadMovement;
        };

        const fcfsResult = fcfs();
        const scanResult = scan();
        const cscanResult = cscan();

        setResults(`FCFS Total Head Movement: ${fcfsResult}\nSCAN Total Head Movement: ${scanResult}\nC-SCAN Total Head Movement: ${cscanResult}`);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Disk Allocation</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', minWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px', width: '100px' }}>
                            Cylinder Size:
                        </label>
                        <Input type="number" value={cylinderSize} onChange={(e) => setCylinderSize(Number(e.target.value))} required />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px', width: '100px' }}>
                            Start Cylinder:
                        </label>
                        <Input type="number" value={startCylinder} onChange={(e) => setStartCylinder(Number(e.target.value))} required />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px', width: '100px' }}>
                            End Cylinder:
                        </label>
                        <Input type="number" value={endCylinder} onChange={(e) => setEndCylinder(Number(e.target.value))} required />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px', width: '100px' }}>
                            Head Start Cylinder:
                        </label>
                        <Input type="number" value={headStartCylinder} onChange={(e) => setHeadStartCylinder(Number(e.target.value))} required />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px', width: '100px' }}>
                            Pending Requests:
                        </label>
                        <textarea
                            placeholder="comma separated"
                            value={pendingRequests.join(',')}
                            onChange={(e) => {
                                try {
                                    const trimmedInput = e.target.value.trim();
                                    const numericArray: any = trimmedInput.split(',').map(Number);
                                    setPendingRequests(numericArray);
                                } catch (error) {
                                    console.error("Error processing pending requests:", error);
                                    setPendingRequests([]);
                                }
                            }}
                            required
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
            {results && <div style={{ whiteSpace: 'pre-wrap', textAlign: 'center', marginTop: '20px' }}>{results}</div>}
        </div>
    );
};

export default DiskSchedulingInput;
