import React from "react";
import { FeedBackType, feedBackTypes } from "..";
import { ClosedButton } from "../../ClosedButton";

interface FeedbackTypeProps {
  onFeedbackTypeChanged: (type: FeedBackType) => void;
}

export const FeedbackTypeStep: React.FC<FeedbackTypeProps> = ({
  onFeedbackTypeChanged,
}) => {
  return (
    <>
      <header>
        <span className="text-xl leading-6 whitespace-nowrap">
          Deixe seu feedback
        </span>
        <ClosedButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedBackTypes).map(([key, value]) => (
          <button
            key={key}
            className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus-visible:outline"
            onClick={() => onFeedbackTypeChanged(key as FeedBackType)}
            type="button"
          >
            <img src={value.image.source} alt={value.image.alt} />
            <span>{value.title}</span>
          </button>
        ))}
      </div>
    </>
  );
};
