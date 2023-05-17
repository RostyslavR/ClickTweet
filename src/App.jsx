import { lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCurrentUser } from "./services/store";
import { autoSignIn } from "./services/autoSignIn";

import { Layout } from "./components/Layuot/Layout";

const Home = lazy(() => import("./pages/Home"));
const Tweets = lazy(() => import("./pages/Tweets"));

function App() {
  const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);
  const currentUser = useCurrentUser((state) => state.currentUser);

  useEffect(() => {
    autoSignIn(setCurrentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tweets" element={<Tweets />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}



export default App;
