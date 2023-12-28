import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        // subheader: t('overview'),
        items: [
          {
            title: t('dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      {
        items: [
          {
            title: 'Person',
            path: paths.dashboard.person.root,
            icon: ICONS.user,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}

export function useMasterNav() {
  const adminData = useMemo(
    () => [
      {
        items: [
          // USER
          {
            title: 'Dashboard',
            path: paths.master.root,
            icon: ICONS.user,
          },
        ],
      },
      {
        items: [
          {
            title: 'Person',
            path: paths.master.person.root,
            icon: ICONS.user,
          },
        ],
      },
    ],
    []
  );
  return adminData;
}
export function useSuperMasterNav() {
  const { t } = useTranslate();
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        // subheader: t('overview'),
        items: [
          {
            title: t('dashboard'),
            path: paths.superMaster.root,
            icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        // subheader: t('management'),
        items: [
          // {
          //   title: 'Master',
          //   path: paths.superMaster.master.root,
          //   icon: ICONS.user,
          // },
          // // USER
          // {
          //   title: 'User',
          //   path: paths.superMaster.user.root,
          //   icon: ICONS.user,
          // },
          {
            title: 'Person',
            path: paths.superMaster.person.root,
            icon: ICONS.user,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
