import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../styles/LanguageChart.css';

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

const sortLanguages = (languageCounts: LanguageStats) => {
    const sortedEntries = Object.entries(languageCounts).sort(([, a], [, b]) => b - a);
    return Object.fromEntries(sortedEntries);
};

const LanguageChart: React.FC<LanguageChartProps> = ({ username }) => {
    const [barChartData, setBarChartData] = useState<any>(null);
    const [pieChartData, setPieChartData] = useState<any>(null);

    const updateChartData = useCallback(async () => {
        try {
            const languageCounts = await fetchGitHubData(username);
            const sortedLanguageCounts = sortLanguages(languageCounts);
            let totalLines = 0;
            Object.values(sortedLanguageCounts).forEach((count) => totalLines += count as number);

            const barData = {
                labels: Object.keys(sortedLanguageCounts),
                datasets: [
                    {
                        label: 'Lines of Code',
                        data: Object.values(sortedLanguageCounts) as number[],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            };

            const pieData = {
                labels: Object.keys(sortedLanguageCounts),
                datasets: [
                    {
                        label: 'Percentage of Code',
                        data: (Object.values(sortedLanguageCounts) as number[]).map(count => (count / totalLines) * 100),
                        backgroundColor: Object.keys(sortedLanguageCounts).map((_, index) => `hsla(${index * 360 / Object.keys(sortedLanguageCounts).length}, 100%, 50%, 0.6)`),
                    },
                ],
            };

            setBarChartData(barData);
            setPieChartData(pieData);

            const dataToStore = { languageCounts: sortedLanguageCounts, timestamp: Date.now() };
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
                const sortedLanguageCounts = sortLanguages(languageCounts);
                let totalLines = 0;
                (Object.values(sortedLanguageCounts) as number[]).forEach((count: number) => totalLines += count);

                const barData = {
                    labels: Object.keys(sortedLanguageCounts),
                    datasets: [
                        {
                            label: 'Lines of Code',
                            data: Object.values(sortedLanguageCounts) as number[],
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                const pieData = {
                    labels: Object.keys(sortedLanguageCounts),
                    datasets: [
                        {
                            label: 'Percentage of Code',
                            data: (Object.values(sortedLanguageCounts) as number[]).map((count: number) => (count / totalLines) * 100),
                            backgroundColor: Object.keys(sortedLanguageCounts).map((_, index) => `hsla(${index * 360 / Object.keys(sortedLanguageCounts).length}, 100%, 50%, 0.6)`),
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
                <div className="bar-chart-container">
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
                <div className="pie-chart-container">
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
