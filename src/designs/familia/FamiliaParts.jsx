import { Link } from 'react-router';
import BlurText from '../../components/reactbits/BlurText/BlurText';
import Topography from '../../components/reactbits/Topography/Topography';
import ExternalLink from '../shared/ExternalLink';
import Icon from '../shared/Icon';

export const Kicker = ({ light = false, children }) => (
  <p className={`fx-kicker${light ? ' fx-kicker--light' : ''}`}>{children}</p>
);

export const Button = ({ to, href, variant, icon = 'arrowRight', className = '', children, ...props }) => {
  const cls = ['fx-btn', variant && `fx-btn--${variant}`, className].filter(Boolean).join(' ');
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <ExternalLink href={href} className={cls} {...props}>
      {content}
    </ExternalLink>
  );
};

export const TextLink = ({ to, href, icon = 'arrowRight', children }) => {
  const content = (
    <>
      <span>{children}</span>
      <Icon name={icon} size={18} />
    </>
  );
  return to ? (
    <Link to={to} className="fx-link">
      {content}
    </Link>
  ) : (
    <ExternalLink href={href} className="fx-link">
      {content}
    </ExternalLink>
  );
};

// Heading whose words blur into focus (React Bits BlurText).
export const BlurHeading = ({ text, as = 'h2', className = 'fx-h2', trigger = 'view', delay = 90 }) => (
  <BlurText as={as} text={text} className={className} animateBy="words" direction="top" delay={delay} trigger={trigger} />
);

export const SectionHead = ({ kicker, title, intro, center = false, aside }) => (
  <div className={`fx-head${center ? ' fx-head--center' : ''}${aside ? ' fx-head--split' : ''}`}>
    <div style={{ display: 'grid', gap: 18, justifyItems: center ? 'center' : 'start' }}>
      {kicker && (
        <div data-reveal="fade">
          <Kicker>{kicker}</Kicker>
        </div>
      )}
      {title && <BlurHeading text={title} />}
      {intro && (
        <p className="fx-lead" data-reveal="up">
          {intro}
        </p>
      )}
    </div>
    {aside && <div data-reveal="up">{aside}</div>}
  </div>
);

// Soft animated contour lines behind light sections (React Bits Topography).
export const Contours = ({ className }) => (
  <div className={className} aria-hidden="true">
    <Topography
      lightMode
      color="#0070c0"
      lineCount={18}
      lineWidth={1}
      speed={0.12}
      tilt={24}
      glow={0.2}
      fog={0.5}
      opacity={0.6}
      mouseStrength={0.4}
      clickEffect="none"
    />
  </div>
);

export const PageHeader = ({ crumb, title, intro, children }) => (
  <header className="fx-page-head">
    <Contours className="fx-page-head__bg" />
    <div className="fx-wrap">
      <nav aria-label="Breadcrumb" data-reveal="fade" data-reveal-start="top bottom">
        <ol className="fx-crumbs">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li aria-current="page">{crumb}</li>
        </ol>
      </nav>
      <BlurHeading as="h1" text={title} className="fx-h1" trigger="load" delay={70} />
      {intro && (
        <div className="fx-lead" data-reveal="up" data-reveal-delay="0.3" data-reveal-start="top bottom">
          {intro}
        </div>
      )}
      {children && (
        <div data-reveal="up" data-reveal-delay="0.45" data-reveal-start="top bottom">
          {children}
        </div>
      )}
    </div>
  </header>
);
