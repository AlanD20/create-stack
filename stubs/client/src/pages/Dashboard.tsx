import TitleText from '@@/TitleText';
import { GiHand } from 'react-icons/gi';
import AlertStatus from '@@/AlertStatus';
import PageLayout from '@@/layout/PageLayout';

const Dashboard = () => {
  return (
    <PageLayout>
      {/* Alert Status State */}
      <AlertStatus />

      <TitleText label="Hello There! Your {{appName}} Application is Ready">
        <GiHand />
      </TitleText>

    </PageLayout>
  );
};

export default Dashboard;
