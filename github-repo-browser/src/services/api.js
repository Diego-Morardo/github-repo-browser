const API_BASE_URL = 'https://api.github.com';

export const getRepo = async (owner, name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/repos/${owner}/${name}`);
        const repo = await response.json();
        return repo;
    } catch(error) {
        console.error('Error fetching repo: ', error);
        throw error;
    };
};

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