import React, { FC, useCallback } from 'react';

import { AiFillGithub } from 'react-icons/ai';

import { Button } from './GhButton.style';

const GITHUB_URL = 'https://github.com/vaibhav1324/melodoodle';

const GhButton: FC = () => {
  const redirectToGithub = useCallback(() => {
    window.open(GITHUB_URL, '_blank');
  }, []);

  return (
    <Button
      onClick={redirectToGithub}
      aria-label="github-icon-button"
      icon={<AiFillGithub size="35px" />}
    />
  );
};

export default GhButton;
