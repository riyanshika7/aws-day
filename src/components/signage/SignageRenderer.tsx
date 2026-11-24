import React, { useState, useEffect } from 'react';
import type { Signboard } from '../../types/signage';
import { generateQrDataUrl } from '../../utils/qrGenerator';

import { EntranceWelcomeTemplate } from './templates/EntranceWelcomeTemplate';
import { DirectionalArrowTemplate } from './templates/DirectionalArrowTemplate';
import { JunctionSignTemplate } from './templates/JunctionSignTemplate';
import { VenueArrivalTemplate } from './templates/VenueArrivalTemplate';
import { RegistrationCheckinTemplate } from './templates/RegistrationCheckinTemplate';
import { ParkingAccessibilityTemplate } from './templates/ParkingAccessibilityTemplate';

interface SignageRendererProps {
  signboard: Signboard;
  className?: string;
}

export const SignageRenderer: React.FC<SignageRendererProps> = ({
  signboard,
  className = '',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const urlToEncode = signboard.qrUrl || window.location.href;

    generateQrDataUrl(urlToEncode, '#232f3e', '#ffffff').then((dataUrl) => {
      if (isMounted) {
        setQrDataUrl(dataUrl);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [signboard.qrUrl, signboard.id]);

  const renderTemplate = () => {
    switch (signboard.type) {
      case 'entrance_welcome':
        return <EntranceWelcomeTemplate signboard={signboard} qrDataUrl={qrDataUrl} />;
      case 'directional_arrow':
        return <DirectionalArrowTemplate signboard={signboard} qrDataUrl={qrDataUrl} />;
      case 'junction_sign':
        return <JunctionSignTemplate signboard={signboard} qrDataUrl={qrDataUrl} />;
      case 'venue_arrival':
        return <VenueArrivalTemplate signboard={signboard} qrDataUrl={qrDataUrl} />;
      case 'registration_checkin':
        return <RegistrationCheckinTemplate signboard={signboard} qrDataUrl={qrDataUrl} />;
      case 'parking_accessibility':
        return <ParkingAccessibilityTemplate signboard={signboard} qrDataUrl={qrDataUrl} />;
      default:
        return <DirectionalArrowTemplate signboard={signboard} qrDataUrl={qrDataUrl} />;
    }
  };

  return <div className={`signage-print-target ${className}`}>{renderTemplate()}</div>;
};
