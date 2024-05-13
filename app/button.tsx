// pages/index.tsx or any other component

import SyncUserButton from "./aside";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <SyncUserButton />
    </div>
  );
};

export default HomePage;
