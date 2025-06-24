  import { ItineraryProvider, ItineraryHost, ItineraryItem } from 'react-itinerary';

  const App = () => (
    <ItineraryProvider>
      <div>
        <ItineraryHost
          id="mediaTimeline"
          render={updateItinerary => (
            <video
              controls
              src="your-video-source.mp4"
              onTimeUpdate={e => updateItinerary('mediaTimeline', e.currentTarget.currentTime)}
            />
          )}
        />
        <ItineraryItem
          id="mediaTimeline"
          start={5}
          end={10}
          onActivated={() => console.log('active!')}
          onDeactivated={() => console.log('inactive!')}
          render={active => (
            <h1 style={{ color: active ? 'red' : 'dodgerblue' }}>Itinerary Item</h1>
          )}
        />
      </div>
    </ItineraryProvider>
  );

  export default App;
