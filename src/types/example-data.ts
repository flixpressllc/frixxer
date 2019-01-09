const examplePresentationBlock: TransitJson.PresentationBlock = {
  metadata: {
    startTimeISOString: '2019-04-01T00:00:00.000Z', // Midnight, April Fool's (GMT)
    transitionIn: {
      type: 'video-overlay',
      settings: {
        videoUrl: 'http://localhost:3000/transitions/1.webm',
        swapAtTimeInMilliseconds: 500,
      },
    },
  },
  content: {
    dataSets: [
      {
        name: 'ads-for-rotation',
        data: [
          'http://ads.com/1.jpg',
          'http://ads.com/2.jpg',
          'http://ads.com/3.jpg',
          'http://ads.com/4.jpg',
          'http://ads.com/5.jpg',
          'http://ads.com/6.jpg',
        ],
      },
      {
        name: 'main-videos',
        data: [
          { title: 'Splashdown!', url: 'http://videos.com/1.mp4' },
          { title: 'Why choose one dessert?', url: 'http://videos.com/2.mp4' },
          { title: 'True Facts: Tapir', url: 'http://videos.com/3.mp4' },
        ],
      },
      {
        name: 'channel-logo',
        data: 'http://logos.com/1.png',
      },
    ],
  },
  layout: {
    background: {
      type: 'image',
      url: 'http://backgrounds-r-us.com/first.jpg',
    },
    components: [
      {
        id: 'ad-1',
        type: 'rotating-ads',
        width: 300,
        height: 200,
        x: 0,
        y: 0,
        contentDataId: 'ads-for-rotation',
      },
      {
        id: 'main-video',
        type: 'video-with-up-next',
        width: 300,
        height: 200,
        x: 0,
        y: 0,
        contentDataId: 'main-videos',
      },
      {
        id: 'logo',
        type: 'static-image',
        width: 300,
        height: 200,
        x: 0,
        y: 0,
        contentDataId: 'channel-logo',
      },
    ],
  },
};

export {};
