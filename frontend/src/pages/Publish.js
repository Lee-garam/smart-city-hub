import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';
import GeneralArticleWriter from './GeneralArticleWriter';
import "./Publish.scss"

function IssuePaper() {
    return (
        <ContentContainer currentPath={"/publish/issue-paper"}>
            <Switch>
                <Route exact path="/publish/issue-paper"
                    render={() => <GeneralArticleList superTitle="발간물" title="Issue Paper" link="/publish/issue-paper" kind="issue-paper"></GeneralArticleList>}></Route>
                <Route exact path="/publish/issue-paper/writer"
                    render={() => <GeneralArticleWriter superTitle="발간물" pageTitle="Issue Paper" link="/publish/issue-paper" kind="issue-paper"></GeneralArticleWriter>}></Route>
                <Route path="/publish/issue-paper/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="발간물" pageTitle="Issue Paper" link="/publish/issue-paper" kind="issue-paper"></GeneralArticleWriter>}></Route>
                <Route exact path="/publish/issue-paper/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="발간물" title="Issue Paper" listLink="/publish/issue-paper" kind="issue-paper"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

function ArchSouthern() {
    return (
        <ContentContainer currentPath={"/publish/archive/southern"}>
            <Switch>
                <Route exact path="/publish/archive"
                    render={() => <GeneralArticleList superTitle="발간물" title="아카이브" caption="신남방 & 스마트도시 기술 리포트" link="/publish/archive" kind="archive*"></GeneralArticleList>}></Route>
                <Route exact path="/publish/archive/writer"
                    render={() => <GeneralArticleWriter superTitle="발간물" pageTitle="아카이브" caption="신남방 & 스마트도시 기술 리포트" link="/publish/archive" kind="archive"></GeneralArticleWriter>}></Route>
                <Route path="/publish/archive/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="발간물" pageTitle="아카이브" caption="신남방 & 스마트도시 기술 리포트" link="/publish/archive" kind="archive"></GeneralArticleWriter>}></Route>
                <Route exact path="/publish/archive/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="발간물" title="아카이브" caption="신남방 & 스마트도시 기술 리포트" listLink="/publish/archive"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

export default function Publish() {
    return (
        <Switch>
            <Route path="/publish/issue-paper" component={IssuePaper}></Route>
            <Route path="/publish/archive" component={ArchSouthern}></Route>
        </Switch>
    )
}