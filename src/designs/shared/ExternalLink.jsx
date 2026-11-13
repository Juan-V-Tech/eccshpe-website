// Link that opens in a new tab. mailto: links open in place.
const ExternalLink = ({ href, children, ...props }) => {
  const isMail = href?.startsWith('mailto:');
  return (
    <a href={href} target={isMail ? undefined : '_blank'} rel={isMail ? undefined : 'noopener noreferrer'} {...props}>
      {children}
    </a>
  );
};

export default ExternalLink;
