/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

import AppNewInvoice from '../app-new-invoice';
import ClientTableDashboard from '../client-new-table';
import MarginCallTableDashboard from '../margin-call-table';
import SymbolTableDashboard from '../symbol-new-table';
// import '../../../node_modules/react-resizable/css/styles.css';
// import '../../../node_modules/react-grid-layout/css/styles.css';

// ----------------------------------------------------------------------

const ResponsiveReactGridLayout: any = WidthProvider(Responsive);
export default function OverviewAppView() {
  const [compactType, setcompactType] = useState<any>('vertical');
  const [mounted, setmounted] = useState<any>(false);
  const [layout, setlayout] = useState<any>([
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
  console.log(setlayout, setcompactType);

  const settings = useSettingsContext();

  const onDrop = (elemParams: any) => {
    alert(`Element parameters:\n${JSON.stringify(elemParams, ['x', 'y', 'w', 'h'], 2)}`);
  };

  useEffect(() => {
    setmounted(true);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
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
    </Container>
  );
}
