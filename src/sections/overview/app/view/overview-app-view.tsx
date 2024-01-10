/* eslint-disable import/no-extraneous-dependencies */
import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';
/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import AppNewInvoice from '../app-new-invoice';
import ClientTableDashboard from '../client-new-table';
import SymbolTableDashboard from '../symbol-new-table';
import MarginCallTableDashboard from '../margin-call-table';

// ----------------------------------------------------------------------

const ResponsiveReactGridLayout: any = WidthProvider(Responsive);
export default function OverviewAppView() {
  // app current download component

  // const { user } = useMockedUser();

  // const theme = useTheme();

  const [compactType] = useState<any>('vertical');
  const [mounted, setmounted] = useState<any>(false);
  const [layout] = useState<any>([
    {
      i: 'a',
      component: <SymbolTableDashboard />,
      x: 0,
      y: 0,
      w: 3,
      h: 13.7,
      minH: 13.7,
      maxH: 13.7,
    },
    {
      i: 'c',
      component: <AppNewInvoice />,
      x: 0,
      y: 13.7,
      w: 12,
      h: 13.7,
      minH: 13.7,
      maxH: 13.7,
    },
    {
      i: 'd',
      component: <ClientTableDashboard />,
      x: 3,
      y: 0,
      w: 6,
      h: 13.7,
      minH: 13.7,
      maxH: 13.7,
    },
    {
      i: 'e',
      component: <MarginCallTableDashboard />,
      x: 9,
      y: 0,
      w: 3,
      h: 13.7,
      minH: 13.7,
      maxH: 13.7,
    },
  ]);

  // const settings = useSettingsContext();

  const onDrop = (elemParams: any) => {
    alert(`Element parameters:\n${JSON.stringify(elemParams, ['x', 'y', 'w', 'h'], 2)}`);
  };

  useEffect(() => {
    setmounted(true);
  }, []);

  return (
    <>
      <ResponsiveReactGridLayout
        rowHeight={30}
        height={700}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layout={layout}
        style={{ padding: '2px' }}
        onDrop={onDrop}
        isBounded
        isDraggable
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        onLayoutChange={(layout: any) => console.log({ layout })}
        compactType={compactType}
        preventCollision={!compactType}
        // draggableHandle=".grid-item__title"
        isDroppable
        droppingItem={{ i: 'xx', h: 2, w: 2 }}
      >
        {layout.map((itm: any, i: any) => (
          <div key={i} data-grid={itm} className="block" style={{ height: 'inherit' }}>
            {itm.component}
          </div>
        ))}
      </ResponsiveReactGridLayout>
      {/* <Grid container spacing={3}> */}
      {/* <Grid xs={12} md={8}>
          <AppWelcome
            title={`Welcome back 👋 \n ${user?.displayName}`}
            description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
            img={<SeoIllustration />}
            action={
              <Button variant="contained" color="primary">
                Go Now
              </Button>
            }
          />
        </Grid> */}
      {/* 
        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid> */}

      {/* <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Active Users"
            percent={2.6}
            total={18765}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Installed"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Downloads"
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid> */}

      {/*  <Grid xs={12} md={6} lg={4}>
      <AppCurrentDownload
            title="Current Download"
            chart={{
              series: [
                { label: 'Mac', value: 12244 },
                { label: 'Window', value: 53345 },
                { label: 'iOS', value: 44313 },
                { label: 'Android', value: 78343 },
              ],
            }}
          /> 
        </Grid> */}

      {/*  <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Area Installed"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2019',
                  data: [
                    {
                      name: 'Asia',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'America',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    {
                      name: 'Asia',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'America',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid> */}

      {/*   <Grid xs={12} lg={8}>
       <AppNewInvoice
            title="New Invoice"
            tableData={_appInvoices}
            tableLabels={[
              { id: 'id', label: 'Invoice ID' },
              { id: 'category', label: 'Category' },
              { id: 'price', label: 'Price' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          /> 
        </Grid> */}

      {/*   <Grid xs={12} md={6} lg={4}>
           <AppTopRelated title="Top Related Applications" list={_appRelated} /> 
        </Grid> */}

      {/* <Grid xs={12} md={6} lg={4}>
          <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top Authors" list={_appAuthors} />
        </Grid> */}

      {/* <Grid xs={12} md={6} lg={4}>
          <Stack spacing={3}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{
                series: 48,
              }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              color="info"
              chart={{
                series: 75,
              }}
            />
          </Stack>
        </Grid> */}
      {/* </Grid>  */}
    </>
  );
}
