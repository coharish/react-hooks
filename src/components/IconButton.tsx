import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IconButtonProps {
  icon: IconDefinition;
  onClick: () => void;
}

const IconButton = React.forwardRef((props: IconButtonProps, ref: any) => {
  return (
    <span ref={ref}>
      <FontAwesomeIcon {...props} />
    </span>
  );
});

export default IconButton;
