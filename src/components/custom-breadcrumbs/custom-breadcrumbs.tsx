import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Iconify from '../iconify';
import LinkItem from './link-item';
import { usePopover } from '../custom-popover';
import { CustomBreadcrumbsProps } from './types';

// ----------------------------------------------------------------------

export default function CustomBreadcrumbs({
  id,
  links,
  action,
  heading,
  moreLink,
  activeLast,
  sx,
  path,
  isView,
  ...other
}: CustomBreadcrumbsProps) {
  const lastLink = links[links.length - 1].name;

  const popover = usePopover();

  return (
    <Box sx={{ ...sx }}>
      <Stack direction="row" alignItems="center" justifyContent="space-around">
        <Box sx={{ flexGrow: 1 }}>
          <Box display="flex" alignItems="center">
            {heading && (
              <Typography variant="h4" gutterBottom>
                {heading}
              </Typography>
            )}

            {isView && (
              <IconButton
                color={popover.open ? 'inherit' : 'default'}
                onClick={(e) => {
                  e.stopPropagation();
                  // router.push(path);
                  popover.onClose();
                }}
                sx={{ marginLeft: '31rem' }}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            )}
          </Box>
          {/* BREADCRUMBS */}
          {!!links.length && (
            <Breadcrumbs separator={<Separator />} {...other}>
              {links.map((link) => (
                <LinkItem
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>

      {/* MORE LINK */}
      {!!moreLink && (
        <Box sx={{ mt: 2 }}>
          {moreLink.map((href) => (
            <Link
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        bgcolor: 'text.disabled',
      }}
    />
  );
}
