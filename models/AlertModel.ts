export type Alert = {
  id: any;
  text: string;
  type: "danger" | "success" | "warning";
  tailwindClasses?: string;
}