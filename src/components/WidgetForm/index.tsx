import React, { useState } from "react";
import { ClosedButton } from "../ClosedButton";
import bugImg from "../../assets/bug.svg";
import ideiaImg from "../../assets/idea.svg";
import thoughtImg from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";

export const feedBackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImg,
      alt: "imagem de um inseto",
    },
  },
  IDEA: {
    title: "Idéia",
    image: {
      source: ideiaImg,
      alt: "imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outros",
    image: {
      source: thoughtImg,
      alt: "imagem de uma nuvem",
    },
  },
};

export type FeedBackType = keyof typeof feedBackTypes;

export const WidgetForm: React.FC = () => {
  const [feedBackType, setFeedBackType] = useState<FeedBackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleRestartFeedback = () => {
    setFeedbackSent(false);
    setFeedBackType(null);
  };
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSucessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedBackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedBackType} />
          ) : (
            <FeedbackContentStep
              onFeedbackSent={() => setFeedbackSent(true)}
              onFeedbackRestartRequested={handleRestartFeedback}
              feedbackType={feedBackType}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        Feito com ❤️‍🔥 por{" "}
        <a
          href="http://github.com/croschel"
          className="underline underline-offset-2"
        >
          Caique Roschel
        </a>
      </footer>
    </div>
  );
};
