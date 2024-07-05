import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface LanguageStats {
    [language: string]: number;
}

interface LanguageChartProps {
    username: string;
}

const LanguageChart: React.FC<LanguageChartProps> = ({ username }) => {
    const [barChartData, setBarChartData] = useState<any>(null);
    const [pieChartData, setPieChartData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${username}/repos`);
                const repos = response.data;

                const languageCounts: LanguageStats = {};
                let totalLines = 0;

                for (const repo of repos) {
                    const languageResponse = await axios.get(repo.languages_url);
                    const languages: Record<string, number> = languageResponse.data;

                    for (const [language, count] of Object.entries(languages)) {
                        languageCounts[language] = (languageCounts[language] || 0) + count;
                        totalLines += count;
                    }
                }

                // Create chart data including all languages mentioned in repositories
                const barData = {
                    labels: Object.keys(languageCounts),
                    datasets: [
                        {
                            label: 'Lines of Code',
                            data: Object.values(languageCounts),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                const pieData = {
                    labels: Object.keys(languageCounts),
                    datasets: [
                        {
                            label: 'Percentage of Code',
                            data: Object.values(languageCounts).map(count => (count / totalLines) * 100),
                            backgroundColor: Object.keys(languageCounts).map((_, index) => `hsla(${index * 360 / Object.keys(languageCounts).length}, 100%, 50%, 0.6)`),
                        },
                    ],
                };

                setBarChartData(barData);
                setPieChartData(pieData);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [username]);

    return (
        <div>
            {barChartData && (
                <div style={{ width: '100%', height: '600px', marginBottom: '100px' }}>
                    <Bar
                        data={barChartData}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    ticks: {
                                        autoSkip: false,
                                        maxRotation: 90,
                                        minRotation: 45,
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
            )}
            {pieChartData && (
                <div style={{ width: '100%', height: '600px', marginBottom: '20px' }}>
                    <Pie
                        data={pieChartData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                    labels: {
                                        boxWidth: 10,
                                        padding: 20,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default LanguageChart;
