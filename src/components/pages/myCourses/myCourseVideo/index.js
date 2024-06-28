/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-new */
import { useEffect } from 'react';
import Plyr from 'plyr';

export const MyCourseVideoCard = ({ sendSelectedTopic = {} }) => {
  useEffect(() => {
    new Plyr('#player');
  }, [sendSelectedTopic]);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="plyr__video-embed" id="player">
          <iframe
            src={
              sendSelectedTopic?.videoUrl ??
              'https://www.youtube.com/embed/ibiVvGtgmKM?si=-9ZZ8BWWLv0-kNQf'
            }
            allowfullscreen
            allowtransparency
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
};
