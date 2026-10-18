/**
 * Performance monitoring and optimization utilities
 */

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private marks: Map<string, number> = new Map();

  startMeasure(label: string): void {
    this.marks.set(label, performance.now());
  }

  endMeasure(label: string): number {
    const startTime = this.marks.get(label);
    if (!startTime) {
      console.warn(`No start mark found for ${label}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    const metric: PerformanceMetric = {
      name: label,
      duration,
      timestamp: Date.now(),
    };

    this.metrics.push(metric);
    this.marks.delete(label);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  clearMetrics(): void {
    this.metrics = [];
    this.marks.clear();
  }

  reportMetrics(): void {
    const avgDuration =
      this.metrics.reduce((sum, m) => sum + m.duration, 0) / this.metrics.length || 0;
    console.table({
      Total: this.metrics.length,
      'Avg Duration': `${avgDuration.toFixed(2)}ms`,
      'Max Duration': `${Math.max(...this.metrics.map((m) => m.duration)).toFixed(2)}ms`,
    });
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * Measure component render time
 */
export function measureRender(componentName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const label = `Render ${componentName}`;
      performanceMonitor.startMeasure(label);
      const result = originalMethod.apply(this, args);
      performanceMonitor.endMeasure(label);
      return result;
    };

    return descriptor;
  };
}
