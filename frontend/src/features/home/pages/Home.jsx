import React from 'react'
import FaceExpression from '../../expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import Logout from '../components/Logout'

const Home = () => {

const {handleGetSong} = useSong() ;

  return (
    <>
      <Logout />
      <FaceExpression
        onClick={(expression) => {
          handleGetSong({ mood: expression });
        }}
      />
      <Player />
    </>
  );
}

export default Home