import {
  Box,
  styled
} from '@mui/material';


import SidebarLayout from '@/layouts/SidebarLayout';
import DashboardCrypto from './dashboards/crypto';

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <DashboardCrypto></DashboardCrypto>
    </OverviewWrapper>
  );
}

Overview.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default Overview;

// Overview.getLayout = function getLayout(page: ReactElement) {
//   return <BaseLayout>{page}</BaseLayout>;
// };
