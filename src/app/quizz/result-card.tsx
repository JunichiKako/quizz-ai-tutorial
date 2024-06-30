type ResultCardProps = {
  isCorrect: boolean | null;
  correctAnswer: string;
};

export default function ResultCard({ isCorrect, correctAnswer }: ResultCardProps) {
  if (isCorrect === null) {
    return null;
  }

  return <div></div>;
}
