const API_BASE_URL = 'https://api.github.com';

/**
 * Fetch repository information.
 * @param {string} owner - The owner of the repository.
 * @param {string} name - The name of the repository.
 * @returns {Object} - Object that contains the repository information.
 */
export const getRepo = async (owner, name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/repos/${owner}/${name}`);
        const repo = await response.json();
        return {status: response.status, data: repo};
    } catch(error) {
        console.error('Error fetching repo: ', error);
        throw error;
    };
};

/**
 * Fetch repository content.
 * @param {string} owner - The owner of the repository.
 * @param {string} name - The name of the repository.
 * @param {string} path - The path to the content within the repository.
 * @returns {Array} - Array that contains the repository content.
 */
export const getRepoContent = async (owner, name, path) => {
    try {
        const response = await fetch(`${API_BASE_URL}/repos/${owner}/${name}/contents/${path}`);
        const repoContents = await response.json();
        return repoContents;
    } catch(error) {
        console.error('Error fetching repo contents: ', error);
        throw error;
    };
};

/**
 * Fetch a file.
 * @param {string} url - The URL of the file.
 * @returns {Object} - Object that contains the file information.
 */
export const getFile = async (url) => {
    try {
        const response = await fetch(url);
        const responseCopy = response.clone();
        const data = await response.blob();

        const file = {
            type: null,
            data: null
        };

        if(data.type.includes('image')) {
            file.type = 'image';
            file.data = url;
        } else {
            const text = await responseCopy.text();
            file.type = 'text';
            file.data = text;
        };

        return file;
    } catch(error) {
        console.error('Error fetching file: ', error);
    };
};