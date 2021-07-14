import React, { useState, useEffect } from 'react'
import { NoticeBoard, CardBoard, DocumentPreview } from '../components'
import { Paper, ButtonBase, Grid, Modal, Typography } from '@material-ui/core'
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core'
import 'react-slideshow-image/dist/styles.css'
import { getArticles, getFileInfo } from '../shared/BackendRequests'
import { dateToString } from '../shared/DateToString'
import kindTable from "../shared/ArticleKindTable.json";
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
    const [imageCards, setImageCards] = useState([]);
    const [issuePaperPreview, setIssuePaperPreview] = useState([]);
    const [archivePreview, setArchivePreview] = useState([]);
    const history = useHistory();
    const archMenu = getArchives();

    useEffect(() => {
        function extractSrc(html) {
            const tempElement = document.createElement("div");
            tempElement.innerHTML = html;
            return tempElement.querySelector("img").getAttribute("src");
        }

        function getArticlePath(articleId, kind) {
            return `${kindTable[kind].path}/${articleId}`;
        }

        function getLinkHandler(element) {
            return () => {
                history.push(getArticlePath(element.articleId, element.kind));
            }
        }

        function checkExtension(fileName, ext) {
            const target = "." + ext;
            return fileName.substring(Math.max(0, fileName.length-target.length)) === target;
        }

        async function hasPDF(article) {
            const promises = [];
            article.files.forEach((fileId) => {
                promises.push(getFileInfo(fileId));
            });

            try {
                const infoArr = await Promise.all(promises);

                let result = false;
                infoArr.some((info) => {
                    if (checkExtension(info.originalName, "pdf")) {
                        result = true;
                    }
                    return result;
                });
                return result;
            } catch (e) {
                return false;
            }
        }

        getArticles(1, 3, undefined, "[.\r\n]*<img.*src.*>[.\r\n]*", undefined, undefined)
            .then((res) => {
                const imCards = [];
                res.forEach(element => {
                    const src = extractSrc(element.contents);
                    imCards.push(
                        <Card className="menu-card-root" variant="outlined">
                            <CardActionArea onClick={getLinkHandler(element)}>
                                <CardMedia
                                    image={src}
                                    title={element.title}
                                    className="menu-card-media"
                                />
                                <CardContent>
                                    <Typography className="menu-card-title" gutterBottom variant="h6">
                                        {element.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {`${kindTable[element.kind].text} · ${dateToString(element.meta.createdAt)}`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                });
                setImageCards(imCards);
            });

        getArticles(1, 10, "issue-paper", undefined, undefined, undefined)
            .then(async (res) => {
                const ipPrev = [];
                for (let i = 0; i < res.length; ++i) {
                    const element = res[i];
                    if (await hasPDF(element)) {
                        ipPrev.push(
                            <DocumentPreview article={element}></DocumentPreview>
                        );
                    }
                    if (ipPrev.length === 2) {
                        break;
                    }
                }
                setIssuePaperPreview(ipPrev);
            });

        getArticles(1, 10, "archive", undefined, undefined, undefined)
            .then(async (res) => {
                const archPrev = [];
                for (let i = 0; i < res.length; ++i) {
                    const element = res[i];
                    if (await hasPDF(element)) {
                        archPrev.push(
                            <DocumentPreview article={element}></DocumentPreview>
                        );
                    }
                    if (archPrev.length === 2) {
                        break;
                    }
                }
                setArchivePreview(archPrev);
            });
    }, [history])

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
                    <div className="notice-root">
                        <div className="notice-layout">
                            <NoticeBoard rowCount={4}></NoticeBoard>
                        </div>
                    </div>

                    <img alt="bannerImage" src={bannerImage} />
                </div>
            </div>

            <div className="comment-background">
                <div className="comment-container">
                    <h2>국제도시 및 인프라 연구센터</h2>
                    <p>서울시립대학교 국제도시 및 인프라 연구센터에 오신 것을 환영합니다!</p>
                </div>
            </div>

            <div className="board-background board-puple">
                <div className="board-column-container">
                    <h3 className="board-title">사진으로 보는 최근 소식</h3>
                    <div className="menu-card-layout">
                        {imageCards}
                    </div>
                </div>
            </div>

            <div className="board-background board-puple">
                <div className="board-row-container board-row-inner-sep">
                    <div className="board-half">
                        <h3 className="board-title">최신 Issue Paper</h3>
                        <div className="preview-layout">
                            {issuePaperPreview}
                        </div>
                    </div>
                    <div className="board-half">
                        <h3 className="board-title">최신 신남방 &amp; 스마트도시 기술 리포트</h3>
                        <div className="preview-layout">
                            {archivePreview}
                        </div>
                    </div>
                </div>
            </div>

            <div className="board-background">
                <div className="board-column-container">
                    <h3 className="board-title">주요 기능 바로가기</h3>
                    <div className="menu-board">
                        <div className="menu-table">
                            <div className="menu-row">
                                <div className="menu-cell">
                                    <Paper className="menu-paper" variant="outlined">
                                        <ButtonBase className="menu-button" onClick={getRedirector("/news/notices")}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <img alt="noticeIcon" className="menu-icon" src={noticeIcon}></img>
                                                <Typography gutterBottom variant="subtitle2">공지사항</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper className="menu-paper" variant="outlined">
                                        <ButtonBase className="menu-button" onClick={getRedirector("/publish/issue-paper")}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <img alt="issuePaperIcon" className="menu-icon" src={issuePaperIcon}></img>
                                                <Typography gutterBottom variant="subtitle2">Issue Paper</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper className="menu-paper" variant="outlined">
                                        <ButtonBase className="menu-button" onClick={getRedirector("/news/smart-news")}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <img alt="smartNews" className="menu-icon" src={smartNews}></img>
                                                <Typography gutterBottom variant="subtitle2">스마트뉴스</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                            </div>
                            <div className="menu-row">
                                <div className="menu-cell">
                                    <Paper className="menu-paper" variant="outlined">
                                        <ButtonBase className="menu-button" onClick={getRedirector("/hub")}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <img alt="smartCityHub" className="menu-icon" src={smartCityHub}></img>
                                                <Typography gutterBottom variant="subtitle2">스마트도시수출</Typography>
                                                <Typography gutterBottom variant="subtitle2">거점HUB</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper className="menu-paper" variant="outlined">
                                        <ButtonBase className="menu-button" onClick={getRedirector("/publish/archive")}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <img alt="archiveIcon" className="menu-icon" src={archiveIcon}></img>
                                                <Typography gutterBottom variant="subtitle2">아카이브</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper className="menu-paper" variant="outlined">
                                        <ButtonBase className="menu-button" onClick={viewArchive}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <img alt="sitesIcon" className="menu-icon" src={sitesIcon}></img>
                                                <Typography gutterBottom variant="subtitle2">관련 사이트</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                            </div>
                        </div>
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
