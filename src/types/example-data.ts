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
        name: 'ad-images-rotator',
        data: {
          defaultDurationInMilliseconds: 5000,
          ads: [
            { id: 'some-id-1', url: 'http://ads.com/1.jpg' },
            { id: 'some-id-2', url: 'http://ads.com/2.jpg' },
            {
              id: 'some-id-3',
              url: 'http://ads.com/3.jpg',
              durationInMilliseconds: 8000,
            },
            { id: 'some-id-4', url: 'http://ads.com/4.jpg' },
            { id: 'some-id-5', url: 'http://ads.com/5.jpg' },
            { id: 'some-id-6', url: 'http://ads.com/6.jpg' },
          ],
        },
      },
      {
        name: 'main-videos-with-up-next',
        data: [
          {
            id: 'ANY_ID_STRING1',
            title: 'Splashdown!',
            url: 'http://videos.com/1.mp4',
          },
          {
            id: 'ANY_ID_STRING2',
            title: 'Why choose one dessert?',
            url: 'http://videos.com/2.mp4',
          },
          {
            id: 'ANY_ID_STRING3',
            title: 'True Facts: Tapir',
            url: 'http://videos.com/3.mp4',
          },
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
        contentDataName: 'ads-for-rotation',
      },
      {
        id: 'main-video',
        type: 'video-with-up-next',
        width: 300,
        height: 200,
        x: 0,
        y: 0,
        contentDataName: 'main-videos',
      },
      {
        id: 'logo',
        type: 'static-image',
        width: 300,
        height: 200,
        x: 0,
        y: 0,
        contentDataName: 'channel-logo',
      },
    ],
  },
};

export {};
