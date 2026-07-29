/**
 * Hand-authored line-icon set, one per industry. Deliberately simple,
 * consistent stroke weight, no external icon library — drawn to match the
 * .i-ico / .s-ico styling in globals.css (stroke:currentColor, fill:none).
 */

export function IconBanking() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M4.5 9.5v9M9 9.5v9M15 9.5v9M19.5 9.5v9" />
      <path d="M2.5 20h19" />
      <path d="M2.5 9.5h19" />
    </svg>
  );
}

export function IconInsurance() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 3.5 19 6v6c0 5-3 8.5-7 9.5-4-1-7-4.5-7-9.5V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconHealthcare() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export function IconManufacturing() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 20V10l5 3.2V10l5 3.2V9l6-4v15z" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function IconRetail() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M6 8h12l-1 12H7z" />
      <path d="M9 8V6a3 3 0 016 0v2" />
    </svg>
  );
}

export function IconLogistics() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 7h10v9H3z" />
      <path d="M13 11h4l4 3v2h-8z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}
