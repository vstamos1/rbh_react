import React from 'react';
import Job from './Job';
import Heading from '../UI/Headings/Heading';
import styled from 'styled-components'

const FiltersWrapper = styled.div`
text-align: center;
padding: 0;
margin: 0;
width:100%;
`

const Jobslist = () => {
    return (
        <FiltersWrapper>
        <Heading size="h1" bold color="white">
        Open Jobs</Heading>
        <Job/>
        </FiltersWrapper>
    )
}

export default Jobslist
