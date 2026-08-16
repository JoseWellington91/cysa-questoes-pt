import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { questions, type Question } from "@/data/questions";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Trophy,
  ListChecks,
  Clock,
  Brain,
  Filter,
} from "lucide-react";

const MODULE_RANGES: { label: string; start: number; end: number }[] = [
  { label: "Todos", start: 1, end: 259 },
  { label: "Mód 1: Controles & Risco", start: 1, end: 21 },
  { label: "Mód 2: Threat Intel & Hunting", start: 22, end: 48 },
  { label: "Mód 3: Infra & Arquitetura", start: 49, end: 69 },
  { label: "Mód 4: Automação & SOC", start: 70, end: 81 },
  { label: "Mód 5: Vulnerability Mgmt", start: 82, end: 103 },
  { label: "Mód 6: CVSS & Priorização", start: 104, end: 118 },
  { label: "Mód 7: Relatórios & Gestão", start: 119, end: 132 },
  { label: "Mód 8: Resposta a Incidentes", start: 133, end: 153 },
  { label: "Mód 9: Métricas & Comunicação", start: 154, end: 169 },
  { label: "Mód 10: Ferramentas & Frameworks", start: 170, end: 186 },
  { label: "Mód 11: Análise de Rede", start: 187, end: 206 },
  { label: "Mód 12: Segurança Web & Cloud", start: 207, end: 216 },
  { label: "Mód 13: Automação & Logs", start: 217, end: 236 },
  { label: "Mód 14: AppSec & OWASP", start: 237, end: 259 },
];

function getFilteredQuestions(moduleFilter: string): Question[] {
  const mod = MODULE_RANGES.find((m) => m.label === moduleFilter);
  if (!mod || mod.label === "Todos") return questions;
  return questions.filter((q) => q.id >= mod.start && q.id <= mod.end);
}

