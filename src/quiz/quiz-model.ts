export interface quizCategory {
  id: number;
  name: string;
}

export interface quizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  quizAns?: quizAnswer[];
}

export interface quizAnswer {
  answer: string;
  isSelected: boolean;
  isCorrect: boolean;
}

export interface quizResult {
  question: string;
  quizAns: quizAnswer[];
}
