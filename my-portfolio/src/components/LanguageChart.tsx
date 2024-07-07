import React, { useEffect, useState, useCallback } from 'react';
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

const fetchGitHubData = async (username: string): Promise<LanguageStats> => {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repos = response.data;

    const languageCounts: LanguageStats = {};
    for (const repo of repos) {
        // Игнорировать форки
        if (repo.fork) {
            continue;
        }

        const languageResponse = await axios.get(repo.languages_url);
        const languages: Record<string, number> = languageResponse.data;

        for (const [language, count] of Object.entries(languages)) {
            if (language !== 'Jupyter Notebook') {
                languageCounts[language] = (languageCounts[language] || 0) + (count as number);
            }
        }
    }
    return languageCounts;
};

const LanguageChart: React.FC<LanguageChartProps> = ({ username }) => {
    const [barChartData, setBarChartData] = useState<any>(null);
    const [pieChartData, setPieChartData] = useState<any>(null);

    const updateChartData = useCallback(async () => {
        try {
            const languageCounts = await fetchGitHubData(username);
            let totalLines = 0;
            Object.values(languageCounts).forEach((count) => totalLines += count as number);

            const barData = {
                labels: Object.keys(languageCounts),
                datasets: [
                    {
                        label: 'Lines of Code',
                        data: Object.values(languageCounts) as number[],
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
                        data: (Object.values(languageCounts) as number[]).map(count => (count / totalLines) * 100),
                        backgroundColor: Object.keys(languageCounts).map((_, index) => `hsla(${index * 360 / Object.keys(languageCounts).length}, 100%, 50%, 0.6)`),
                    },
                ],
            };

            setBarChartData(barData);
            setPieChartData(pieData);

            const dataToStore = { languageCounts, timestamp: Date.now() };
            localStorage.setItem(`github_data_${username}`, JSON.stringify(dataToStore));
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }, [username]);

    useEffect(() => {
        const storedData = localStorage.getItem(`github_data_${username}`);
        if (storedData) {
            const { languageCounts, timestamp } = JSON.parse(storedData);
            const now = Date.now();
            const age = (now - timestamp) / 1000; // age in seconds
            const isValid = age < 8 * 60 * 60; // 8 hours

            if (isValid) {
                let totalLines = 0;
                (Object.values(languageCounts) as number[]).forEach((count: number) => totalLines += count);

                const barData = {
                    labels: Object.keys(languageCounts),
                    datasets: [
                        {
                            label: 'Lines of Code',
                            data: Object.values(languageCounts) as number[],
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
                            data: (Object.values(languageCounts) as number[]).map((count: number) => (count / totalLines) * 100),
                            backgroundColor: Object.keys(languageCounts).map((_, index) => `hsla(${index * 360 / Object.keys(languageCounts).length}, 100%, 50%, 0.6)`),
                        },
                    ],
                };

                setBarChartData(barData);
                setPieChartData(pieData);
            } else {
                updateChartData();
            }
        } else {
            updateChartData();
        }

        const intervalId = setInterval(() => {
            updateChartData();
        }, 8 * 60 * 60 * 1000); // 8 hours

        return () => clearInterval(intervalId);
    }, [username, updateChartData]);

    return (
        <div>
            {barChartData && (
                <div style={{ width: '1200px', height: '600px', marginBottom: '100px' }}>
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
