import { BreadcrumbsProps } from '@mui/material/Breadcrumbs';

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
  icon?: React.ReactElement;
};

export interface CustomBreadcrumbsProps extends BreadcrumbsProps {
  id?: any;
  heading?: string;
  moreLink?: string[];
  activeLast?: boolean;
  action?: React.ReactNode;
  links: BreadcrumbsLinkProps[];
  isView?: any;
  path?: string;
}
