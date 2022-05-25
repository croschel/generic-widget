import { ArrowLeft } from "phosphor-react";
import React, { FormEvent, useState } from "react";
import { FeedBackType, feedBackTypes } from "..";
import { api } from "../../../services/api";
import { ClosedButton } from "../../ClosedButton";
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../../ScreenshotButton";

interface FeedbackContentProps {
  feedbackType: FeedBackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export const FeedbackContentStep: React.FC<FeedbackContentProps> = ({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}) => {
  const [comment, setComment] = useState<string>("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const feedbackInfo = feedBackTypes[feedbackType];

  const handleSubmitFeedback = async (event: FormEvent) => {
    event.preventDefault();
    setIsSendingFeedback(true);
    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot,
      });
      onFeedbackSent();
    } catch (error) {
      console.log(error);
      throw new Error(
        "It was not possible to submit this feedback! Please try again!"
      );
    }
    setIsSendingFeedback(false);
  };

  return (
    <>
      <header>
        <button
          type="button"
          onClick={onFeedbackRestartRequested}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 whitespace-nowrap flex items-center gap-2">
          <img
            src={feedbackInfo.image.source}
            alt={feedbackInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackInfo.title}
        </span>
        <ClosedButton />
      </header>
      <form className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-400 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={({ target }) => setComment(target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenShotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            onClick={handleSubmitFeedback}
            disabled={comment.length === 0 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
};
