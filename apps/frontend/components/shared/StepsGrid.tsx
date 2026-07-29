export type StepItem = {
  marker: string;
  window: string;
  title: string;
  body: React.ReactNode;
};

export function StepsGrid({ items }: { items: StepItem[] }) {
  return (
    <div className="steps reveal-stagger">
      {items.map((step) => (
        <div className="step" key={step.marker}>
          <span className="s-num">{step.marker}</span>
          <span className="s-window">{step.window}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </div>
      ))}
    </div>
  );
}
