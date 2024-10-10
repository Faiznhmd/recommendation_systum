import React from 'react';
import { Navbar } from '../component/navbar';
import { VideoSearch } from '../component/videoSearch';

const VideoSearchPage = () => {
  return (
    <div className=" h-screen w-screen flex flex-col items-center ">
      <Navbar />
      <VideoSearch />
    </div>
  );
};

export default VideoSearchPage;
