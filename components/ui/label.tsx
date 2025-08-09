import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({ className = '', ...props }) => {
  const baseClasses = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';
  
  const classes = `${baseClasses} ${className}`;
  
  return (
    <label
      className={classes}
      {...props}
    />
  );
};

export default Label;