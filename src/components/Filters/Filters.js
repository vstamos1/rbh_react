import React, {useState} from 'react';

import styled from 'styled-components';

const FilterWrapper = styled.div`

@media ${props => props.theme.mediaQueries.small} {
   
     background-color: 'red';
}

display:${(props => props.open ? 'block' : 'none')}; 
`
const FilterHeader = styled.div`

`
const Filters = () => {
    const [filterIsOpened, setFilterIsOpened] = useState(false);
    return (
        
        <>
        <FilterHeader>
          Filters <span className="fas fa-ellipsis-v right"  onClick={() => setFilterIsOpened(!filterIsOpened)}> </span>
           
        </FilterHeader>
        <FilterWrapper open={filterIsOpened} className="dropdown">
            dropdown
        </FilterWrapper>
        </>
    )
}

export default Filters
