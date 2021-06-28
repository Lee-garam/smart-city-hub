import React, { useState, useEffect } from 'react'
import { NoticeBoard, CardBoard } from '../components'
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ArchiveIcon from '@material-ui/icons/Archive';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BookIcon from '@material-ui/icons/Book';
import { Paper, ButtonBase, Grid, Modal, Typography } from '@material-ui/core'
import 'react-slideshow-image/dist/styles.css'
import getArchives from "../shared/Archives.js";
import './Home.scss'
import { useHistory } from 'react-router-dom';

import bannerImage from "../images/banner.svg";
import noticeIcon from "../images/menu-icons/notice.svg";
import issuePaperIcon from "../images/menu-icons/issue-paper.svg";
import smartNews from "../images/menu-icons/smart-news.svg";
import smartCityHub from "../images/menu-icons/smart-city-hub.svg";
import archiveIcon from "../images/menu-icons/archive.svg";
import sitesIcon from "../images/menu-icons/sites.svg";

export default function Home() {
    const [archOpen, setArchOpen] = useState(false);
    const history = useHistory();

    const archMenu = getArchives();

    // useEffect(() => {
    //     function extractSrc(html) {
    //         const tempElement = document.createElement("div");
    //         tempElement.innerHTML = html;
    //         return tempElement.querySelector("img").getAttribute("src");
    //     }

    //     getArticles(1, 6, undefined, "[.\r\n]*<img.*src.*>[.\r\n]*", undefined, undefined)
    //         .then((res) => {
    //             const newSlides = [];
    //             res.forEach(element => {
    //                 const src = extractSrc(element.contents);
    //                 newSlides.push((
    //                     <div className="campus-slide">
    //                         <div style={{ 'backgroundImage': `url(${src})` }}>
    //                             <div className="white-filter">
    //                                 <span style={{ 'color': `#ffffff` }}>
    //                                     {element.title}
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ));
    //             });
    //             setSlides(newSlides);
    //         })
    // }, [])

    function viewArchive() {
        setArchOpen(true);
    }

    const getRedirector = (path) => () => {
        history.push(path);
    }

    return (
        <React.Fragment>
            <div className="slide-container">
                <div className="campus-slide">
                    <div className="menu-root">
                        <div className="menu-board">
                            <div className="menu-table">
                                <div className="menu-row">
                                    <div className="menu-cell">
                                        <Paper className="menu-paper">
                                            <ButtonBase className="menu-button" onClick={getRedirector("/news/notices")}>
                                                <Grid container direction="column" justify="center" alignItems="center">
                                                    <img className="menu-icon" src={noticeIcon}></img>
                                                    <Typography gutterBottom variant="subtitle2">공지사항</Typography>
                                                </Grid>
                                            </ButtonBase>
                                        </Paper>
                                    </div>
                                    <div className="menu-cell">
                                        <Paper className="menu-paper">
                                            <ButtonBase className="menu-button" onClick={getRedirector("/publish/issue-paper")}>
                                                <Grid container direction="column" justify="center" alignItems="center">
                                                    <img className="menu-icon" src={issuePaperIcon}></img>
                                                    <Typography gutterBottom variant="subtitle2">Issue Paper</Typography>
                                                </Grid>
                                            </ButtonBase>
                                        </Paper>
                                    </div>
                                    <div className="menu-cell">
                                        <Paper className="menu-paper">
                                            <ButtonBase className="menu-button" onClick={getRedirector("/news/smart-news")}>
                                                <Grid container direction="column" justify="center" alignItems="center">
                                                    <img className="menu-icon" src={smartNews}></img>
                                                    <Typography gutterBottom variant="subtitle2">스마트뉴스</Typography>
                                                </Grid>
                                            </ButtonBase>
                                        </Paper>
                                    </div>
                                </div>
                                <div className="menu-row">
                                    <div className="menu-cell">
                                        <Paper className="menu-paper">
                                            <ButtonBase className="menu-button" onClick={getRedirector("/hub")}>
                                                <Grid container direction="column" justify="center" alignItems="center">
                                                    <img className="menu-icon" src={smartCityHub}></img>
                                                    <Typography gutterBottom variant="subtitle2">스마트도시수출</Typography>
                                                    <Typography gutterBottom variant="subtitle2">거점HUB</Typography>
                                                </Grid>
                                            </ButtonBase>
                                        </Paper>
                                    </div>
                                    <div className="menu-cell">
                                        <Paper className="menu-paper">
                                            <ButtonBase className="menu-button" onClick={getRedirector("/publish/archive")}>
                                                <Grid container direction="column" justify="center" alignItems="center">
                                                    <img className="menu-icon" src={archiveIcon}></img>
                                                    <Typography gutterBottom variant="subtitle2">아카이브</Typography>
                                                </Grid>
                                            </ButtonBase>
                                        </Paper>
                                    </div>
                                    <div className="menu-cell">
                                        <Paper className="menu-paper">
                                            <ButtonBase className="menu-button" onClick={viewArchive}>
                                                <Grid container direction="column" justify="center" alignItems="center">
                                                    <img className="menu-icon" src={sitesIcon}></img>
                                                    <Typography gutterBottom variant="subtitle2">관련 사이트</Typography>
                                                </Grid>
                                            </ButtonBase>
                                        </Paper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <img src={bannerImage} />
                </div>
            </div>

            <div className="comment-background">
                <div className="comment-container">
                    <h2>국제도시 및 인프라 연구센터</h2>
                    <p>서울시립대학교 국제도시 및 인프라 연구센터에 오신 것을 환영합니다!</p>
                </div>
            </div>

            <div className="board-background">
                <div className="board-container">
                    <div className="notice-root">
                        <NoticeBoard></NoticeBoard>
                    </div>
                </div>
            </div>

            

            <Modal open={archOpen} className="modal" onClose={() => setArchOpen(false)}>
                <div className="modal-content">
                    <h2>나가려면 화면의 좌우 바깥쪽을 클릭하세요.</h2>

                    <div className="modal-section">
                        <div className="modal-title">
                            <h1>정부</h1>
                        </div>
                        <div className="modal-menu">
                            <CardBoard variant="small" menuList={archMenu.goverment}></CardBoard>
                        </div>
                    </div>

                    <div className="modal-section">
                        <div className="modal-title">
                            <h1>신남방</h1>
                        </div>
                        <div className="modal-menu">
                            <CardBoard variant="small" menuList={archMenu.newSouthern}></CardBoard>
                        </div>
                    </div>

                    <div className="modal-section">
                        <div className="modal-title">
                            <h1>스마트도시</h1>
                        </div>
                        <div className="modal-menu">
                            <CardBoard variant="small" menuList={archMenu.smartCity}></CardBoard>
                        </div>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    )
}
