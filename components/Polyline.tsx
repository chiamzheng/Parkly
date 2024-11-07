import React, { useEffect, useState } from 'react';
import { Polyline } from 'react-native-maps';
import { getRoutePolyline } from './Service/locationService';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface PolylineComponentProps {
  start: Coordinate;
  end: Coordinate;
}

const PolylineComponent: React.FC<PolylineComponentProps> = ({ start, end }) => {
  const [polylineCoords, setPolylineCoords] = useState<Array<{ latitude: number; longitude: number }>>([]);

  useEffect(() => {
    const fetchPolyline = async () => {
      try {
        const data = await getRoutePolyline(start, end);
        setPolylineCoords(data);
      } catch (error) {
        console.error('Error setting polyline:', error);
      }
    };

    fetchPolyline();
  }, [start, end]);

  return (
    <Polyline
      coordinates={polylineCoords}
      strokeColor="#FF0000"
      strokeWidth={3}
    />
  );
};

export default PolylineComponent;
