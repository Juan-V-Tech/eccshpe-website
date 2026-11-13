import { useRef } from 'react';
import { useDocumentTitle, useReveal } from './hooks';

// Wraps a page: sets the tab title and runs scroll reveals for its contents.
const Page = ({ title, className = '', children }) => {
  const ref = useRef(null);
  useDocumentTitle(title);
  useReveal(ref);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Page;
