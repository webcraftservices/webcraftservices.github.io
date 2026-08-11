import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { IntroAnimation } from '@/components/IntroAnimation';

const Home = lazy(() => import('@/pages/Home'));
const Business = lazy(() => import('@/pages/Business'));
const Personal = lazy(() => import('@/pages/Personal'));
const NotFound = lazy(() => import('@/pages/not-found'));

function Router() {
  return (
    <Layout>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/business" component={Business} />
          <Route path="/personal" component={Personal} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <SonnerToaster />
      <IntroAnimation />
    </MotionConfig>
  );
}

export default App;
