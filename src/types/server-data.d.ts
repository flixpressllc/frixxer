// idea: every request for data gives the url for the next request for data

declare namespace TransitJson {
  interface PresentationBlock {
    metadata: PresentationMetadata;
    layout: PresentationLayout;
    content: PresentationContent;
  }

  interface PresentationMetadata {
    transitionIn: Transition.Any;
    startTimeISOString: string; // ISO timestamp. eg: "2019-01-09T20:22:04.172Z" <- 2:22pm central (8:22pm GMT)
  }

  namespace Transition {
    type GeneralShape<T extends string, S extends any> = {
      type: T;
      settings: S;
    };
    type Any = VideoOverlay | ImageOverlay;

    type VideoOverlay = GeneralShape<
      'video-overlay',
      {
        videoUrl: string;
        swapAtTimeInMilliseconds: number;
      }
    >;

    type ImageOverlay = GeneralShape<
      'image-overlay',
      {
        imageUrl: string;
        duration: number;
      }
    >;
  }

  interface PresentationLayout {
    background: {
      type: 'image' | 'video';
      url: string;
    };
    components: ComponentDefinition[];
  }

  interface ComponentDefinition {
    id: string; // unique within a presentation block: should conform to HTML element.id requirements (no spaces, don't start with a number, etc)
    type: string;
    width: number;
    height: number;
    x: number;
    y: number;
    z?: number;
    contentDataName: DataSet['name']; // refers to the name of data in PresentationContent
  }

  interface PresentationContent {
    dataSets: DataSet[];
  }

  interface DataSet {
    name: string; // unique within within a presentation block
    data: any;
  }
}
