import React from 'react';
import { Dots, Sentry, Spinner } from 'react-activity';

const loaderSize = 25;

const variants = {
  spinner: <Spinner size={loaderSize} />,
  dots: <Dots size={loaderSize} />,
  sentry: <Sentry size={loaderSize} />,
};

const SpinnerLoader = ({ variant = 'spinner' }) => {
  return (
    <div className="w-full p-16 flex justify-center items-center">
      {variants[variant]}
    </div>
  );
};

export default SpinnerLoader;
