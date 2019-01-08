export interface UserComponentProps<T extends any> {
  comType: TransitJson.ComponentDefinition['type'];
  comData: T;
  comWidth: TransitJson.ComponentDefinition['width'];
  comHeight: TransitJson.ComponentDefinition['height'];
  comX: TransitJson.ComponentDefinition['x'];
  comY: TransitJson.ComponentDefinition['y'];
  comZ?: TransitJson.ComponentDefinition['z'];
}
