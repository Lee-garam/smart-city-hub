import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer, CardBoard, CompanyList } from "../components"
import { Paper, ButtonBase, Typography } from '@material-ui/core'
import HubJson from "../hub-data/generated/domestic-parsed.json"
import CateToEng from "../hub-data/cateToEng.json"
import CategoryImage from '../shared/CategoryImage';
import "./Hub.scss"

function parsePath(first, second, third) {
    let section = [
        {
            title: "스마트도시수출 거점HUB",
            link: "/hub"
        }
    ];

    let currentNode = HubJson["tree"];
    let nextCate = HubJson["firstCate"];

    if (first) {
        let cateName = HubJson["firstCate"][first];
        nextCate = HubJson["secondCate"];
        section.push({
            title: cateName,
            index: first,
            link: "/hub/" + first
        });
        currentNode = currentNode.next[cateName];

        if (second) {
            cateName = HubJson["secondCate"][second];
            nextCate = HubJson["thirdCate"];
            section.push({
                title: cateName,
                index: second,
                link: "/hub/" + first + "/" + second
            });
            currentNode = currentNode.next[cateName];

            if (third) {
                cateName = HubJson["thirdCate"][third];
                nextCate = undefined;
                section.push({
                    title: cateName,
                    index: third,
                    link: "/hub/" + first + "/" + second + "/" + third
                });
                currentNode = currentNode.next[cateName];
            }
        }
    }

    return [section, currentNode, nextCate];
}

function FirstCategoryViewer(props) {
    const [section, setSection] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        let [section, , nextCate] = parsePath(undefined, undefined, undefined);
        let categories = [];
    
        for (const next in nextCate) {
            categories.push({
                link: section[section.length - 1].link + "/" + next,
                title: nextCate[next],
                image: CategoryImage[nextCate[next]],
                description: CateToEng[nextCate[next]]
            })
        }

        setSection(section);
        setCategories(categories);
    }, [props])

    return (
        section && categories ? ( 
            <ContentContainer currentPath={section[section.length - 1].link} title="스마트도시수출 거점 HUB" description="아래 목록에서 원하시는 대분류를 선택해주세요." subtitle="Smart City Export HUB Platform">
                <CardBoard variant="large" menuList={categories}></CardBoard>
            </ContentContainer>
        ) : (
            <React.Fragment></React.Fragment>
        )
    )
}

function SecondCategoryViewer(props) {
    const first = props?.match?.params?.first;
    const [second, setSecond] = useState(undefined);
    const [third, setThird] = useState(undefined);
    const [section, setSection] = useState();
    const [secondNode, setSecondNode] = useState();

    useEffect(() => {
        let [section, currentNode,] = parsePath(first, second, third);
        setSecondNode(currentNode);
        setSection(section);
    }, [first]);

    function showList(category, title) {

    }

    function getThirdButtons(category, node) {
        const nextCount = Object.keys(node.next).length;
        const compCount =  Number(Math.ceil(nextCount / 3)) * 3;

        const result = [];
        Object.keys(node.next).forEach((title) => {
            result.push((
                <Paper className="hub-second-paper" variant="outlined">
                    <ButtonBase onClick={() => showList(category, title)}>
                        {title}
                    </ButtonBase>
                </Paper>
            ))
        });

        for (let i = 0; i < compCount - nextCount; ++i) {
            result.push((
                <Paper className="hub-second-paper" variant="outlined"></Paper>
            ))
        }

        return (
            <div className="hub-wrap-layout">
                {result}
            </div>
        )
    }

    return (
        section ? ( 
            <ContentContainer currentPath={section[section.length - 1].link} title="Hub" description="Hub Description" subtitle="Hub Subtitle">
                <ul>
                    <li>'{section[1].title}' 대분류에 대한 {Object.keys(secondNode.next).length} 가지 중분류가 있습니다.</li>
                    <li>아래 목록에서 중분류에 대응되는 소분류를 선택해주시면 리스트에 목록이 나타납니다.</li>
                </ul>

                <div className="hub-header">
                    <div className="hub-subtitle hub-first">
                        <Typography variant="h6" align="center">중분류</Typography>
                    </div>
                    
                    <div className="hub-subtitle hub-second">
                        <Typography variant="h6" align="center">소분류</Typography>
                    </div>
                </div>

                {Object.entries(secondNode.next).map(([category, node]) => (
                    <div className="hub-row">
                        <Paper className="hub-first hub-first-paper" variant="outlined">
                            <strong>{category}</strong>
                        </Paper>

                        <div className="hub-second">{getThirdButtons(category, node)}</div>
                    </div>
                ))}

                <ul>
                    <li>{section.slice(1, section.length).map(s => s.title).join(" - ")} 분류에 대한 검색 결과입니다.</li>
                    <li>각 행의 좌측에 화살표를 클릭하시면 추가 정보를 보실 수 있습니다.</li>
                    <li>각 행의 기업명을 클릭하시면 그 기업의 홈페이지로 이동하실 수 있습니다.</li>
                </ul>

                <CompanyList firstIndex={first}></CompanyList>
            </ContentContainer>
        ) : (
            <React.Fragment></React.Fragment>
        )
    )
}

export default function Hub() {
    return (
        <Switch>
            <Route exact path="/hub" component={FirstCategoryViewer}></Route>
            <Route exact path="/hub/:first" component={SecondCategoryViewer}></Route>
        </Switch>
    )
}