import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";

interface SurveyQuestion {
  id: string;
  type: "text" | "rating" | "choice" | "multichoice" | "boolean";
  question: string;
  description?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  render?: (props: { value: any; onChange: (value: any) => void }) => ReactNode;
}

interface SurveyFormProps {
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  onSubmit: (answers: Record<string, any>) => void;
  onClose?: () => void;
}

export function SurveyForm({
  title,
  description,
  questions,
  onSubmit,
  onClose,
}: SurveyFormProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = questions.length;

  const currentQuestion = questions[step];
  const progress = ((step + 1) / totalSteps) * 100;

  const handleAnswer = (value: any) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        style={{
          background: "var(--color-surface-primary)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border-light)",
          padding: "var(--space-48) var(--space-24)",
          textAlign: "center",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--color-light-green)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            color: "var(--color-primary-green)",
          }}
        >
          <Check size={32} />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-family-title)",
            fontSize: "var(--font-size-2xl)",
            color: "var(--color-text-primary)",
            margin: "0 0 8px",
          }}
        >
          Thank You!
        </h3>
        <p
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-secondary)",
          }}
        >
          Your response has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--color-surface-primary)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-light)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
      }}
    >
      {/* Progress bar */}
      <div style={{ height: 4, background: "var(--color-border-light)" }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--color-primary-blue)",
            transition: "width 0.3s ease",
            borderRadius: "0 2px 2px 0",
          }}
        />
      </div>

      <div style={{ padding: "var(--space-24)" }}>
        {/* Step indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-muted)",
              fontWeight: 500,
            }}
          >
            Question {step + 1} of {totalSteps}
          </span>

          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-xs)",
                fontWeight: 500,
              }}
            >
              Skip
            </button>
          )}
        </div>

        {/* Title/Description */}
        {step === 0 && (
          <div style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontFamily: "var(--font-family-title)",
                fontSize: "var(--font-size-2xl)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 8px",
              }}
            >
              {title}
            </h3>
            {description && (
              <p
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Question */}
        <div style={{ marginBottom: 32 }}>
          <h4
            style={{
              fontFamily: "var(--font-family-title)",
              fontSize: "var(--font-size-lg)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: "0 0 4px",
            }}
          >
            {currentQuestion.question}
          </h4>
          {currentQuestion.description && (
            <p
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                color: "var(--color-text-secondary)",
                margin: 0,
              }}
            >
              {currentQuestion.description}
            </p>
          )}
        </div>

        {/* Answer input */}
        <div style={{ marginBottom: 32 }}>
          <SurveyAnswerInput
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={handleAnswer}
          />
        </div>

        {/* Navigation buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          {step > 0 ? (
            <button
              onClick={handlePrev}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 20px",
                border: "2px solid var(--color-border)",
                borderRadius: "var(--radius-button)",
                background: "transparent",
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps - 1 ? (
            <button
              onClick={handleNext}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 20px",
                border: "none",
                borderRadius: "var(--radius-button)",
                background: "linear-gradient(135deg, var(--color-primary-blue), #0a7a9e)",
                color: "#fff",
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <PrimaryButton onClick={handleSubmit} icon={<Check size={16} />}>
              Submit
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Inline answer input renderer ── */

function SurveyAnswerInput({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: any;
  onChange: (value: any) => void;
}) {
  if (question.render) {
    return question.render({ value, onChange });
  }

  switch (question.type) {
    case "text":
      return (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer..."
          style={{
            width: "100%",
            minHeight: 100,
            padding: "12px 16px",
            border: "2px solid var(--color-border)",
            borderRadius: "var(--radius-input)",
            background: "var(--color-surface-secondary)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-sm)",
            lineHeight: 1.5,
            resize: "vertical",
            outline: "none",
          }}
        />
      );

    case "rating": {
      const max = 5;
      return (
        <div style={{ display: "flex", gap: 8 }}>
          {Array.from({ length: max }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => onChange(num)}
              style={{
                width: 44,
                height: 44,
                borderRadius: "var(--radius-sm)",
                border: `2px solid ${value === num ? "var(--color-primary-blue)" : "var(--color-border)"}`,
                background: value === num ? "var(--color-light-blue)" : "transparent",
                color: value === num ? "var(--color-primary-blue)" : "var(--color-text-secondary)",
                fontFamily: "var(--font-family-title)",
                fontSize: "var(--font-size-base)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all var(--transition-fast)",
              }}
            >
              {num}
            </button>
          ))}
        </div>
      );
    }

    case "choice":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {question.options?.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                border: `2px solid ${value === opt.value ? "var(--color-primary-blue)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-input)",
                background: value === opt.value ? "var(--color-light-blue)" : "transparent",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-family-body)",
                fontSize: "var(--font-size-sm)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all var(--transition-fast)",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: `2px solid ${value === opt.value ? "var(--color-primary-blue)" : "var(--color-border)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {value === opt.value && (
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "var(--color-primary-blue)",
                    }}
                  />
                )}
              </div>
              {opt.label}
            </button>
          ))}
        </div>
      );

    case "multichoice": {
      const selected = (value as string[]) || [];
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {question.options?.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() =>
                  onChange(
                    isSelected
                      ? selected.filter((v) => v !== opt.value)
                      : [...selected, opt.value],
                  )
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  border: `2px solid ${isSelected ? "var(--color-primary-blue)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-input)",
                  background: isSelected ? "var(--color-light-blue)" : "transparent",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-family-body)",
                  fontSize: "var(--font-size-sm)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all var(--transition-fast)",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    border: `2px solid ${isSelected ? "var(--color-primary-blue)" : "var(--color-border)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: isSelected ? "var(--color-primary-blue)" : "transparent",
                  }}
                >
                  {isSelected && <Check size={12} color="#fff" strokeWidth={3} />}
                </div>
                {opt.label}
              </button>
            );
          })}
        </div>
      );
    }

    case "boolean":
      return (
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => onChange(true)}
            style={{
              flex: 1,
              padding: "12px 16px",
              border: `2px solid ${value === true ? "var(--color-primary-green)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-input)",
              background: value === true ? "var(--color-light-green)" : "transparent",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => onChange(false)}
            style={{
              flex: 1,
              padding: "12px 16px",
              border: `2px solid ${value === false ? "var(--color-error)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-input)",
              background: value === false ? "#fee2e2" : "transparent",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-family-body)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
          >
            No
          </button>
        </div>
      );

    default:
      return null;
  }
}
