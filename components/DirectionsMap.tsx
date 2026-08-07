'use client';

import { useCallback, useState } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Coordinates } from '@/types/content';

type DirectionsMapProps = {
  destination: Coordinates;
  destinationName: string;
};

const MAP_CONTAINER_STYLE = { width: '100%', height: '320px' };
const MAP_OPTIONS = { streetViewControl: false, mapTypeControl: false };

export function DirectionsMap({ destination, destinationName }: DirectionsMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  const [origin, setOrigin] = useState('');
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDirections = useCallback(
    (originInput: string | google.maps.LatLngLiteral) => {
      if (!isLoaded) return;
      setLoading(true);
      setError(null);
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: originInput,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          setLoading(false);
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            setDirections(null);
            setError('Could not find directions for that starting point.');
          }
        }
      );
    },
    [isLoaded, destination]
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!origin.trim()) return;
    fetchDirections(origin.trim());
  }

  if (loadError) {
    return (
      <p className="text-[15px] text-neutral-300">
        The map could not be loaded right now.
      </p>
    );
  }

  const leg = directions?.routes[0]?.legs[0];

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={origin}
          onChange={(event) => setOrigin(event.target.value)}
          placeholder="Enter a starting point (e.g. Accra)"
          className="flex-1 border border-rule bg-black px-4 py-2.5 text-[15px] text-white placeholder:text-neutral-500 focus:border-flagGold focus:outline-none"
        />
        <button
          type="submit"
          disabled={!isLoaded || loading}
          className="bg-flagRed px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white transition hover:bg-[#700000] disabled:opacity-50">
          {loading ? 'Finding route…' : 'Get directions'}
        </button>
      </form>

      {error && <p className="mt-3 text-[14px] text-flagRed">{error}</p>}

      <div className="relative mt-5 h-[320px] w-full overflow-hidden">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={MAP_CONTAINER_STYLE}
            center={destination}
            zoom={directions ? 11 : 14}
            options={MAP_OPTIONS}>
            {!directions && <Marker position={destination} title={destinationName} />}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-[14px] text-neutral-400">
            Loading map…
          </div>
        )}
      </div>

      {leg && (
        <div className="mt-5 border-l-4 border-flagGreen bg-flagGreen/10 p-5">
          <p className="text-[16px] font-bold text-white">
            {leg.distance?.text} &middot; {leg.duration?.text} drive
          </p>
          <p className="mt-1 text-[14px] text-neutral-300">
            From {leg.start_address} to {leg.end_address}
          </p>
          <ol className="mt-4 space-y-3 text-[14px] text-neutral-300">
            {leg.steps.map((step, i) => (
              <li
                key={i}
                className="border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
                <span dangerouslySetInnerHTML={{ __html: step.instructions }} />
                <span className="ml-1 text-neutral-500">
                  ({step.distance?.text})
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
