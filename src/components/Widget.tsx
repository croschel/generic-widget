import React from "react";
import { ChatCenteredDots } from "phosphor-react";
// import { Container } from './styles';

export const Widget: React.FC = () => {
  return (
    <button className="bg-violet-500 rounded-full px-3 h-12 text-white">
      <ChatCenteredDots className="w-6 h-6" />
    </button>
  );
};
