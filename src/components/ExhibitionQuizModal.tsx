import React, { useState } from 'react';
import { X, Award, CheckCircle, HelpCircle, RefreshCw, Sparkles } from 'lucide-react';

interface Question {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    prompt: 'What is the formula for the Total Surface Area (TSA) of a cube of edge length "a"?',
    options: ['4a²', '6a²', 'a³', '2a(a + 1)'],
    correctIndex: 1,
    explanation: 'A cube has 6 congruent square faces, each of area a². Therefore, TSA = 6a².',
  },
  {
    prompt: 'How many curved surfaces and circular bases does a right circular cylinder have?',
    options: [
      '1 curved surface and 1 circular base',
      '2 curved surfaces and 2 circular bases',
      '1 curved surface and 2 circular bases',
      '0 curved surfaces and 2 circular bases',
    ],
    correctIndex: 2,
    explanation: 'A cylinder has 1 continuous curved lateral surface joining 2 congruent parallel circular bases.',
  },
  {
    prompt: 'For a cone, what is the mathematical relation between slant height (l), vertical height (h), and radius (r)?',
    options: ['l = r + h', 'l = √(r² + h²)', 'l = √(r² - h²)', 'l = 2πrh'],
    correctIndex: 1,
    explanation: 'By the Pythagorean theorem on the right triangle formed inside the cone, l² = r² + h², so l = √(r² + h²).',
  },
  {
    prompt: 'What is the volume of a solid hemisphere of radius "r"?',
    options: ['⁴⁄₃πr³', '2πr²', '⅔πr³', '3πr²'],
    correctIndex: 2,
    explanation: 'A hemisphere is exactly half of a full sphere, so its volume is ½ × (⁴⁄₃πr³) = ⅔πr³.',
  },
  {
    prompt: 'How many vertices does a sphere have?',
    options: ['0', '1', '2', 'Infinite'],
    correctIndex: 0,
    explanation: 'A sphere is a perfectly continuous curved surface with zero edges and zero sharp corners/vertices.',
  },
];

interface ExhibitionQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExhibitionQuizModal: React.FC<ExhibitionQuizModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (showAnswer) return;
    setSelectedOption(idx);
    setShowAnswer(true);
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-3xl bg-[#091124] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              Science Exhibition Challenge
            </span>
            <h3 className="text-xl font-bold text-white">
              3D Geometry Quiz Challenge
            </h3>
          </div>
        </div>

        {!quizFinished ? (
          <div>
            {/* Progress bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="font-mono text-cyan-400 font-bold">Score: {score}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-5">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question prompt */}
            <h4 className="text-sm sm:text-base font-semibold text-white mb-4 leading-relaxed">
              {currentQ.prompt}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, i) => {
                let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-cyan-500/40 hover:bg-slate-900';
                if (showAnswer) {
                  if (i === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold';
                  } else if (i === selectedOption) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    disabled={showAnswer}
                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showAnswer && i === currentQ.correctIndex && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showAnswer && (
              <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-cyan-400 block mb-0.5">Explanation:</span>
                {currentQ.explanation}
              </div>
            )}

            {/* Next Button */}
            {showAnswer && (
              <div className="mt-5 flex justify-end">
                <button
                  onClick={handleNext}
                  className="py-2.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-lg"
                >
                  {currentIdx + 1 === QUIZ_QUESTIONS.length ? 'See Results' : 'Next Question'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-4 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Sparkles className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-black text-white mb-1">
              Quiz Completed!
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Here is how you scored on the 3D Geometry Challenge:
            </p>

            <div className="text-4xl font-black font-mono text-cyan-300 my-4">
              {score} / {QUIZ_QUESTIONS.length}
            </div>

            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
              {score === 5
                ? '🌟 Flawless score! You are a master of 3D geometry and formulas.'
                : score >= 3
                ? '👏 Great job! You have a solid grasp of 3D solids and surface areas.'
                : '💡 Keep exploring the shape pages and live calculators to master the formulas!'}
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="py-2.5 px-5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
              >
                Back to Shapes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
