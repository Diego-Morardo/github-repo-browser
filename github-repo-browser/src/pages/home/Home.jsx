import React, { useState } from "react";
import { getRepo } from "../../services/api";
import { Link } from "react-router-dom";
import './Home.css'

export const Home = () => {

    const [repo, setRepo] = useState(null)

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
            setRepo(repo);
        } catch(error) {
            console.log(error);
        };
    };

    return(
        <div className="container">
            <div className="row">
                <form onSubmit={handleSubmit} className="col s6 offset-s3">
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
                            <label className="active" htmlFor="repoOwner">Owner</label>
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
                            <label className="active" htmlFor="repoName">Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="col s12 btn waves-effect waves-light deep-purple darken-1" type="submit">
                            Search <i className="material-icons right">search</i>
                        </button>
                    </div>
                </form>
            </div>
            {repo && 
                <div className="row">
                    <div className="card col s6 offset-s3">
                        <div className="card-content">
                            <span className="card-title">{repo.name}</span>
                        </div>
                        <div className="card-action">
                            <Link className="deep-purple-text" to={`repo-detail/${repoData.repoOwner}/${repoData.repoName}`}>Detail</Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};