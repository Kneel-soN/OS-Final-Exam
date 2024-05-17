import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { calculatePositionsAndTotalSeekTime } from "@/app/backpain/diskSA.jsx";
import { Chart as ChartJS } from 'chart.js/auto'; // Import Chart.js auto configuration
import { Chart } from 'react-chartjs-2'; // Import react-chartjs-2
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the necessary components with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const DiskSchedulingInput = () => {
    const [cylinderSize, setCylinderSize] = useState(0);
    const [startCylinder, setStartCylinder] = useState(0);
    const [endCylinder, setEndCylinder] = useState(0);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [headStartCylinder, setHeadStartCylinder] = useState(0); // Added headStartCylinder state
    const [totalSeekTimes, setTotalSeekTimes] = useState({ FCFS: 0, SCAN: 0, CSCAN: 0 });
    const [positions, setPositions] = useState([]);



    const handleSubmit = (e) => {
        e.preventDefault();
        setHeadStartCylinder(headStartCylinder);

        const algorithms = ['FCFS', 'SCAN', 'CSCAN'];
        const results = algorithms.map(algorithm =>
            calculatePositionsAndTotalSeekTime(algorithm, pendingRequests, startCylinder, endCylinder, headStartCylinder)
        );

        // Simplify state updates
        setTotalSeekTimes(results.reduce((acc, result, index) => ({
            ...acc,
            [algorithms[index]]: result.totalSeekTime
        }), {}));
        setPositions(results[0].positions); // Assuming you want to use the positions from the first algorithm
    };

    useEffect(() => {
        if (totalSeekTimes && totalSeekTimes.FCFS !== undefined && totalSeekTimes.SCAN !== undefined && totalSeekTimes.CSCAN !== undefined) {
            console.log(totalSeekTimes.FCFS, totalSeekTimes.SCAN, totalSeekTimes.CSCAN);
        }
    }, [totalSeekTimes]);




    return (
        <form onSubmit= { handleSubmit } >
        <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', minWidth: '300px' } }>
            <div style={ { display: 'flex', alignItems: 'center', marginBottom: '10px' } }>
                <label style={ { marginRight: '10px', width: '100px' } }> {/* Adjusted width for better alignment */ }
            Cylinder Size:
    </label>
        < Input type = "number" value = { cylinderSize } onChange = {(e) => setCylinderSize(e.target.value)} required />
            </div>
            < div style = {{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={ { marginRight: '10px', width: '100px' } }> {/* Adjusted width for better alignment */ }
            Start Cylinder:
</label>
    < Input type = "number" value = { startCylinder } onChange = {(e) => setStartCylinder(e.target.value)} required />
        </div>
        < div style = {{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label style={ { marginRight: '10px', width: '100px' } }> {/* Adjusted width for better alignment */ }
            End Cylinder:
</label>
    < Input type = "number" value = { endCylinder } onChange = {(e) => setEndCylinder(e.target.value)} required />
        </div>
        < div style = {{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label style={ { marginRight: '10px', width: '100px' } }> {/* Adjusted width for better alignment */ }
            Head Start Cylinder:
</label>
    < Input type = "number" value = { headStartCylinder } onChange = {(e) => setHeadStartCylinder(e.target.value)} required />
        </div>
        < div style = {{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label style={ { marginRight: '10px', width: '100px' } }> {/* Adjusted width for better alignment */ }
            Pending Requests:
</label>
    < textarea
placeholder = "comma separated"
value = { pendingRequests.join(',') }
onChange = {(e) => {
    try {
        const trimmedInput = e.target.value.trim(); // Directly trim the input
        const numericArray = trimmedInput.split(',').map(Number);
        setPendingRequests(numericArray);
    } catch (error) {
        console.error("Error processing pending requests:", error);
        // Optionally, reset pendingRequests to an empty array or handle the error differently
        setPendingRequests([]);
    }
}}
required
    />
    </div>
    < /div>
    < div style = {{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button type="submit" > Submit < /Button>
            < /div>
            < p > Total Seek Time FCFS: { totalSeekTimes.FCFS } </p>
                < p > Total Seek Time SCAN: { totalSeekTimes.SCAN } </p>
                    < p > Total Seek Time CSCAN: { totalSeekTimes.CSCAN } </p>
                        < /form>

  );
};

export default DiskSchedulingInput;
