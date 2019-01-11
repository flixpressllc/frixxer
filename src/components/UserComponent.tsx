import React from 'react';

export interface UserComponentProps {
  comId: TransitJson.ComponentDefinition['id'];
  comType: TransitJson.ComponentDefinition['type'];
  comDataId: TransitJson.ComponentDefinition['contentDataId'];
  comWidth: TransitJson.ComponentDefinition['width'];
  comHeight: TransitJson.ComponentDefinition['height'];
  comX: TransitJson.ComponentDefinition['x'];
  comY: TransitJson.ComponentDefinition['y'];
  comZ?: TransitJson.ComponentDefinition['z'];
}

function UserComponent(props: UserComponentProps) {
  // determine the component to use
  // find the data to pass in
  // render

  // Fake version:
  const {
    comWidth: twidth,
    comHeight: theight,
    comX: tleft,
    comY: ttop,
    comZ: zIndex,
  } = props;
  const [width, height, left, top] = [twidth, theight, tleft, ttop].map(
    n => `${n}px`,
  );
  return (
    <div
      className="group absolute text-xs overflow-auto bg-shade-light p-2 border-shade-lighter border"
      style={{ width, height, top, left, zIndex }}
    >
      <div className="bg-grey-lighter inline-block p-1 invisible group-hover:visible">
        <div> Id: {props.comId} </div>
        <div> Type: {props.comType} </div>
        <div> DataId: {props.comDataId} </div>
        <div>
          Dimensions: {props.comWidth} x {props.comHeight}
        </div>
        <div>
          Position: ({props.comX}px, {props.comY}px)
        </div>
        <div> Z: {props.comZ} </div>
      </div>
    </div>
  );
}

export default UserComponent;
