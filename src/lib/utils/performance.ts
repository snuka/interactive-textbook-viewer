import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-insights.com/v1/vitals';

interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType: string;
    saveData: boolean;
    rtt: number;
    downlink: number;
  };
}

function getConnectionSpeed() {
  const nav = navigator as NavigatorWithConnection;
  if (typeof window !== 'undefined' && nav.connection?.effectiveType) {
    return nav.connection.effectiveType;
  }
  return 'unknown';
}

function sendToAnalytics(metric: Metric) {
  const analyticsId = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID;
  if (!analyticsId) {
    return;
  }

  const body = {
    dsn: analyticsId,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: 'application/x-www-form-urlencoded',
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else {
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
  }
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
