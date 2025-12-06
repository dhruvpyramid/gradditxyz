"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface TourStep {
  target: string; // CSS selector
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right";
}

const TOUR_STEPS: TourStep[] = [
  {
    target: "body",
    title: "Welcome to Graddit! 🎓",
    description: "Your platform to discover and vote for the best colleges in India. Let's take a quick tour!",
    position: "bottom",
  },
  {
    target: "[data-tour='college-categories']",
    title: "Browse by Category",
    description: "Filter colleges by category like Engineering, Medical, Arts, and more. Click any category to see colleges in that field.",
    position: "bottom",
  },
  {
    target: "[data-tour='state-filter']",
    title: "Filter by State",
    description: "Looking for colleges in a specific state? Use this dropdown to filter colleges by location.",
    position: "bottom",
  },
  {
    target: "[data-tour='college-card']",
    title: "College Cards",
    description: "Each card shows a college with its score, location, and category. Vote for your favorites!",
    position: "top",
  },
  {
    target: "[data-tour='vote-buttons']",
    title: "Vote for Colleges",
    description: "Upvote colleges you like or downvote ones you don't. Your votes matter! Students from the same college or state have more voting power.",
    position: "top",
  },
  {
    target: "[data-tour='sort-options']",
    title: "Sort Results",
    description: "Sort colleges by score, name (A-Z), or see the latest additions. Find what you're looking for faster!",
    position: "left",
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
}

export function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
      updateTargetPosition();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      updateTargetPosition();
    }
  }, [currentStep, isVisible]);

  const updateTargetPosition = () => {
    const step = TOUR_STEPS[currentStep];
    const element = document.querySelector(step.target);
    
    if (element) {
      const rect = element.getBoundingClientRect();
      setTargetPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
      
      // Scroll element into view
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  const step = TOUR_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  // Calculate tooltip position
  const getTooltipPosition = () => {
    const padding = 16;
    const isMobile = window.innerWidth < 768;
    const tooltipWidth = isMobile ? window.innerWidth - 32 : 420;
    const tooltipHeight = isMobile ? 'auto' : 240;

    let top = targetPosition.top;
    let left = targetPosition.left;

    switch (step.position) {
      case "bottom":
        top = targetPosition.top + targetPosition.height + padding;
        left = targetPosition.left + targetPosition.width / 2 - tooltipWidth / 2;
        break;
      case "top":
        top = targetPosition.top - (typeof tooltipHeight === 'number' ? tooltipHeight : 240) - padding;
        left = targetPosition.left + targetPosition.width / 2 - tooltipWidth / 2;
        break;
      case "left":
        top = targetPosition.top + targetPosition.height / 2 - (typeof tooltipHeight === 'number' ? tooltipHeight : 240) / 2;
        left = targetPosition.left - tooltipWidth - padding;
        break;
      case "right":
        top = targetPosition.top + targetPosition.height / 2 - (typeof tooltipHeight === 'number' ? tooltipHeight : 240) / 2;
        left = targetPosition.left + targetPosition.width + padding;
        break;
      default:
        top = window.innerHeight / 2 - (typeof tooltipHeight === 'number' ? tooltipHeight : 240) / 2;
        left = window.innerWidth / 2 - tooltipWidth / 2;
    }

    // Keep tooltip within viewport
    if (left < 16) left = 16;
    if (left + tooltipWidth > window.innerWidth - 16) {
      left = window.innerWidth - tooltipWidth - 16;
    }
    if (top < 16) top = 16;
    const tooltipNumericHeight = typeof tooltipHeight === 'number' ? tooltipHeight : 280;
    if (top + tooltipNumericHeight > window.innerHeight + window.scrollY - 16) {
      top = window.innerHeight + window.scrollY - tooltipNumericHeight - 16;
    }

    return { top, left };
  };

  const tooltipPos = getTooltipPosition();

  return (
    <>
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-fade-in cursor-pointer"
        onClick={handleSkip}
        role="presentation"
      />

      {/* Spotlight - Highlight target element */}
      {step.target !== "body" && (
        <div
          className="fixed z-[9999] pointer-events-none transition-all duration-300"
          style={{
            top: targetPosition.top - 8,
            left: targetPosition.left - 8,
            width: targetPosition.width + 16,
            height: targetPosition.height + 16,
            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 20px 8px rgba(59, 130, 246, 0.5)",
            borderRadius: "12px",
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="fixed z-[10000] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.25)] p-5 sm:p-7 w-[calc(100vw-2.5rem)] sm:max-w-md animate-fade-in border border-white/30 dark:border-white/10"
        style={{
          top: tooltipPos.top,
          left: tooltipPos.left,
          minHeight: "200px",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Content */}
        <div className="pr-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">Step {currentStep + 1} / {TOUR_STEPS.length}</div>
          <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {step.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed mb-5">
            {step.description}
          </p>
        </div>

        {/* Progress & Controls */}
        <div className="flex items-center justify-between mt-4">
          {/* Progress Dots */}
          <div className="flex gap-2">
            {TOUR_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                    : index < currentStep
                    ? "w-4 bg-blue-300/80"
                    : "w-3 bg-gray-300/70 dark:bg-gray-600/60"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-2 items-center justify-end">
            {!isFirstStep && (
              <button
                onClick={handlePrevious}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 rounded-xl border border-white/80 dark:border-white/10 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleSkip}
              className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Skip tour
            </button>
            <button
              onClick={handleNext}
              className="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-500/90 hover:from-blue-600 hover:to-pink-500 text-white rounded-xl shadow-[0_10px_25px_rgba(59,130,246,0.35)] transition-all"
            >
              {isLastStep ? "Get Started!" : "Next"}
            </button>
          </div>
        </div>

        {/* Step Counter */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4 tracking-wide">
          {currentStep + 1} / {TOUR_STEPS.length}
        </p>
      </div>
    </>
  );
}
