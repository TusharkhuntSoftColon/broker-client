import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

import { styled } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import SymbolNewEditForm from '../symbol-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

const CustomStyledTextKey = styled(Typography)({
  borderRadius: 3,
  padding: '10px',
  color: 'rgb(99, 115, 129)',
});

const CustomStyledText = styled(Typography)({
  borderRadius: 3,
  padding: '10px',
});

export default function SymbolDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const symbolData1 = useSelector((data: any) => data?.symbol?.symbolList);

  // const [symbolData, setSymbolData] = useState<any>();

  // const { mutate } = useMutation(symbolService.getSymbolList, {
  //   onSuccess: (data) => {
  //     setSymbolData(data?.data?.rows);
  //     enqueueSnackbar(data?.message, { variant: 'success' });
  //   },
  //   onError: (error: any) => {
  //     console.log({ error });
  //     if (isAxiosError(error)) {
  //       enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
  //     }
  //   },
  // });
  // useEffect(() => {
  //   mutate();
  // }, []);

  // console.log({ symbolData });

  const currentSymbol = useMemo(
    () => symbolData1?.filter((symbol: any) => symbol._id === id)[0],
    [symbolData1]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`${currentSymbol?.name} Symbol Details`}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Symbol',
            href: paths.dashboard.symbol.root,
          },
          { name: 'Symbol Details' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        path={paths.dashboard.symbol.edit(id)}
        isView
        id={currentSymbol?.id}
      />
      <SymbolNewEditForm currentUser={currentSymbol} isView />
    </Container>
  );
}
