"use client";

import { useMemo, useState } from "react";

// Same conservative assumptions as the original calculator — stated openly
// on the page, not just in code: agents take on 65% of repetitive work,
// not all of it.
const AUTOMATABLE_SHARE = 0.65;
const WORKING_WEEKS_PER_YEAR = 48;
const HOURS_PER_FTE_PER_YEAR = 1920;

type CurrencyCode = "USD" | "EUR" | "GBP" | "INR";

type CurrencyConfig = {
  symbol: string;
  label: string;
  default: number;
  min: number;
  max: number;
  step: number;
  locale: string;
};

// Defaults reflect a realistic loaded hourly cost (salary + overhead) for
// an operations/finance analyst in each region — a global visitor should
// see a plausible starting number for their market, not an Indian rupee
// figure with no way to change it.
const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { symbol: "$", label: "USD", default: 45, min: 15, max: 250, step: 5, locale: "en-US" },
  EUR: { symbol: "€", label: "EUR", default: 40, min: 15, max: 220, step: 5, locale: "de-DE" },
  GBP: { symbol: "£", label: "GBP", default: 35, min: 12, max: 200, step: 4, locale: "en-GB" },
  INR: { symbol: "₹", label: "INR", default: 800, min: 200, max: 5000, step: 100, locale: "en-IN" },
};

function formatMoney(amount: number, currency: CurrencyCode): string {
  const { symbol, locale } = CURRENCIES[currency];
  if (currency === "INR") {
    if (amount >= 10_000_000) return symbol + (amount / 10_000_000).toFixed(1) + " Cr";
    if (amount >= 100_000) return symbol + (amount / 100_000).toFixed(1) + " L";
    return symbol + Math.round(amount).toLocaleString(locale);
  }
  if (amount >= 1_000_000) return symbol + (amount / 1_000_000).toFixed(1) + "M";
  if (amount >= 1_000) return symbol + (amount / 1_000).toFixed(0) + "K";
  return symbol + Math.round(amount).toLocaleString(locale);
}

function fillStyle(value: number, min: number, max: number): React.CSSProperties {
  const percent = ((value - min) / (max - min)) * 100;
  return { "--fill": percent + "%" } as React.CSSProperties;
}

export function RoiCalculator() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [team, setTeam] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(12);
  const [costPerHour, setCostPerHour] = useState(CURRENCIES.USD.default);

  const cfg = CURRENCIES[currency];

  function handleCurrencyChange(next: CurrencyCode) {
    setCurrency(next);
    setCostPerHour(CURRENCIES[next].default);
  }

  const { yearlyHours, yearlyMoney, fte } = useMemo(() => {
    const weekly = team * hoursPerWeek * AUTOMATABLE_SHARE;
    const yearlyHours = weekly * WORKING_WEEKS_PER_YEAR;
    const yearlyMoney = yearlyHours * costPerHour;
    const fte = yearlyHours / HOURS_PER_FTE_PER_YEAR;
    return { yearlyHours, yearlyMoney, fte };
  }, [team, hoursPerWeek, costPerHour]);

  return (
    <div className="calc reveal" id="roi-calc">
      <div>
        <div className="calc-field calc-currency">
          <label htmlFor="c-currency">Currency</label>
          <div className="currency-toggle" role="group" aria-label="Select currency">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={currency === code}
                onClick={() => handleCurrencyChange(code)}
              >
                {CURRENCIES[code].symbol} {code}
              </button>
            ))}
          </div>
        </div>
        <div className="calc-field">
          <label htmlFor="c-team">
            People doing repetitive work <output id="o-team">{team} people</output>
          </label>
          <input
            type="range"
            id="c-team"
            min={2}
            max={100}
            step={1}
            value={team}
            style={fillStyle(team, 2, 100)}
            onChange={(e) => setTeam(Number(e.target.value))}
          />
        </div>
        <div className="calc-field">
          <label htmlFor="c-hours">
            Hours per person, per week, on it <output id="o-hours">{hoursPerWeek} hrs/wk each</output>
          </label>
          <input
            type="range"
            id="c-hours"
            min={2}
            max={30}
            step={1}
            value={hoursPerWeek}
            style={fillStyle(hoursPerWeek, 2, 30)}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
          />
        </div>
        <div className="calc-field">
          <label htmlFor="c-cost">
            Loaded cost per hour{" "}
            <output id="o-cost">
              {cfg.symbol}
              {costPerHour.toLocaleString(cfg.locale)}/hr
            </output>
          </label>
          <input
            type="range"
            id="c-cost"
            min={cfg.min}
            max={cfg.max}
            step={cfg.step}
            value={costPerHour}
            style={fillStyle(costPerHour, cfg.min, cfg.max)}
            onChange={(e) => setCostPerHour(Number(e.target.value))}
          />
        </div>
        <p className="calc-note">
          Estimates for planning conversations, not a quote — your real number comes from a free
          engineering call where we map your actual workflows. Assumes 48 working weeks/year; 1
          FTE = 1,920 hrs/year.
        </p>
      </div>
      <div className="calc-out" aria-live="polite">
        <div className="calc-card">
          <b>
            <i>{Math.round(yearlyHours).toLocaleString(cfg.locale)}</i> hrs
          </b>
          <span>recoverable every year through agent automation</span>
        </div>
        <div className="calc-card">
          <b>
            <i>{formatMoney(yearlyMoney, currency)}</i>
          </b>
          <span>estimated annual value of that time</span>
        </div>
        <div className="calc-card">
          <b>
            <i>{fte.toFixed(1)}</i> FTE
          </b>
          <span>full-time-equivalent capacity returned to real work</span>
        </div>
        <div className="calc-card">
          <b>
            <i>{formatMoney(yearlyMoney * 3, currency)}</i>
          </b>
          <span>estimated 3-year value at today&rsquo;s volume — before growth</span>
        </div>
      </div>
    </div>
  );
}
