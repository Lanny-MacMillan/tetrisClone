export function reportWebVitalsToGA(metric) {
  // Report basic web vitals
  window.gtag("event", metric.name, {
    event_category: "Web Vitals",
    value: metric.value,
    event_label: metric.id, // unique to the current page load
    non_interaction: true, // doesn't affect bounce rate
  });

  // Report custom user timing for specific metrics
  if (metric.name === "LCP" || metric.name === "FID") {
    window.gtag("event", "timing_complete", {
      name: metric.name,
      event_category: "User Timing",
      value: metric.value, // value in ms
    });
  }

  // Report custom dimensions or user engagement
  if (metric.name === "CLS") {
    window.gtag("event", "custom_dimension", {
      event_category: "Custom Data",
      event_label: "CLS Score",
      value: metric.value,
    });
  }

  // Scroll depth tracking (as part of engagement metrics)
  window.addEventListener("scroll", () => {
    const scrollDepth = Math.round(
      (window.scrollY / document.body.scrollHeight) * 100
    );
    if (scrollDepth > 50) {
      window.gtag("event", "scroll", {
        event_category: "Engagement",
        event_label: `${scrollDepth}%`,
        non_interaction: true,
      });
    }
  });

  // Report time on page
  let startTime = Date.now();
  window.addEventListener("beforeunload", () => {
    let timeSpent = Date.now() - startTime;
    window.gtag("event", "time_on_page", {
      event_category: "Engagement",
      value: timeSpent, // value in ms
    });
  });

  // Error reporting
  window.addEventListener("error", (event) => {
    window.gtag("event", "exception", {
      description: event.message,
      fatal: false, // Set to true if the error is critical
    });
  });
}