type AnswerState = Record<number, Set<string>>;

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [examMode, setExamMode] = useState(false);
  const [moduleFilter, setModuleFilter] = useState("Todos");

  const filteredQuestions = useMemo(
    () => getFilteredQuestions(moduleFilter),
    [moduleFilter]
  );

  const currentQuestion = filteredQuestions[currentIndex];
  const totalQuestions = filteredQuestions.length;

  const selectedAnswers = useMemo(
    () => answers[currentQuestion?.id ?? -1] ?? new Set<string>(),
    [answers, currentQuestion?.id]
  );

  const isSubmitted = submitted[currentQuestion.id] ?? false;

  const toggleAnswer = useCallback(
    (letter: string) => {
      if (isSubmitted || !currentQuestion) return;
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        const currentSet = new Set(prev[currentQuestion.id] ?? new Set<string>());
        if (currentQuestion.multipleChoice) {
          if (currentSet.has(letter)) {
            currentSet.delete(letter);
          } else {
            currentSet.add(letter);
          }
        } else {
          currentSet.clear();
          currentSet.add(letter);
        }
        newAnswers[currentQuestion.id] = currentSet;
        return newAnswers;
      });
    },
    [isSubmitted, currentQuestion]
  );

  const handleSubmit = useCallback(() => {
    if (selectedAnswers.size === 0 || !currentQuestion) return;
    setSubmitted((prev) => ({ ...prev, [currentQuestion.id]: true }));
  }, [selectedAnswers, currentQuestion?.id]);

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentIndex(index);
      }
    },
    [totalQuestions]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, totalQuestions]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleReset = useCallback(() => {
    setAnswers({});
    setSubmitted({});
    setShowResults(false);
    setCurrentIndex(0);
  }, []);

  const handleModuleChange = useCallback((mod: string) => {
    setModuleFilter(mod);
    setAnswers({});
    setSubmitted({});
    setShowResults(false);
    setCurrentIndex(0);
  }, []);

  const answeredCount = useMemo(
    () => Object.keys(answers).filter((id) => answers[+id].size > 0).length,
    [answers]
  );

  const correctCount = useMemo(() => {
    return filteredQuestions.filter((q) => {
      const userAnswers = answers[q.id] ?? new Set<string>();
      if (userAnswers.size === 0) return false;
      const correctLetters = q.options
        .filter((o) => o.correct)
        .map((o) => o.letter);
      if (userAnswers.size !== correctLetters.length) return false;
      return correctLetters.every((letter) => userAnswers.has(letter));
    }).length;
  }, [answers]);

  const submittedCount = useMemo(
    () => Object.keys(submitted).filter((id) => submitted[+id]).length,
    [submitted]
  );

  const isCurrentCorrect = useMemo(() => {
    if (!isSubmitted || !currentQuestion) return false;
    const correctLetters = currentQuestion.options
      .filter((o) => o.correct)
      .map((o) => o.letter);
    if (selectedAnswers.size !== correctLetters.length) return false;
    return correctLetters.every((letter) => selectedAnswers.has(letter));
  }, [isSubmitted, currentQuestion, selectedAnswers]);

  const progressValue = (answeredCount / totalQuestions) * 100;

  // Results screen
  if (showResults) {
    return (
      <ResultsScreen
        correctCount={correctCount}
        totalQuestions={totalQuestions}
        answers={answers}
        filteredQuestions={filteredQuestions}
        onReset={handleReset}
        onReview={(id) => {
          const idx = filteredQuestions.findIndex((q) => q.id === id);
          if (idx >= 0) {
            setShowResults(false);
            setCurrentIndex(idx);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/15 border border-primary/30">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-mono-display text-sm font-bold tracking-tight text-foreground">
                CySA+ Treino
              </h1>
              <p className="text-xs text-muted-foreground">
                Questões em Português
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={examMode ? "default" : "outline"}
              size="sm"
              onClick={() => setExamMode(!examMode)}
              className="font-mono-display text-xs"
            >
              {examMode ? (
                <>
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  Modo Estudo
                </>
              ) : (
                <>
                  <Brain className="w-3.5 h-3.5 mr-1.5" />
                  Modo Simulado
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Module filter + Progress bar */}
      <div className="border-b border-border bg-card/40">
        <div className="container py-3">
          <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
            <Filter className="w-3.5 h-3.5 text-primary shrink-0" />
            {MODULE_RANGES.map((mod) => (
              <button
                key={mod.label}
                onClick={() => handleModuleChange(mod.label)}
                className={`font-mono-display text-xs px-3 py-1.5 rounded-md whitespace-nowrap transition-all ${
                  moduleFilter === mod.label
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground border border-border hover:border-primary/30"
                }`}
              >
                {mod.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono-display text-xs text-muted-foreground">
              Progresso: {answeredCount}/{totalQuestions}
            </span>
            <span className="font-mono-display text-xs text-muted-foreground">
              {Math.round(progressValue)}%
            </span>
          </div>
          <Progress value={progressValue} className="h-1.5" />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 container py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Question card */}
          <div className="space-y-4">
            <Card className="p-6 lg:p-8 border-border bg-card shadow-lg">
              {/* Question header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono-display text-2xl font-bold text-primary">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <Badge variant="secondary" className="font-mono-display text-xs">
                      {currentQuestion.category}
                    </Badge>
                  </div>
                </div>
                {currentQuestion.multipleChoice && (
                  <Badge variant="outline" className="text-xs border-primary/40 text-primary">
                    Múltipla escolha ({currentQuestion.selectCount})
                  </Badge>
                )}
              </div>

              {/* Question text */}
              <p className="text-base lg:text-lg leading-relaxed text-foreground mb-6">
                {currentQuestion.question}
              </p>

              <Separator className="mb-6" />

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswers.has(option.letter);
                  const showCorrect = isSubmitted && option.correct;
                  const showWrong = isSubmitted && isSelected && !option.correct;

                  return (
                    <button
                      key={option.letter}
                      onClick={() => toggleAnswer(option.letter)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group ${
                        showCorrect
                          ? "border-primary/60 bg-primary/10"
                          : showWrong
                          ? "border-destructive/60 bg-destructive/10"
                          : isSelected
                          ? "border-primary/40 bg-primary/5"
                          : "border-border bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50"
                      } ${isSubmitted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex items-center justify-center w-7 h-7 rounded-md font-mono-display text-sm font-bold shrink-0 transition-colors ${
                            showCorrect
                              ? "bg-primary text-primary-foreground"
                              : showWrong
                              ? "bg-destructive text-destructive-foreground"
                              : isSelected
                              ? "bg-primary/20 text-primary border border-primary/40"
                              : "bg-muted text-muted-foreground border border-border"
                          }`}
                        >
                          {option.letter}
                        </div>
                        <span className="text-sm lg:text-base leading-relaxed pt-0.5">
                          {option.text}
                        </span>
                        {showCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 ml-auto" />
                        )}
                        {showWrong && (
                          <XCircle className="w-5 h-5 text-destructive shrink-0 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Submit button */}
              {!isSubmitted && (
                <div className="mt-6">
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedAnswers.size === 0}
                    className="w-full font-mono-display text-sm h-11"
                    size="lg"
                  >
                    <ListChecks className="w-4 h-4 mr-2" />
                    Confirmar Resposta
                  </Button>
                </div>
              )}

              {/* Explanation */}
              {isSubmitted && (
                <div className="mt-6 space-y-4">
                  {/* Result banner */}
                  <div
                    className={`p-4 rounded-lg border flex items-center gap-3 ${
                      isCurrentCorrect
                        ? "border-primary/40 bg-primary/10"
                        : "border-destructive/40 bg-destructive/10"
                    }`}
                  >
                    {isCurrentCorrect ? (
                      <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                    ) : (
                      <ShieldAlert className="w-6 h-6 text-destructive shrink-0" />
                    )}
                    <div>
                      <p
                        className={`font-mono-display text-sm font-bold ${
                          isCurrentCorrect ? "text-primary" : "text-destructive"
                        }`}
                      >
                        {isCurrentCorrect ? "Resposta Correta!" : "Resposta Incorreta"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {isCurrentCorrect
                          ? "Você dominou este conceito."
                          : "Revise a explicação abaixo para entender melhor."}
                      </p>
                    </div>
                  </div>

                  {/* Explanation text */}
                  {!examMode && (
                    <div className="p-5 rounded-lg border border-border bg-secondary/20">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="font-mono-display text-xs font-semibold text-primary uppercase tracking-wider">
                          Explicação
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {examMode && (
                    <div className="p-4 rounded-lg border border-border bg-secondary/20 text-center">
                      <p className="text-sm text-muted-foreground">
                        Modo Simulado: a explicação será exibida na tela de resultados.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="font-mono-display text-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1.5" />
                Anterior
              </Button>
              <span className="font-mono-display text-xs text-muted-foreground">
                {currentIndex + 1} / {totalQuestions}
              </span>
              {currentIndex < totalQuestions - 1 ? (
                <Button
                  variant="outline"
                  onClick={handleNext}
                  className="font-mono-display text-sm"
                >
                  Próxima
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Button>
              ) : (
                <Button
                  onClick={() => setShowResults(true)}
                  disabled={submittedCount === 0}
                  className="font-mono-display text-sm"
                >
                  <Trophy className="w-4 h-4 mr-1.5" />
                  Ver Resultados
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar - Question navigator */}
          <div className="hidden lg:block">
            <Card className="p-4 border-border bg-card sticky top-32">
              <div className="flex items-center gap-2 mb-4">
                <ListChecks className="w-4 h-4 text-primary" />
                <span className="font-mono-display text-xs font-semibold text-primary uppercase tracking-wider">
                  Navegação
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {filteredQuestions.map((q, idx) => {
                  const userAns = answers[q.id] ?? new Set<string>();
                  const isAnswered = userAns.size > 0;
                  const isSubmittedQ = submitted[q.id] ?? false;
                  const correctLetters = q.options
                    .filter((o) => o.correct)
                    .map((o) => o.letter);
                  const isCorrect =
                    isSubmittedQ &&
                    userAns.size === correctLetters.length &&
                    correctLetters.every((l) => userAns.has(l));
                  const isWrong = isSubmittedQ && !isCorrect;
                  const isCurrent = idx === currentIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => goToQuestion(idx)}
                      className={`aspect-square rounded-md font-mono-display text-xs font-bold transition-all ${
                        isCurrent
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                          : ""
                      } ${
                        isCorrect
                          ? "bg-primary text-primary-foreground"
                          : isWrong
                          ? "bg-destructive text-destructive-foreground"
                          : isAnswered
                          ? "bg-primary/20 text-primary border border-primary/40"
                          : "bg-secondary text-muted-foreground border border-border hover:border-primary/30"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span className="text-muted-foreground">Correta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-destructive" />
                  <span className="text-muted-foreground">Incorreta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary/20 border border-primary/40" />
                  <span className="text-muted-foreground">Respondida</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-secondary border border-border" />
                  <span className="text-muted-foreground">Não respondida</span>
                </div>
              </div>
              <Separator className="my-4" />
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full font-mono-display text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                Reiniciar
              </Button>
            </Card>
          </div>
        </div>
      </main>

      {/* Mobile navigator */}
      <div className="lg:hidden border-t border-border bg-card/80 backdrop-blur-xl sticky bottom-0">
        <div className="container py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {filteredQuestions.map((q, idx) => {
              const userAns = answers[q.id] ?? new Set<string>();
              const isAnswered = userAns.size > 0;
              const isSubmittedQ = submitted[q.id] ?? false;
              const correctLetters = q.options
                .filter((o) => o.correct)
                .map((o) => o.letter);
              const isCorrect =
                isSubmittedQ &&
                userAns.size === correctLetters.length &&
                correctLetters.every((l) => userAns.has(l));
              const isWrong = isSubmittedQ && !isCorrect;
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(idx)}
                  className={`flex-shrink-0 w-9 h-9 rounded-md font-mono-display text-xs font-bold transition-all ${
                    isCurrent ? "ring-2 ring-primary" : ""
                  } ${
                    isCorrect
                      ? "bg-primary text-primary-foreground"
                      : isWrong
                      ? "bg-destructive text-destructive-foreground"
                      : isAnswered
                      ? "bg-primary/20 text-primary border border-primary/40"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Results Screen Component
function ResultsScreen({
  correctCount,
  totalQuestions,
  answers,
  filteredQuestions,
  onReset,
  onReview,
}: {
  correctCount: number;
  totalQuestions: number;
  answers: AnswerState;
  filteredQuestions: Question[];
  onReset: () => void;
  onReview: (id: number) => void;
}) {
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const passed = percentage >= 80;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/15 border border-primary/30">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-mono-display text-sm font-bold tracking-tight text-foreground">
                Resultados
              </h1>
              <p className="text-xs text-muted-foreground">
                CySA+ Treino
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8 lg:py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Score card */}
          <Card className="p-8 border-border bg-card shadow-lg text-center">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                passed
                  ? "bg-primary/15 border-2 border-primary/40"
                  : "bg-destructive/15 border-2 border-destructive/40"
              }`}
            >
              {passed ? (
                <Trophy className="w-10 h-10 text-primary" />
              ) : (
                <ShieldAlert className="w-10 h-10 text-destructive" />
              )}
            </div>
            <h2 className="font-mono-display text-3xl font-bold mb-2">
              {percentage}%
            </h2>
            <p className="text-sm text-muted-foreground mb-1">
              {correctCount} de {totalQuestions} questões corretas
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge
                variant={passed ? "default" : "destructive"}
                className="font-mono-display text-xs"
              >
                {passed ? "APROVADO" : "REPROVADO"}
              </Badge>
              <Badge variant="outline" className="font-mono-display text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Nota mínima: 80%
              </Badge>
            </div>
          </Card>

          {/* Question review list */}
          <Card className="p-6 border-border bg-card shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="w-4 h-4 text-primary" />
              <span className="font-mono-display text-xs font-semibold text-primary uppercase tracking-wider">
                Revisão por Questão
              </span>
            </div>
            <div className="space-y-2">
              {filteredQuestions.map((q: Question, idx: number) => {
                const userAns = answers[q.id] ?? new Set<string>();
                const correctLetters = q.options
                  .filter((o: { correct: boolean; letter: string }) => o.correct)
                  .map((o: { correct: boolean; letter: string }) => o.letter);
                const isCorrect =
                  userAns.size === correctLetters.length &&
                  correctLetters.every((l: string) => userAns.has(l));
                const isAnswered = userAns.size > 0;

                return (
                  <button
                    key={q.id}
                    onClick={() => onReview(q.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all hover:bg-secondary/40 ${
                      isAnswered
                        ? isCorrect
                          ? "border-primary/30 bg-primary/5"
                          : "border-destructive/30 bg-destructive/5"
                        : "border-border bg-secondary/20"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-md font-mono-display text-xs font-bold shrink-0 ${
                        isAnswered
                          ? isCorrect
                            ? "bg-primary text-primary-foreground"
                            : "bg-destructive text-destructive-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm text-foreground truncate">
                        {q.question}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {q.category}
                      </p>
                    </div>
                    {isAnswered ? (
                      isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive shrink-0" />
                      )
                    ) : null}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onReset}
              className="flex-1 font-mono-display text-sm h-12"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Refazer Treino
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
