type JQueryStatic = (
  element: HTMLElement | null,
) => JQueryRipplesInstance;

type JQueryRipplesInstance = {
  ripples(options?: {
    resolution?: number;
    dropRadius?: number;
    perturbance?: number;
    interactive?: boolean;
  }): JQueryRipplesInstance;
  ripples(
    method: "drop",
    x: number,
    y: number,
    radius: number,
    strength: number,
  ): JQueryRipplesInstance;
  ripples(method: "destroy"): JQueryRipplesInstance;
  ripples(method: "updateSize"): JQueryRipplesInstance;
};

declare module "jquery.ripples";

declare global {
  interface Window {
    jQuery: JQueryStatic;
    $: JQueryStatic;
  }
}
