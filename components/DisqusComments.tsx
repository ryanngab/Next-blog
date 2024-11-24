import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

interface DisqusCommentsProps {
  shortname: string;
  identifier: string;
  title: string;
  url: string;
}

const DisqusComments: React.FC<DisqusCommentsProps> = ({
  shortname,
  identifier,
  title,
  url
}) => {
  const disqusConfig = {
    url,
    identifier,
    title
  };

  return (
    <div>
      <DiscussionEmbed shortname={shortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
