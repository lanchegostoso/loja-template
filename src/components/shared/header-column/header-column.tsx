import React from 'react';
import { IconType } from 'react-icons';

interface IconTextComponentProps {
  icon: IconType;
  text: string;
  iconColor?: string;
  iconSize?: number;
  textBold?: boolean;
}

export const HeaderColumn: React.FC<IconTextComponentProps> = ({ icon: Icon, text, iconSize = 50, iconColor = 'text-gray-700' ,  textBold = false }) => {
  return (
    <header className="flex px-4 flex-col items-center gap-2">
      <Icon className={iconColor} size={iconSize} />
      <h6 className={`${textBold ? 'font-bold' : ''} text-center`}>{text}</h6>
    </header>
  );
};
