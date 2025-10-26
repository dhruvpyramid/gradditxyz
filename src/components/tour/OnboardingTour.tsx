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
    const padding = 20;
    const tooltipWidth = 360;
    const tooltipHeight = 200;

    let top = targetPosition.top;
    let left = targetPosition.left;

    switch (step.position) {
      case "bottom":
        top = targetPosition.top + targetPosition.height + padding;
        left = targetPosition.left + targetPosition.width / 2 - tooltipWidth / 2;
        break;
      case "top":
        top = targetPosition.top - tooltipHeight - padding;
        left = targetPosition.left + targetPosition.width / 2 - tooltipWidth / 2;
        break;
      case "left":
        top = targetPosition.top + targetPosition.height / 2 - tooltipHeight / 2;
        left = targetPosition.left - tooltipWidth - padding;
        break;
      case "right":
        top = targetPosition.top + targetPosition.height / 2 - tooltipHeight / 2;
        left = targetPosition.left + targetPosition.width + padding;
        break;
      default:
        top = window.innerHeight / 2 - tooltipHeight / 2;
        left = window.innerWidth / 2 - tooltipWidth / 2;
    }

    // Keep tooltip within viewport
    if (left < 20) left = 20;
    if (left + tooltipWidth > window.innerWidth - 20) {
      left = window.innerWidth - tooltipWidth - 20;
    }
    if (top < 20) top = 20;
    if (top + tooltipHeight > window.innerHeight + window.scrollY - 20) {
      top = window.innerHeight + window.scrollY - tooltipHeight - 20;
    }

    return { top, left };
  };

  const tooltipPos = getTooltipPosition();

  return (
    <>
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-fade-in" />

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
        className="fixed z-[10000] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-sm animate-fade-in border border-gray-200 dark:border-gray-700"
        style={{
          top: tooltipPos.top,
          left: tooltipPos.left,
          minHeight: "200px",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="pr-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {step.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
            {step.description}
          </p>
        </div>

        {/* Progress & Controls */}
        <div className="flex items-center justify-between mt-4">
          {/* Progress Dots */}
          <div className="flex gap-1.5">
            {TOUR_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "w-8 bg-blue-500"
                    : index < currentStep
                    ? "w-2 bg-blue-300"
                    : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            {!isFirstStep && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-all"
            >
              {isLastStep ? "Get Started!" : "Next"}
            </button>
          </div>
        </div>

        {/* Step Counter */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Step {currentStep + 1} of {TOUR_STEPS.length}
        </p>
      </div>
    </>
  );
}
