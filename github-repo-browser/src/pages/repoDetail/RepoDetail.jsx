import React, { useEffect, useState } from "react";
import { getRepoContent } from "../../services/api";
import { Link, useParams, useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader";
import './RepoDetail.css';

export const RepoDetail = () => {

    const location = useLocation();

    const { repoOwner, repoName, '*':path } = useParams();
    console.log(path)
    const [repoContent, setRepoContent] = useState(null);
    console.log(repoContent)
    useEffect(() => {
        const fetchRepoContent = async () => {
            try {
                const repoContent = await getRepoContent(repoOwner, repoName, path);
                setRepoContent(repoContent);
            } catch(error) {
                console.log(error);
            };
        };

        fetchRepoContent();
    }, [repoOwner, repoName, path]);

    if(repoContent === null) {
        return <Loader/>;
    };

    if(repoContent.message) {
        return <h1>Not Found</h1>
    };

    return(
        <div className="container">
            <h3>{repoName}</h3>
            <div className="row">
                <nav>
                    <div className="nav-wrapper deep-purple darken-1">
                        <div className="col s12">
                            {path.split('/').map((folder, index) => (
                                <Link key={index} to={folder} className="breadcrumb">{folder}</Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
            <div className="row">
                <div className="col s3" style={{'padding':'0'}}>
                    <ul className="collection">
                        {repoContent.map((content, index) => (
                            <li key={index} className="collection-item valign-wrapper"> 
                                {content.type === 'file' ? 
                                    <i className="material-icons circle deep-purple darken-1 collection-icon">description</i> : 
                                    <i className="material-icons circle grey collection-icon">folder</i>
                                }
                                <Link to={`${location.pathname}/${content.name}`} className="title">{content.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col s9">
                    content
                </div>
            </div>
        </div>
    );
};