import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  Briefcase01Icon,
  BookOpen01Icon,
  Calendar03Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  CpuIcon,
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  Linkedin01Icon,
  Location01Icon,
  Mail01Icon,
  Menu01Icon,
  Mortarboard02Icon,
  PauseIcon,
  PlayIcon,
  SlackIcon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons';

// Open-source Hugeicons (free set), wrapped so designs can ask for icons by name.
const ICONS = {
  arrowDown: ArrowDown01Icon,
  arrowLeft: ArrowLeft01Icon,
  arrowRight: ArrowRight01Icon,
  arrowUp: ArrowUp01Icon,
  arrowUpRight: ArrowUpRight01Icon,
  briefcase: Briefcase01Icon,
  book: BookOpen01Icon,
  calendar: Calendar03Icon,
  close: Cancel01Icon,
  check: CheckmarkCircle02Icon,
  clock: Clock01Icon,
  cpu: CpuIcon,
  location: Location01Icon,
  mail: Mail01Icon,
  menu: Menu01Icon,
  graduation: Mortarboard02Icon,
  pause: PauseIcon,
  play: PlayIcon,
  people: UserGroupIcon,
  // Social links, keyed by the labels in src/data/site.js
  Instagram: InstagramIcon,
  GitHub: GithubIcon,
  LinkedIn: Linkedin01Icon,
  Discord: DiscordIcon,
  Slack: SlackIcon,
};

const Icon = ({ name, size = 18, strokeWidth = 1.6, ...props }) => {
  const icon = ICONS[name];
  if (!icon) return null;
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} aria-hidden="true" focusable="false" {...props} />;
};

export default Icon;
