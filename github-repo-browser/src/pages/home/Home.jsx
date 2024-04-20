import React, { useEffect, useState } from "react";
import { getRepo } from "../../services/api";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";
import './Home.css'

export const Home = () => {

    useEffect(() => {
        M.updateTextFields();
    }, []);

    const navigate = useNavigate();

    const [fetchingError, setFetchingError] = useState(null)

    const [repoData, setRepoData] = useState({
        repoOwner: '',
        repoName: ''
    });

    const handleInputChange = (event) => {
        setRepoData({
            ...repoData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const repo = await getRepo(repoData.repoOwner, repoData.repoName);

            if(repo.status !== 200) {
                setFetchingError(repo.data);
            } else {
                navigate(`repo-detail/${repoData.repoOwner}/${repoData.repoName}`);
            };
            
        } catch(error) {
            console.error(error);
        };
    };

    return(
        <div className="container">
            <div className="row">
                <form onSubmit={handleSubmit} className="col s12 m10 offset-m1">
                    <h5>Enter Repository Owner and Name</h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <input 
                                type="text" 
                                id="repoOwner"
                                name="repoOwner"
                                className="validate"
                                value={repoData.repoOwner}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="repoOwner">Owner</label>
                        </div>
                        <div className="input-field col s6">
                            <input 
                                type="text" 
                                id="repoName"
                                name="repoName"
                                className="validate"
                                value={repoData.repoName}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="repoName">Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="col s12 btn waves-effect waves-light deep-purple darken-1" type="submit">
                            Search <i className="material-icons right">search</i>
                        </button>
                    </div>
                </form>
            </div>
            {fetchingError && 
                <div className="row">
                    <div className="card col s12 m10 offset-m1">
                        <div className="card-content">
                            <span className="card-title center">{fetchingError.message}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};