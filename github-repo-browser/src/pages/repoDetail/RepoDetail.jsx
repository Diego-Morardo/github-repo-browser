import React, { useEffect, useState } from "react";
import { getRepoContent, getFile } from "../../services/api";
import { Link, useParams, useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader";
import './RepoDetail.css';

const sortContentByType = (content) => {
    const directories = content.filter(item => item.type === 'dir');
    const files = content.filter(item => item.type === 'file');

    return [...directories, ...files];
};

export const RepoDetail = () => {

    const location = useLocation();

    const { repoOwner, repoName, '*':path } = useParams();

    const [repoContent, setRepoContent] = useState(null);

    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchRepoContent = async () => {
            try {
                const repoContent = await getRepoContent(repoOwner, repoName, path);

                if(Array.isArray(repoContent)) {
                    const sortedRepoContent = sortContentByType(repoContent);
                    setRepoContent(sortedRepoContent);
                } else {
                    const file = await getFile(repoContent.download_url);
                    setRepoContent(repoContent);
                    setFile(file);
                };

            } catch(error) {
                console.error(error);
            };
        };

        fetchRepoContent();
    }, [repoOwner, repoName, path]);

    if(repoContent === null) {
        return <Loader/>;
    };

    if(repoContent.message) {
        return(
            <div className="card col s10 offset-s1">
                <div className="card-content">
                    <span className="card-title center">{repoContent.message}</span>
                </div>
            </div>
        );
    };

    return(
        <div className="repo-detail container">
            <h3>{repoName}</h3>
            <div className="row" style={{'margin':'0'}}>
                <nav>
                    <div className="nav-wrapper deep-purple darken-1">
                        <div className="col s12">
                            <Link to={'.'} className="breadcrumb">/</Link>
                            {path.split('/').map((folder, index) => (
                                <Link key={index} to={path.split('/').slice(0, index+1).join('/')} className="breadcrumb">{folder}</Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
            <div className="repo-content row">
                <div className="content-list col s3">
                    <ul className="collection">
                        {Array.isArray(repoContent) ? repoContent.map((content, index) => (
                            <li key={index} className="collection-item valign-wrapper"> 
                                {content.type === 'file' ? 
                                    <i className="material-icons circle deep-purple darken-1 collection-icon">description</i> : 
                                    <i className="material-icons circle grey collection-icon">folder</i>
                                }
                                <Link to={`${location.pathname}/${content.name}`} className="title">{content.name}</Link>
                            </li>
                        )) :
                            <li className="collection-item valign-wrapper"> 
                                <i className="material-icons circle deep-purple darken-1 collection-icon">description</i>
                                <Link disabled className="title">{repoContent.name}</Link>
                            </li>
                        }
                    </ul>
                </div>
                <div className="file-content col s9">
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