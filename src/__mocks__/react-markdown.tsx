import React from 'react';

const ReactMarkdown = ({ children }: { children: string }) => {
  return React.createElement('div', { className: 'prose' }, children);
};

export default ReactMarkdown;
