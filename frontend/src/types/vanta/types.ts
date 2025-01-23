export interface CloudsParams {
   el: string;
   mouseControls: boolean;
   touchControls: boolean;
   gyroControls: boolean;
   minHeight: number;
   minWidth: number;
   backgroundColor: number;
   skyColor: number;
   cloudColor: number;
   cloudShadowColor: number;
   sunColor: number;
   sunGlareColor: number;
   sunlightColor: number;
   speed: number;
}
 
export interface CloudsInstance {
   setOptions: (options: CloudsParams | CloudsUpdate) => CloudsInstance;
   resize: () => void;
   destroy: () => void;
}
 
export interface CloudsUpdate {
  backgroundColor: number;
  skyColor: number;
  cloudColor: number;
  cloudShadowColor: number;
  sunColor: number;
  sunGlareColor: number;
  sunlightColor: number;
  speed: number;
}