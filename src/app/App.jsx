import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroScreen from "@/components/intro/IntroScreen";
import QuizScreen from "@/components/quiz/QuizScreen";
import ResultScreen from "@/components/result/ResultScreen";
import LanguageToggle from "@/components/common/LanguageToggle";
import { QUESTIONS } from "@/data/questions";
import { scoreAnswers } from "@/lib/scoring/scoring";
import { orderQuizQuestions } from "@/lib/quiz/orderQuestions";
import { clearQuizCountedSession } from "@/lib/quiz/completionCounter";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocalizedQuestion } from "@/i18n/localize";

const STAGES = {
  INTRO: "intro",
  QUIZ: "quiz",
  RESULT: "result",
};

function App() {
  const { language, t } = useLanguage();
  const [stage, setStage] = useState(STAGES.INTRO);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = quizQuestions[currentIndex];
  const selectedChoice = answers[currentIndex];
  const totalQuestions = quizQuestions.length;

  const localizedQuestion = useMemo(
    () =>
      currentQuestion
        ? getLocalizedQuestion(currentQuestion, language)
        : null,
    [currentQuestion, language]
  );

  const resultPayload = useMemo(() => {
    if (stage !== STAGES.RESULT || quizQuestions.length === 0) return null;
    return scoreAnswers(quizQuestions, answers);
  }, [answers, quizQuestions, stage]);

  const handleStart = () => {
    setQuizQuestions(orderQuizQuestions(QUESTIONS));
    setStage(STAGES.QUIZ);
    setCurrentIndex(0);
    setAnswers({});
  };

  const handleSelectChoice = (choiceIndex) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: choiceIndex }));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (answers[currentIndex] === undefined) return;

    if (currentIndex === totalQuestions - 1) {
      setStage(STAGES.RESULT);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    clearQuizCountedSession();
    setStage(STAGES.INTRO);
    setQuizQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
  };

  return (
    <main className="app-surface relative isolate min-h-screen overflow-x-hidden text-slate-100">
      <div
        className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="app-field-stage">
          <div className="app-field-halo" />
          <div className="app-field" />
        </div>
      </div>
      <div
        className="app-vignette pointer-events-none fixed inset-0 z-[1]"
        aria-hidden
      />
      <div
        className="app-readability-veil pointer-events-none fixed inset-0 z-[2]"
        aria-hidden
      />

      <div className="relative z-10 px-4 py-10 md:px-8">
        <header className="mx-auto mb-8 max-w-5xl">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 backdrop-blur md:flex-row md:items-center md:justify-between md:px-5">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                {t("brand")}
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-400">
                {t("tagline")}
              </span>
            </div>
            <LanguageToggle />
          </div>
        </header>

        <AnimatePresence mode="wait">
          {stage === STAGES.INTRO && <IntroScreen onStart={handleStart} />}

          {stage === STAGES.QUIZ && localizedQuestion && (
            <QuizScreen
              question={localizedQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={totalQuestions}
              selectedChoice={selectedChoice}
              onSelectChoice={handleSelectChoice}
              onPrev={handlePrev}
              onNext={handleNext}
              canGoNext={selectedChoice !== undefined}
            />
          )}

          {stage === STAGES.RESULT && resultPayload && (
            <ResultScreen
              resultPayload={resultPayload}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
