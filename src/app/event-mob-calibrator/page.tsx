import MapCalibrator from '@/tools/event-mob-calibrator/MapCalibrator';

export const metadata = {
  title: 'Event Mob Map Calibrator',
  description: 'Calibrate map coordinates for event mob locations',
};

export default function EventMobCalibratorPage() {
  return <MapCalibrator />;
}