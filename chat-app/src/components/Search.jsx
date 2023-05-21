import React from 'react';
import Pp from '../image/pp.jpg';

const Search = () => {
  return (
    <div className='search'>
        <div className='searchForm'>
            <input type='text' placeholder='Search...' />
        </div>
        <div className='userChat'>
            <img src={Pp} alt='' />
            <div className='userChatMsg'>
                <span> Harshita </span>
            </div>
        </div>
    </div>
  )
}

export default Search
