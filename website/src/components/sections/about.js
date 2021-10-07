import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(140px, 200px));
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "me.png" }) {
        childImageSharp {
          fluid(maxWidth: 600, traceSVG: { color: "#64ffda" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Python',
    'Kubernetes',
    'Pytorch',
    'Scikit-learn',
    'Docker',
    'SQL/NoSQL',
    'Javascript',
    'Argo',
    'Prefect',
    'Grafana',
    'PostgreSQL',
    'MLFlow',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I'm currently working as a contractor for a consultant{' '}
              <a href="https://daredata.engineering/home">company</a> as a machine learning
              engineer. Before that, I started my career working on a{' '}
              <a href="https://www.jungle.ai/">start-up</a> with a focus on building predictive
              maintenance solutions for the energy and heavy industry sector. I joined right after
              finishing my master thesis working on a pure data science position, but steady and
              slowly started to earn more responsibility and work on multiple positions, ranging
              from software engineering until MLOps or even full-stack engineering.
            </p>
            <p>
              I received a master's degree in Electrical and Computer Engineering from{' '}
              <a href="https://tecnico.ulisboa.pt/en/">Instituto Superior Tecnico</a>. My first real
              contact with machine learning and software development started during my{' '}
              <a href="https://fenix.tecnico.ulisboa.pt/cursos/meec/dissertacao/565303595501982">
                master thesis
              </a>
              . I had the chance to develop it in collaboration with{' '}
              <a href="https://www.jungle.ai/">Jungle</a>, which offered me the perfect environment
              to develop my skills while being an active member of daily operations on a
              professional setup.
            </p>

            <p>
              During my career, I have had the opportunity to work in multiple positions and with
              different technologies, which helps me to understand the various steps and areas, and
              how they interact, in a software development project focused on machine learning
              solutions. From a simple model, developed on a notebook, going into database structure
              and management, until product deployment. Nevertheless, I know that I still have a lot
              to learn and every day it seems that I know even less than the day before. The
              development pace of new technologies, frameworks and tools can be daunting and
              terrifying, but you will have to face it as new opportunities and excitement.
            </p>

            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <Img fluid={data.avatar.childImageSharp.fluid} alt="Avatar" className="img" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
