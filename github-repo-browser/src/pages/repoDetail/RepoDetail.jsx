import React, { useEffect, useState } from "react";
import { getRepoContent, getFile } from "../../services/api";
import { Link, useParams, useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader";
import './RepoDetail.css';

export const RepoDetail = () => {

    const location = useLocation();

    const { repoOwner, repoName, '*':path } = useParams();

    const [repoContent, setRepoContent] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchRepoContent = async () => {
            try {
                const repoContent = await getRepoContent(repoOwner, repoName, path);
                setRepoContent(repoContent);

                if(!Array.isArray(repoContent)) {
                    const file = await getFile(repoContent.download_url);
                    setFile(file);
                };

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
                                <Link key={index} to={path.split('/').slice(0, index+1).join('/')} className="breadcrumb">{folder}</Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
            <div className="row">
                <div className="col s3" style={{'padding':'0'}}>
                    <ul className="collection">
                        {Array.isArray(repoContent) && repoContent.map((content, index) => (
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
                    {!Array.isArray(repoContent) &&
                        <>
                            {file === null ? <Loader/> :
                            file.type === 'image' ? <img src={file.data} alt={repoContent.name} /> :
                            <p className="flow-text">{file.data}</p>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
};