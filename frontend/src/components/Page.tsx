import { Helmet } from "react-helmet";
import React from "react";
import styled from "styled-components";
import { BarLoader } from "react-spinners";
import { RootState } from "../stores/rootStore/RootTypes";
import { getIsLoggedIn } from "../stores/environmentStore/EnvironmentSelectors";
import { connect } from "react-redux";
import { Heading } from "grommet";

interface PageReduxProps {
    isLoggedIn: boolean | undefined;
}

interface PageOwnProps {
    error?: string;
    children: React.ReactNode;
    isBlockedLoading?: boolean;
    isLoading?: boolean;
    public?: boolean;
    title: string;
}

type PageProps = PageReduxProps & PageOwnProps;

const UnenhancedPage = (props: PageProps) => {
    if (!props.public && props.isLoggedIn === false) {
        history.pushState({}, "", "/login");
        return null;
    }

    if (props.isBlockedLoading) {
        return (
            <BlockedLoadingSpinnerContainer>
                <Heading level="2">Laden...</Heading>
                <BarLoader color="#00739d" height={11} loading={props.isBlockedLoading || false} width={200} />
            </BlockedLoadingSpinnerContainer>
        );
    }

    return (
        <PageContainer>
            <Helmet title={props.title} />

            {props.children}

            <LoadingSpinnerContainer>
                <BarLoader color="#00739d" height={5} loading={props.isLoading || false} width={70} />
            </LoadingSpinnerContainer>
        </PageContainer>
    );
};

const PageContainer = styled.main`
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
`;

const LoadingSpinnerContainer = styled.div`
    bottom: 32px;
    position: fixed;
    right: 40px;
`;

const BlockedLoadingSpinnerContainer = styled.div`
    align-items: center;
    background: #fff;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
`;

export const Page = connect((rootState: RootState) => ({
    isLoggedIn: getIsLoggedIn(rootState.environment.environment),
}))(UnenhancedPage);
