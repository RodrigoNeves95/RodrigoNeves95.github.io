import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import DareDataLogo from '../../images/DaredataFavicon.png';
import TecnicoLogo from '../../images/ist.png';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';

const StyledJobsSection = styled.section`
  max-width: 1000px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }
  }
`;

const JobsVertical = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tab
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I’ve Worked</h2>
      <VerticalTimeline lineColor="#eca72c">
        {jobsData &&
          jobsData.map(({ node }, i) => {
            const { frontmatter } = node;
            const { title, company, range } = frontmatter;
            return (
              <div key={i}>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work-{i}"
                  contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                  date={range}
                  iconStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
                  icon={<img src={DareDataLogo} alt="DaredataFavicon" />}>
                  <h3 className="vertical-timeline-element-title">{company}</h3>
                  <h4 className="vertical-timeline-element-subtitle">{title}</h4>
                  <p>dummy text</p>
                </VerticalTimelineElement>
              </div>
            );
          })}

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date="2011 - present"
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
          icon={<img src={DareDataLogo} alt="DaredataFavicon" />}>
          <h3 className="vertical-timeline-element-title">Creative Director</h3>
          <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
          <p>
            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date="2011 - present"
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
          icon={<img src={DareDataLogo} alt="DaredataFavicon" />}>
          <h3 className="vertical-timeline-element-title">Creative Director</h3>
          <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
          <p>
            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date="2011 - present"
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
          icon={<img src={TecnicoLogo} alt="DaredataFavicon" />}>
          <h3 className="vertical-timeline-element-title">Creative Director</h3>
          <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
          <p>
            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </StyledJobsSection>
  );
};

export default JobsVertical;
