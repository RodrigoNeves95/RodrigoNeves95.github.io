import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Head, Loader, Snake, Social, Logo, Email } from '@components';
import { navDelay } from '@utils';
import { GlobalStyle, theme } from '@styles';

const StyledMainContainer = styled.main`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const SnakePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isHome = true;
  const [setIsLoading] = useState(isHome);
  const [isLoading] = [false];

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Head />
      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              <Logo isHome={isHome} />
              <Social isHome={isHome} />
              <Email isHome={isHome} />
              <div id="content">
                <TransitionGroup component={null}>
                  {isMounted && (
                    <CSSTransition timeout={500} classNames="fadeup">
                      <StyledMainContainer className="fillHeight">
                        <Snake />
                      </StyledMainContainer>
                    </CSSTransition>
                  )}
                </TransitionGroup>
              </div>
            </StyledContent>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

SnakePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SnakePage;
