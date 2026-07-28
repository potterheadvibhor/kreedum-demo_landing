import { useEffect, useState } from "react";
import KreedumSportsLanding, { GlobalStyle } from "./KreedumSportsLanding.jsx";
import QuotePage from "./QuotePage.jsx";

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isQuotePage = route === "#/quote";

  return (
    <>
      <GlobalStyle />
      {isQuotePage ? <QuotePage /> : <KreedumSportsLanding />}
    </>
  );
}
