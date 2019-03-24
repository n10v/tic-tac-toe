import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";
import { connect } from "react-redux";
import { Text, RoutedAnchor, Anchor } from "grommet";
import { Github } from "grommet-icons";

import { RootState } from "../stores/rootStore/RootTypes";
import { isResponseSuccessBody } from "../utils/Api";

interface NavBarReduxProps {
    username: string | undefined;
}

type NavBarProps = NavBarReduxProps & RouteComponentProps;

const UnenhancedNavBar = (props: NavBarProps) => (
    <NavBarContainer>
        <NavBarContent>
            {props.username ? (
                <>
                    <RoutedAnchor path="/home">Home</RoutedAnchor>
                    <Text weight="bold">{props.username}</Text>
                </>
            ) : null}
            <Anchor
                href="https://github.com/bogem/tic-tac-toe"
                icon={<Github color="#24292e" />}
                margin={!props.username ? "0 auto" : undefined}
                target="_blank"
            />
        </NavBarContent>
    </NavBarContainer>
);

const NavBarContainer = styled.div`
    background: #f2f2f2;
    box-shadow: 0 2px 2px #dadada;
    display: flex;
    justify-content: center;
    height: 50px;
    width: 100%;
`;

const NavBarContent = styled.nav`
    align-items: center;
    display: flex;
    justify-content: space-between;
    height: 100%;
    max-width: 550px;
    width: 100%;
`;

export const NavBar = withRouter(
    connect(({ environment }: RootState) => ({
        username:
            environment.environment !== "Not Logged In" && isResponseSuccessBody(environment.environment)
                ? environment.environment.username
                : undefined,
    }))(UnenhancedNavBar)
);
