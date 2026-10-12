"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number; // duration in seconds (fast, e.g. 1.2s)
  className?: string;
  once?: boolean;
}

// Convert numerals to Bengali if selected language is Bengali
const toBengaliDigits = (str: string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return str.replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.2,
  className = "",
  once = false, // Defaults to false so it re-triggers every time the user views this section
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });
  const { language } = useLanguage();

  const rawString = String(value ?? "");

  // Match optional prefix, numeric part (integers/floats/commas), and optional suffix
  // e.g. "5.2M+", "31", "12,500+", "48+", "৳ 1.62B"
  const match = rawString.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);

  // If the prefix has normal alphabetic words (like "Camp 8W"), don't animate, display directly
  const isValidNumeric = Boolean(
    match && (!match[1] || /^[^\w\u0980-\u09FF]*$/.test(match[1]))
  );

  const prefix = match ? match[1] : "";
  const rawNum = match ? match[2] : "";
  const suffix = match ? match[3] : "";

  const targetNumber = isValidNumeric ? parseFloat(rawNum.replace(/,/g, "")) : 0;
  const hasComma = rawNum.includes(",");
  const decimals = rawNum.includes(".") ? rawNum.split(".")[1].length : 0;

  const getZeroFormatted = () => {
    const zeroStr = (0).toFixed(decimals);
    const full = `${prefix}${zeroStr}${suffix}`;
    return language === "bn" ? toBengaliDigits(full) : full;
  };

  const getTargetFormatted = () => {
    let finalFormatted = targetNumber.toFixed(decimals);
    if (hasComma) {
      const parts = finalFormatted.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      finalFormatted = parts.join(".");
    }
    const full = `${prefix}${finalFormatted}${suffix}`;
    return language === "bn" ? toBengaliDigits(full) : full;
  };

  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (!isValidNumeric) return rawString;
    return getZeroFormatted();
  });

  useEffect(() => {
    if (!isValidNumeric) {
      setDisplayValue(language === "bn" ? toBengaliDigits(rawString) : rawString);
      return;
    }

    if (!isInView) {
      // Reset back to 0 when out of view so it triggers fresh counting every time viewed
      setDisplayValue(getZeroFormatted());
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    // Quartic ease-out: rapid dynamic start, smooth deceleration
    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easedProgress = easeOutQuart(progress);

      const currentVal = easedProgress * targetNumber;

      let formattedNumber: string;
      if (decimals > 0) {
        formattedNumber = currentVal.toFixed(decimals);
      } else {
        formattedNumber = Math.round(currentVal).toString();
      }

      if (hasComma) {
        const parts = formattedNumber.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formattedNumber = parts.join(".");
      }

      const formattedFull = `${prefix}${formattedNumber}${suffix}`;
      setDisplayValue(language === "bn" ? toBengaliDigits(formattedFull) : formattedFull);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Guarantee exact target accuracy at end
        setDisplayValue(getTargetFormatted());
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetNumber, isValidNumeric, rawString, duration, decimals, hasComma, prefix, suffix, language]);

  return (
    <span ref={ref} className={`inline-block tabular-nums select-none ${className}`}>
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
