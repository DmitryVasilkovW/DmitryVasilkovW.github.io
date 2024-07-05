// src/api/github.ts
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = 'your_github_token';

const api = axios.create({
    baseURL: GITHUB_API_URL,
    headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
    }
});

export interface Repository {
    languages_url: string;
}

export interface LanguageStats {
    [key: string]: number;
}

export const getRepos = async (username: string): Promise<Repository[]> => {
    const response = await api.get<Repository[]>(`/users/${username}/repos`);
    return response.data;
};

export const getLanguages = async (username: string): Promise<LanguageStats> => {
    const repos = await getRepos(username);
    const languageStats: LanguageStats = {};

    for (const repo of repos) {
        const { data } = await api.get<LanguageStats>(repo.languages_url);
        for (const [language, count] of Object.entries(data)) {
            if (languageStats[language]) {
                languageStats[language] += count;
            } else {
                languageStats[language] = count;
            }
        }
    }
    return languageStats;
};
