/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface GradientTextProps {
  text: string;
  suffix?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  suffix,
  as: Tag = 'span',
  className = '',
}) => {
  return (
    <Tag className={`relative inline-block ${className}`}>
      <span
        className="text-transparent bg-clip-text"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #ffffff 0%, #10b981 50%, rgba(255,255,255,0.4) 100%)',
        }}
      >
        {text}
      </span>
      {suffix && (
        <span
          className="text-[0.4em] align-top opacity-60 ml-0.5 tracking-normal"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #ffffff 0%, #10b981 50%, rgba(255,255,255,0.4) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {suffix}
        </span>
      )}
    </Tag>
  );
};

export default GradientText;
