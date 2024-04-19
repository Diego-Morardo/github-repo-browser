// const API_BASE_URL = 'https://developer.github.com/v3';
const API_BASE_URL = 'https://api.github.com';

export const getRepo = async (owner, name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/repos/${owner}/${name}`);
        const repo = await response.json();
        
        // const repoContents = await getRepoContent(repo.full_name);

        // const completeRepo = {
        //     name: name,
        //     owner: owner,
        //     content: repoContents
        // };
        
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