"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { questions } from "@/data/question";
import ProgressBar from "@/components/progress-bar";
import { ChevronLeft, X } from "lucide-react";

export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Todo:
  // Start or Nextボタンを押した時の処理として
  // 1. startedがfalseの場合はtrueに変更してクイズを開始する
  // 2.クイズの質問数がquestions.lengthより小さい場合はcurrentQuestionを1増やす（次の問題へ）
  // 3.解答と正解をリセットする
  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }

    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  // Todo:
  // 解答ボタンを押した時の処理として
  // 1.選択した解答のidをselectedAnswerにセットする
  // 2.選択した解答が正解かどうかを判定する
  // 3.正解の場合はscoreを1増やす
  // 4.解答が正解かどうかをisCorrectにセットして状態管理する

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    const isCurrentAnswerCorrect = answer.isCorrect;
    if (isCurrentAnswerCorrect) {
      setScore(score + 1);
    }
    setIsCorrect(isCurrentAnswerCorrect);
  };

  return (
    <div className="flex flex-col flex-1 mt-10">
      <div className="sticky top-0 z-10 shadow-md py-4 w-full">
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2">
          <Button
            size="icon"
            variant="outline"
          >
            <ChevronLeft />
          </Button>
          <ProgressBar value={(currentQuestion / questions.length) * 100} />
          <Button
            size="icon"
            variant="outline"
          >
            <X />
          </Button>
        </header>
      </div>
      <main className="flex justify-center flex-1">
        {!started ? (
          <h1 className="text-6xl font-bold">Welcome to the quiz page👋</h1>
        ) : (
          <div>
            <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              {questions[currentQuestion].answers.map((answer) => (
                <Button
                  variant={"secondary"}
                  key={answer.id}
                  onClick={() => handleAnswer(answer)}
                >
                  {answer.answerText}
                </Button>
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="pb-9 px-6 relative mb-0">
        <p>{isCorrect ? "correct" : "incorrect"}</p>
        <Button onClick={handleNext}>{!started ? "Start" : "Next"}</Button>
      </footer>
    </div>
  );
}
