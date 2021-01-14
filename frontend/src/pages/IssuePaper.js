import React from 'react'
import { Route } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';

export default function IssuePaper() {
    return (
        <ContentContainer currentPath={"/issue-paper"}>
            <Route exact path="/issue-paper"
                render={() => <GeneralArticleList superTitle="Issue Paper" title="Issue Paper" link="/issue-paper" kind="issue-paper"></GeneralArticleList>}></Route>
            <Route exact path="/issue-paper/:articleId"
                render={(props) => <GeneralArticleView {...props} superTitle="Issue Paper" title="Issue Paper" listLink="/issue-paper" kind="issue-paper"></GeneralArticleView>}></Route>
        </ContentContainer>
    )
}
