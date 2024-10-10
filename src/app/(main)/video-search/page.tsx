import React from 'react';
import { Navbar } from '../components/navbar';
import { VideoSearch } from '../components/videoSearch';

const VideoSearchPage = () => {
  return (
    <div className=" h-screen w-screen flex flex-col items-center ">
      <Navbar />
      <VideoSearch />
    </div>
  );
};

export default VideoSearchPage;
