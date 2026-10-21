import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAnalytics } from "./hooks/useAnalytics";

const Home     = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* Old /resume and /contact links land on the matching section of the single page */
function ToSection({ id }: { id: string }) {
  window.location.replace(`/#${id}`);
  return null;
}

function Router() {
  useAnalytics();

  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "var(--paper)" }} />}>
      <Switch>
        <Route path="/"         component={Home} />
        <Route path="/resume"   component={() => <ToSection id="experience" />} />
        <Route path="/contact"  component={() => <ToSection id="contact" />} />
        <Route path="/404"      component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
