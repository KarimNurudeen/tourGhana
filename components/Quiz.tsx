'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckIcon, XIcon } from 'lucide-react';
import { quizQuestions } from '@/data/quiz';
import { SectionHeading } from './SectionHeading';

export function Quiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const total = quizQuestions.length;
  const finished = index >= total;
  const current = quizQuestions[index];

  function selectOption(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === current.correctAnswer) {
      setScore((s) => s + 1);
    }
  }

  function nextQuestion() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  function restart() {
    setSelected(null);
    setScore(0);
    setIndex(0);
  }

  return (
    <div>
      <SectionHeading title="Quiz" />

      {finished ? (
        <div className="mt-6 text-center">
          <p className="text-[15px] font-bold uppercase tracking-wide text-white">
            Quiz complete
          </p>
          <p className="mt-3 text-[40px] font-black leading-none text-white">
            {score}/{total}
          </p>
          <p className="mt-2 text-[14px] text-neutral-200">
            {score === total
              ? 'Perfect score.'
              : score >= total / 2
              ? 'Solid knowledge of Ghana.'
              : 'Worth another go.'}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-5 border-2 border-flagGold px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white transition hover:bg-flagGold hover:text-black">
            Play again
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 flex items-center justify-between text-[15px] font-bold text-white">
            <span>
              {index + 1}/{total}
            </span>
            <span>{score} correct</span>
          </div>

          <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl">
            <Image
              src={current.image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, 100vw"
            />
          </div>

          <p className="mt-3 text-[13px] font-semibold uppercase tracking-wide text-flagGold">
            {current.category}
          </p>
          <h3 className="mt-2 text-[19px] font-bold leading-snug text-white">
            {current.question}
          </h3>

          <ul className="mt-4 space-y-2.5">
            {current.options.map((option) => {
              const isSelected = selected === option;
              const isCorrectOption = option === current.correctAnswer;
              const revealed = selected !== null;

              let stateClasses = 'border-white/30 text-white hover:border-flagGold';
              if (revealed && isCorrectOption) {
                stateClasses = 'border-flagGreen bg-flagGreen font-semibold text-white';
              } else if (revealed && isSelected && !isCorrectOption) {
                stateClasses = 'border-flagRed bg-flagRed font-semibold text-white';
              } else if (revealed) {
                stateClasses = 'border-white/10 text-neutral-300';
              }

              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => selectOption(option)}
                    disabled={revealed}
                    aria-pressed={isSelected}
                    className={`flex w-full items-center justify-between gap-2 border-2 px-4 py-3 text-left text-[16px] transition ${stateClasses}`}>
                    {option}
                    {revealed && isCorrectOption && <CheckIcon className="h-5 w-5 shrink-0" />}
                    {revealed && isSelected && !isCorrectOption && (
                      <XIcon className="h-5 w-5 shrink-0" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {selected && (
            <button
              type="button"
              onClick={nextQuestion}
              className="mt-4 w-full border-2 border-flagGold bg-flagGold px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-black transition hover:bg-white">
              {index + 1 === total ? 'See results' : 'Next question'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
