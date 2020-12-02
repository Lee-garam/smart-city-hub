import { Paper, Grid } from '@material-ui/core';
import React from 'react'
import { Route } from 'react-router-dom';
import { ContentContainer, ContentHeader, MarkdownViewer, ProjectTable } from "../components"

// 총괄 사업
function Summary() {
    const primary = {
        title: "주요 사업",
        link: "/projects"
    };

    const secondary = {
        title: "총괄 사업",
        link: "/projects/summary"
    };

    let rows = [
        {
            when: "2005~2006",
            client: "NCDOT",
            title: "Designing an Efficient Nighttime Sign Inspection Procedure to Ensure Motorist Safety"
        },
        {
            when: "2012~2014",
            client: "FHWA",
            title: "Field Evaluation of Double Crossover Diamond Interchanges (DTFH61-10-C-00029)"
        },
        {
            when: "2013~2015",
            client: "FHWA",
            title: "HCM Guidance for Alternative Intersections (DTFH31-12-D-00020)"
        },
        {
            when: "2014~2015",
            client: "NCDOT",
            title: "Exploring Corridor Operations in the Vicinity of a Diverging Diamond Interchange (2014-13)"
        },
        {
            when: "2015",
            client: "NCDOT",
            title: "Development of Peak Average Daily Traffic (PADT) Factors"
        },
        {
            when: "2013~2015",
            client: "NCHRP",
            title: "Work Zone Capacity Methods for the Highway Capacity Manual (NCHRP 3-107)"
        },
        {
            when: "2016",
            client: "한국도로공사",
            title: "고속도로 유지관리 공사장 안전실태 및 개선방안 연구"
        },
        {
            when: "2016~2018",
            client: "건설교통기술촉진 연구사업",
            title: "도로주행 시뮬레이터 실험시설 구축"
        },
        {
            when: "2017",
            client: "한국도로공사",
            title: "동홍천양양고속도로 터널 및 교량 진로변경 시범운용 효과분석 연구"
        },
        {
            when: "2017",
            client: "한국도로공사",
            title: "고속도로 터널 및 교량 차선운용 개선방안 연구"
        },
        {
            when: "2017~2018",
            client: "한국도로공사",
            title: "고속도로 터널부 교통안전 및 소통 향상방안 연구"
        },
        {
            when: "2018",
            client: "한국수출입은행",
            title: "라오스 GMS 북부도로 개선사업 및 캄보디아 지방도로 개선사업 사후평가"
        },
        {
            when: "2018~2020",
            client: "행정안전부",
            title: "Bigdata 활용, 시설물 안전 대피 및 관리기술 개발"
        },
        {
            when: "2018~2019",
            client: "지방행정연구원",
            title: "광명 철산동 지하공영주차장 조성사업 타당성 조사(수요 및 편익 추정)"
        },
        {
            when: "2018~2019",
            client: "국토교통부",
            title: "중남미 인프라 ODA 사업기획 조사 용역"
        },
        {
            when: "2019~2021",
            client: "한국연구재단",
            title: "디지털트윈 기반의 도로주행시뮬레이터를 활용한 RSA 가이드라인 개발"
        },
        {
            when: "2019~2020",
            client: "서울시립대",
            title: "도시축소시대의 대중교통중심 공간관리기법과 제도적 정비방안"
        },
        {
            when: "2019~2020",
            client: "한국도로공사",
            title: "고속도로 화물차 교통사고 감소를 위한 교통안전, 운영 기법 개선"
        },
        {
            when: "2019~2020",
            client: "한국도로공사",
            title: "토공 다짐도 자동화시스템 파일럿 테스트 및 적용성 평가"
        },
        {
            when: "2020",
            client: "에티오피아교통국",
            title: "Experience Sharing in Public Transport Best Practices in South Korea"
        },
        {
            when: "2020",
            client: "지방행정연구원",
            title: "대구 대표도서관 건립사업 타당성 재조사"
        },
        {
            when: "2020",
            client: "지방행정연구원",
            title: "충남 도립미술관 및 공영주차장 건립사업 타당성조사 수요 및 편익추정(공영주차장)"
        },
        {
            when: "2020",
            client: "서울시립대",
            title: "IoT 도로표지병을 이용한 회전교차로 교통안전유도시스템 도입방안 연구"
        },
        {
            when: "2020",
            client: "국토교통부",
            title: "디지털 도로 인프라 추진방향 수립 연구"
        },
        {
            when: "2020",
            client: "한국수출입은행",
            title: "스리랑카 하톤-누와라엘리야 도로 건설사업 및 캄보디아 국도‧지방도 개보수, 캄포트 우회도로 건설사업 사후평가"
        },
        {
            when: "2020~2023",
            client: "한국연구재단",
            title: "한-아세안 다학제 민관 네트워크기반의 스마트도시수출 거첨HUB 구축"
        },
    ];

    for (let i = 0; i < rows.length; ++i)
        rows[i].no = rows.length - i;

    return (
        <ContentHeader primary={primary} secondary={secondary}>
            <h2 className="projects-subtitle">사업 총괄</h2>
            <ProjectTable rows={rows}></ProjectTable>
        </ContentHeader>
    )
}

// 인문사회연구소 지원 사업
function WithHumanism() {
    const primary = {
        title: "주요 사업",
        link: "/projects"
    };

    const secondary = {
        title: "인문사회연구소 지원 사업",
        link: "/projects/withhs"
    };

    return (
        <ContentHeader primary={primary} secondary={secondary}>
        </ContentHeader>
    )
}

// 스마트 재난안전 관련 사업
function SmartDisasterPrep() {
    const primary = {
        title: "주요 사업",
        link: "/projects"
    };

    const secondary = {
        title: "스마트 재난안전 관련 사업",
        link: "/projects/smtdstpre"
    };

    return (
        <ContentHeader primary={primary} secondary={secondary}>
        </ContentHeader>
    )
}

function EtcProjects() {
    const primary = {
        title: "주요 사업",
        link: "/projects"
    };

    const secondary = {
        title: "기타 사업",
        link: "/projects/etc"
    };

    return (
        <ContentHeader primary={primary} secondary={secondary}>
        </ContentHeader>
    )
}

export default function Projects() {
    return (
        <ContentContainer>
            <Route exact path="/projects" component={Summary}></Route>
            <Route exact path="/projects/summary" component={Summary}></Route>
            <Route exact path="/projects/withhs" component={WithHumanism}></Route>
            <Route exact path="/projects/smtdstpre" component={SmartDisasterPrep}></Route>
            <Route exact path="/projects/etc" component={EtcProjects}></Route>
        </ContentContainer>
    )
}
